from django.urls import path
from replies import views

urlpatterns = [
    path('replies/', views.replies_by_comment),
]