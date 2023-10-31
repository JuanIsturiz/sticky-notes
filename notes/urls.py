from django.urls import path
from . import views

urlpatterns = [
    #   AUTH URLS
    path("auth/sign-up", views.signup, name="sign-up"),
    path("auth/sign-in", views.signin, name="sign-in"),
    path("auth/sign-out", views.signout, name="sign-out"),
    path("auth/send-email", views.send_verification_email, name="send-email"),
    path("auth/verify-user", views.verify_user, name="verify-user"),
    path("auth/profile/<pk>", views.get_profile, name="get-profile"),
    path("auth/profile/<pk>/info", views.get_user_info, name="get-user-info"),
    path("auth/profile/<pk>/update", views.update_profile, name="update-profile"),
    #   NOTES URLS
    path("notes/<pk>/user", views.get_user_notes, name="user-notes"),
    path("notes/new", views.create_note, name="add-note"),
    path("notes/<pk>", views.get_single_note, name="get-note"),
    path("notes/<pk>/update", views.update_note, name="update-note"),
    path("notes/<pk>/delete", views.delete_note, name="delete-note"),
    #   TEAM URLS
    path("teams/", views.get_teams, name="get-teams"),
    path("teams/new", views.create_team, name="add-team"),
    path("teams/<pk>", views.get_single_team, name="get-team"),
    path("teams/<pk>/update", views.update_team, name="update-team"),
    path("teams/<pk>/delete", views.delete_team, name="delete-team"),
    path("teams/<pk>/subscription", views.team_action, name="subscription-team"),
    path("test/", views.testView, name="test"),
]
