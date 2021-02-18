from rest_framework import serializers, viewsets
from rest_framework import permissions
from board.models import Board


class BoardSerializer(serializers.HyperlinkedModelSerializer):
    is_member = serializers.SerializerMethodField()
    is_moderator = serializers.SerializerMethodField()
    is_banned = serializers.SerializerMethodField()

    class Meta:
        model = Board
        fields = ['name', 'is_member', 'is_moderator', 'is_banned']

    def get_is_member(self, obj):
        user = self.get_user()
        if user:
            return user in obj.members.all()
        return False

    def get_is_moderator(self, obj):
        user = self.get_user()
        if user:
            return user in obj.moderators.all()
        return False

    def get_is_banned(self, obj):
        user = self.get_user()
        if user:
            return user in obj.banned.all()
        return False

    def get_user(self):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        return user


class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = [permissions.IsAuthenticated]

