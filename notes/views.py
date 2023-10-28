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
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.hashers import make_password, check_password

# Create your views here.


# AUTH VIEWS
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


# NOTES VIEWS
@api_view(["GET"])
def get_user_notes(request, pk):
    queryset = Note.objects.filter(author=pk)
    note_serializer = NoteSerializer(queryset, many=True)
    notes = []
    for note in note_serializer.data:
        user = User.objects.get(pk=pk)
        user_serializer = UserSerializer(instance=user)
        notes.append(
            {
                **note,
                "last_user": {
                    "id": user_serializer.data["id"],
                    "username": user_serializer.data["username"],
                },
            }
        )

    return Response({"notes": notes})


@api_view(["GET"])
def get_single_note(request, pk):
    queryset = Note.objects.get(id=pk)
    user_serializer = UserSerializer(instance=queryset.last_user)
    note_serializer = NoteSerializer(instance=queryset)
    note = {
        **note_serializer.data,
        "last_user": {
            "id": user_serializer.data["id"],
            "username": user_serializer.data["username"],
        },
    }
    return Response({"note": note})


@api_view(["POST"])
def create_note(request):
    serializer = NoteSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"created": True})
    else:
        return Response({"created": False})


@api_view(["PUT"])
def update_note(request, pk):
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(note, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"updated": True})
    else:
        return Response({"updated": False})


@api_view(["DELETE"])
def delete_note(request, pk):
    note = Note.objects.get(id=pk)
    if note:
        note.delete()
        return Response({"deleted": True})
    else:
        return Response({"deleted": False})


# TEAM VIEWS
@api_view(["GET"])
def get_teams(request):
    q = request.query_params.get("q")
    teams = Team.objects.filter(name__icontains=q)
    serializer = TeamSerializer(instance=teams, many=True)
    return Response({"teams": serializer.data})


@api_view(["GET"])
def get_single_team(request, pk):
    team = Team.objects.get(id=pk)
    users_serializer = UserSerializer(instance=team.members.all(), many=True)
    serializer = TeamSerializer(instance=team)
    members = list(
        map(
            lambda x: {
                "id": x["id"],
                "username": x["username"],
            },
            users_serializer.data,
        ),
    )

    notes = Note.objects.filter(team=pk)
    notes_serializer = NoteSerializer(instance=notes, many=True)
    notes = []
    for note in notes_serializer.data:
        user = User.objects.get(pk=note["author"])
        user_serializer = UserSerializer(instance=user)
        notes.append(
            {
                **note,
                "last_user": {
                    "id": user_serializer.data["id"],
                    "username": user_serializer.data["username"],
                },
            }
        )
    return Response({"team": {**serializer.data, "members": members, "notes": notes}})


@api_view(["POST"])
def create_team(request):
    serializer = TeamSerializer(data=request.data)
    request.data["password"] = (
        make_password(request.data["password"])
        if not request.data["password"] == None
        else None
    )
    request.data["members"] = [request.data["admin"]]
    if serializer.is_valid():
        serializer.save()
        return Response({"created": True})
    else:
        return Response({"created": False})


@api_view(["PUT"])
def update_team(request, pk):
    team = Team.objects.get(id=pk)
    if "password" in request.data:
        request.data["password"] = make_password(request.data["password"])
    serializer = TeamSerializer(team, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"updated": True})
    else:
        return Response({"updated": False})


@api_view(["PUT"])
def team_action(request, pk):
    user_id = request.data["userId"]
    team = Team.objects.get(id=pk)
    if request.data["action"] == "join":
        if not request.data["password"] == None:
            if check_password(request.data["password"], team.password):
                team.members.add(user_id)
                return Response({"success": True, "message": ""})
            else:
                return Response(
                    {
                        "success": False,
                        "message": "Invalid Credentials\nPlease Try Again",
                    }
                )
        else:
            team.members.add(user_id)
            return Response({"success": True, "message": ""})
    else:
        Note.objects.filter(team=pk, author=user_id).delete()
        team.members.filter(pk=user_id).delete()
        return Response({"success": True, "message": ""})


@api_view(["DELETE"])
def delete_team(request, pk):
    team = Team.objects.get(id=pk)
    if team:
        team.delete()
        return Response({"deleted": True})
    else:
        return Response({"deleted": False})


@api_view(["GET"])
def testView(request):
    team = Team.objects.get(id=1)
    member_count = team.count_members()
    # serializer = TeamSerializer(team, many=False)
    return Response({"members": member_count})
