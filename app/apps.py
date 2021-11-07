from django.apps import AppConfig
from .trie import Trie
from typing import Optional, Any
import time
import os

class AppConfig(AppConfig):
    name = 'app'
    def __init__(self, app_name: str, app_module: Optional[Any]) -> None:
        super().__init__(app_name, app_module)
        self.trie = Trie()

    def ready(self) -> None:
        os.system('chmod +x server')
        os.system('./server')
        # pass
        # start = time.time()
        # with open(os.path.join("sjp-20210625","short_words_11.txt"), 'r', encoding='utf-8') as fp:
        #     for line in fp:
        #         self.trie.insert(str(line.strip('\n')))
        
        # end = time.time()
        # print("time elapsed = ", end - start)

