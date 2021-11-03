from django.shortcuts import render
from rest_framework.response import Response

from app.words import Words
from django.apps import apps
from .models import Word
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import WordSerializer
from django.http import JsonResponse
import time

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
        return queryset

    def retrieve(self, request, *args, **kwargs):
        words = Word.objects.filter(word=kwargs['word'])
        serializer = WordSerializer(words, many=True)
        return Response(serializer.data)


def get_words_from_letters(request, *args, **kwargs):
    if request.method == 'GET':
        start = time.time()
        letters = [ch for ch in request.GET['letters']]
        all_words_from_letters = Words.get_all_words_from_letters(letters=letters)
        # print(all_words_from_letters)
        end = time.time()
        print("time elapsed after generating all words from letters = ", end - start)
        start = time.time()
        trie = apps.get_app_config('app').trie
        response = {}
        for word in all_words_from_letters:
            if trie.include(word):
                response[word] = Words.calculate_points(word)
            # else:
            #     all_words_from_letters = list(filter(lambda w: not w.startswith(word), all_words_from_letters))

        end = time.time()
        print("time elapsed after getting existing words from trie = ", end - start)
        return JsonResponse(response, safe=False)
        