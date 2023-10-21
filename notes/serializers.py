from rest_framework.serializers import ModelSerializer
from .models import Profile, Team, Note
from django.contrib.auth.models import User


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class TeamSerializer(ModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"
