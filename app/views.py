import threading
from django.shortcuts import render
from rest_framework import response
from rest_framework.response import Response
from app.words import Words
from django.apps import apps
from .models import Word
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import WordSerializer
from django.http import JsonResponse
import datetime
import socket               # Import socket module



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
        response = {}
        start = datetime.datetime.now()
        letters = [ch for ch in request.GET['letters']]
        all_words_from_letters = Words.get_all_words_from_letters(letters=letters)
        print("nr of words to check: ", len(all_words_from_letters))
        end = datetime.datetime.now()
        print("time elapsed after generating all words from letters = ", (end - start).total_seconds())
        # trie = apps.get_app_config('app').trie
        start = datetime.datetime.now()

        s = socket.socket()         # Create a socket object
        s.connect(('localhost', 8080))
        
        for word in all_words_from_letters:
            s.sendall(word.encode())
            data = s.recv(1024)
            if int(data) == 1:
                response[word] = Words.calculate_points(word)
            # else:
            #     all_words_from_letters = list(filter(lambda w: not w.startswith(word), all_words_from_letters))

        s.close()
        end = datetime.datetime.now()
        print("time elapsed after all = ", (end - start).total_seconds())
        return JsonResponse(response, safe=False)