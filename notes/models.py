from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    image = models.TextField(blank=True)
    bio = models.TextField(max_length=200, blank=True)
    is_verified = models.BooleanField(default=False)


class Team(models.Model):
    name = models.TextField(max_length=50)
    description = models.TextField(max_length=200, blank=True)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    members = models.ManyToManyField(User, related_name="members", blank=True)

    def count_members(self):
        return self.members.count()

    def __str__(self):
        return f"{self.name} Team"


class Note(models.Model):
    body = models.TextField(max_length=500)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    private = models.BooleanField(default=True)

    def __str__(self):
        return self.body[:50]

    class Meta:
        ordering = ["-updated"]
