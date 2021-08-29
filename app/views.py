from django.shortcuts import render
from .models import Word
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import WordSerializer


class WordViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Word.objects.all().order_by('id')
    serializer_class = WordSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Return data for specified word.
        """
        # word = self.kwargs['word']
        # return Word.objects.filter(word=word)
        queryset = Word.objects.all()
        word = self.request.query_params.get('word')
        if word is not None:
            queryset = queryset.filter(word=word)
        return queryset