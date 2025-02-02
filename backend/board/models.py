from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin


class Board(models.Model):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    members = models.ManyToManyField(User, related_name="members", blank=True)
    moderators = models.ManyToManyField(User, related_name="moderators", blank=True)
    banned = models.ManyToManyField(User, related_name="banned", blank=True)

    @property
    def board_id(self):
        return '-'.join([str(self.id), self.name])

    def __str__(self):
        return self.name

admin.site.register(Board)
