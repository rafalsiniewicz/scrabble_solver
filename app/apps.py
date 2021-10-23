from django.apps import AppConfig
from .trie import Trie
from typing import Optional, Any
import time
import os

def read_file(filename):
    with open(filename, 'r', encoding='utf-8') as fp:
        for line in fp:
            yield line

class AppConfig(AppConfig):
    name = 'app'
    def __init__(self, app_name: str, app_module: Optional[Any]) -> None:
        super().__init__(app_name, app_module)
        self.trie = Trie()

    def ready(self) -> None:
        start = time.time()
        file_lines = read_file(filename=os.path.join("sjp-20210625","slowa.txt"))
        for line in file_lines:
            self.trie.insert(str(line.strip('\n')))
        
        end = time.time()
        print("time elapsed = ", end - start)

