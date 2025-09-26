from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),  # Root URL -> Welcome Page
    path('level/', views.mgame_view, name='mgame'),  # Difficulty Selection Page
    path('level/<str:level>/', views.start_game, name="start_game"),  # Start game
    path('play/', views.play_game, name="play_game"),  # Game Play
    path('guess/', views.guess_number, name="guess_number"),
    path('replay/', views.replay_game, name="replay_game"),
]
