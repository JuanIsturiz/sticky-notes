from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    first_name = models.TextField(max_length=30, blank=True)
    last_name = models.TextField(max_length=30, blank=True)
    image = models.TextField(blank=True)
    bio = models.TextField(max_length=200, blank=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        else:
            return self.user.username


class Team(models.Model):
    name = models.TextField(max_length=50)
    description = models.TextField(max_length=200, blank=True)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)
    members = models.ManyToManyField(User, related_name="members", blank=True)

    def count_members(self):
        return self.members.count()

    def __str__(self):
        return f"Team - {self.name}"


class Note(models.Model):
    body = models.TextField(max_length=1000)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="author")
    team = models.ForeignKey(Team, on_delete=models.CASCADE, blank=True)
    private = models.BooleanField(default=True)
    last_user = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, related_name="last_user"
    )
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    def __str__(self):
        return self.body[:50]

    class Meta:
        ordering = ["-updated"]
