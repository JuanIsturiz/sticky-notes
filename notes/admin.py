from django.contrib import admin
from .models import Team, Note


# Register your models here.
[admin.site.register(model) for model in [Team, Note]]
