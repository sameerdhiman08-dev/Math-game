from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'), 
    path('mgame/', views.mgame_view, name='mgame'),
    
]


