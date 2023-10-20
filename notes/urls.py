from django.urls import path
from . import views

urlpatterns = [
    path("auth/sign-up", views.signup, name="sign-up"),
    path("auth/sign-in", views.signin, name="sign-in"),
    path("auth/sign-out", views.signout, name="sign-out"),
    path("test/", views.testView, name="test"),
]
