import datetime
import socket               # Import socket module
import json

from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import render
from django.apps import apps
from django.http import JsonResponse
from django.views.generic import View

from app.words import Words
from .models import Word
from .serializers import WordSerializer




class FrontendRenderView(View):
    def get(self, request, *args, **kwargs):
        return render(request, "index.html", {})

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
        letters = list(request.GET['letters'].lower())
        if apps.get_app_config('app').use_cpp_server:
            s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)         # Create a socket object
            server_address = 'cpp/socket'
            s.connect(server_address)
            s.sendall(''.join(letters).encode())
            data = s.recv(1024*(len(letters)**5)) 
            response = json.loads(data.decode())
            print(data)

        else:
            Words.all_subsets = []
            trie = apps.get_app_config('app').trie
            start = datetime.datetime.now()
            for l in letters:
                Words.get_all_subsets(l, letters, trie)
            all_words_from_letters = Words.all_subsets
            # all_words_from_letters = Words.get_all_words_from_letters(letters=letters)
            print("nr of words to check: ", len(all_words_from_letters))
            end = datetime.datetime.now()
            print("time elapsed after generating all words from letters = ", (end - start).total_seconds())
            # trie = apps.get_app_config('app').trie
            start = datetime.datetime.now()

        

            # all_words_from_letters.remove('')
            for word in all_words_from_letters:
                if trie.include(word):
                    response[word] = Words.calculate_points(word)
                # s.sendall(word.encode())
                # data = s.recv(1024)
                # if int(data) == 1:
                #     response[word] = Words.calculate_points(word)
                # else:
                #     all_words_from_letters = list(filter(lambda w: not w.startswith(word), all_words_from_letters))

            # s.close()
            end = datetime.datetime.now()
            print("time elapsed after all = ", (end - start).total_seconds())

        return JsonResponse(response, safe=False, json_dumps_params={'ensure_ascii': False})