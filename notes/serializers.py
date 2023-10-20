from rest_framework.serializers import ModelSerializer
from .models import Team, Note
from django.contrib.auth.models import User


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
