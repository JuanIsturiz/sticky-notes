from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Profile, Team, Note
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .serializers import (
    ProfileSerializer,
    TeamSerializer,
    NoteSerializer,
    UserSerializer,
)
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMessage
from uuid import uuid4 as v4
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str


# Create your views here.
@api_view(["POST"])
def signin(request):
    user = (
        get_object_or_404(User, email=request.data["username"])
        if "@" in request.data["username"]
        else get_object_or_404(User, username=request.data["username"])
    )
    if not user.check_password(request.data["password"]):
        return Response({"user": "", "token": "", "errors": True})
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response(
        {
            "user": {
                "id": serializer.data["id"],
                "email": serializer.data["email"],
                "username": serializer.data["username"],
            },
            "token": token.key,
            "errors": False,
        }
    )


@api_view(["POST"])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(email=request.data["email"])
        user.set_password(request.data["password"])
        user.save()
        Profile.objects.create(user=user)
        token = Token.objects.create(user=user)
        return Response(
            {
                "user": {
                    "id": serializer.data["id"],
                    "email": serializer.data["email"],
                    "username": serializer.data["username"],
                },
                "token": token.key,
                "errors": [],
            },
            status=status.HTTP_201_CREATED,
        )
    else:
        return Response(
            {
                "user": "",
                "token": "",
                "errors": [v[0] for k, v in serializer.errors.items()],
            }
        )


@api_view(["POST"])
def verify_user(request):
    token = request.data["token"]
    try:
        uid = force_str(urlsafe_base64_decode(request.data["uid"]))
        profile = Profile.objects.get(user=uid)
        profile.is_verified = True
        profile.save()
        return Response({"verified": True})
    except:
        return Response({"verified": False})


@api_view(["POST"])
def send_verification_email(request):
    user = request.data["user"]
    token = request.data["token"]
    mail_subject = "Acticate your account!"
    uid = urlsafe_base64_encode(force_bytes(user["id"]))
    path = "http://localhost:5173/verify"

    message = render_to_string(
        template_name="notes/email_verification.html",
        context={
            "user": user["username"],
            "path": path,
            "q": f"{uid}~{token}",
            "protocol": "https" if request.is_secure() else "http",
        },
    )
    html = strip_tags(message)
    email = EmailMessage(mail_subject, html, to=[user["email"]])
    if email.send():
        return Response({"sent": True})
    else:
        return Response({"sent": False})


@api_view(["GET"])
def get_profile(request, pk):
    user = User.objects.get(id=pk)
    profile = user.profile
    serializer = ProfileSerializer(instance=profile)
    return Response({"profile": serializer.data})


@api_view(["PUT"])
def update_profile(request, pk):
    user = User.objects.get(id=pk)
    profile = user.profile
    serializer = ProfileSerializer(instance=profile, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"profile": serializer.data, "updated": True})
    else:
        return Response({"profile": None, "updated": False})


@api_view(["POST"])
def signout(request):
    try:
        token = Token.objects.get(key=request.data["token"])
        token.delete()
        return Response({"ok": True})
    except Token.DoesNotExist:
        return Response({"ok": False})


@api_view(["GET"])
def testView(request):
    team = Team.objects.get(id=1)
    member_count = team.count_members()
    # serializer = TeamSerializer(team, many=False)
    return Response({"members": member_count})
