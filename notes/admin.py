from django.contrib import admin
from .models import Team, Note, Profile


# Register your models here.
[admin.site.register(model) for model in [Profile, Team, Note]]
