from rest_framework import serializers
from .models import Reply


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['id', 'text', 'user', 'comment', 'comment_id']
        depth = 1

    comment_id = serializers.IntegerField(required=False, write_only=True)
    