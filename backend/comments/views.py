from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Comment
from .serializers import CommentSerializer
from django.shortcuts import get_object_or_404

@api_view(['GET'])
@permission_classes([AllowAny])
def video_comments(request, video_id):
    comments = Comment.objects.filter(video_id = video_id)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_comments(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        comments = Comment.objects.filter(user_id=request.user.id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)
    
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def comment_by_id(request, comment_id):
    comment = Comment.objects.get(pk = comment_id)
    if request.method == 'PUT':
        serializer = CommentSerializer(comment, data = request.data)
        serializer.is_valid(raise_exception = True)
        if serializer.save():
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
@permission_classes([AllowAny])
def add_like(request, comment_id):
    comment = get_object_or_404(Comment, id = comment_id)
    if request.method == 'PATCH':
        comment.likes += 1
        serializer = CommentSerializer(comment, data = request.data, partial = True)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response(comment.likes, status = status.HTTP_202_ACCEPTED)

@api_view(['PATCH'])
@permission_classes([AllowAny])
def add_dislike(request, comment_id):
    comment = get_object_or_404(Comment, id = comment_id)
    if request.method == 'PATCH':
        comment.dislikes += 1
        serializer = CommentSerializer(comment, data = request.data, partial = True)
        serializer.is_valid(raise_exception = True)
        serializer.save()
        return Response(comment.dislikes, status = status.HTTP_202_ACCEPTED)

@api_view(['GET'])
@permission_classes([AllowAny])
def comment_likes_dislikes(request, comment_id):
    if request.method == 'GET':
        comment = Comment.objects.get(pk = comment_id)
        serializer = CommentSerializer(comment)
        return Response(serializer.data)