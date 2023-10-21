from django.urls import path
from . import views

urlpatterns = [
    path("auth/sign-up", views.signup, name="sign-up"),
    path("auth/sign-in", views.signin, name="sign-in"),
    path("auth/sign-out", views.signout, name="sign-out"),
    path("auth/send-email", views.send_verification_email, name="send-email"),
    path("auth/verify-user", views.verify_user, name="verify-user"),
    path("auth/profile/<pk>", views.get_profile, name="get-profile"),
    path("test/", views.testView, name="test"),
]
