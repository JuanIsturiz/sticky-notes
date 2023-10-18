from rest_framework.serializers import ModelSerializer
from .models import Team, Note


class TeamSerializer(ModelSerializer):
    class Meta:
        model = Team
        fields = "__all__"


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = "__all__"
