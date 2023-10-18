from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Team, Note
from .serializers import TeamSerializer, NoteSerializer

# Create your views here.


@api_view(["GET"])
def testView(request):
    team = Team.objects.get(id=1)
    member_count = team.count_members()
    # serializer = TeamSerializer(team, many=False)
    return Response({"members": member_count})
