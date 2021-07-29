from django.shortcuts import render
from .models import Word
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import WordSerializer


class WordViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Word.objects.all().order_by('points')
    serializer_class = WordSerializer
    # permission_classes = [permissions.IsAuthenticated]