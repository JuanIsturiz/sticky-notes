from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Team, Note
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .serializers import TeamSerializer, NoteSerializer, UserSerializer
from django.db.models import Q
from django.shortcuts import get_object_or_404

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
    print(request.data)
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(email=request.data["email"])
        user.set_password(request.data["password"])
        user.save()
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
