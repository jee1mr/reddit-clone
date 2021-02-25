from rest_framework import serializers, viewsets
from rest_framework import permissions
from board.models import Board
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404


class BoardSerializer(serializers.HyperlinkedModelSerializer):
    is_member = serializers.SerializerMethodField()
    is_moderator = serializers.SerializerMethodField()
    is_banned = serializers.SerializerMethodField()

    class Meta:
        model = Board
        fields = ['id', 'name', 'is_member', 'is_moderator', 'is_banned']

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

    def create(self, request):
        try:
            board = Board(name=request.data['name'], owner=request.user)
            board.save()
            board.members.add(request.user)
            board.moderators.add(request.user)
        except Exception as e:
            if hasattr(e, 'message'):
                return Response({"success": False, "error": e.message})
            else:
                return Response({"success": False, "error": str(e)})
        return Response(BoardSerializer(board).data)

    @action(url_path='become-member', methods=['post'], detail=True)
    def become_member(self, request, pk=None):
        board = get_object_or_404(self.queryset, pk=pk)
        if board.members.exists() and board.banned.exists():
            return Response({'success': True})
        board.members.add(request.user)
        return Response({'success': True})


