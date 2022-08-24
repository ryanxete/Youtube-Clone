from django.urls import path
from comments import views

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<

urlpatterns = [
    path('', views.user_comments),
    path('all/<str:video_id>/', views.video_comments),
    path('<int:comment_id>/update/', views.comment_by_id),
    path('add_like/<int:comment_id>/', views.add_like),
    path('add_dislike/<int:comment_id>/', views.add_dislike),
    path('likes_dislikes/<int:comment_id>/', views.comment_likes_dislikes),

]