import time
import os
from subprocess import Popen
import sys
from typing import Optional, Any
from multiprocessing import Process
import subprocess

from django.apps import AppConfig

from .trie import Trie





# def run_server():
# 	subprocess.run('./server', shell=True)

class AppConfig(AppConfig):
    name = 'app'
    def __init__(self, app_name: str, app_module: Optional[Any]) -> None:
        super().__init__(app_name, app_module)
        self.trie = Trie()  
        self.use_cpp_server = False

    def ready(self) -> None:
        print("argv ", sys.argv)
        if 'use-cpp-server' in sys.argv:
            self.use_cpp_server = True
            print("Running cpp server...")
        if self.use_cpp_server:
            if 'runserver' in sys.argv:
                # pass
                proc = Popen('chmod +x cpp/server', shell=True,
                    stdin=None, stdout=None, stderr=None, close_fds=True)
                proc2 = Popen('./cpp/server', shell=True,
                    stdin=None, stdout=None, stderr=None, close_fds=True)
                time.sleep(3)
                proc3 = Popen('chmod +x cpp/socket', shell=True,
                    stdin=None, stdout=None, stderr=None, close_fds=True)
                
            # p = Process(target=run_server)
            # p.start()
            # print("here")
            # p.join()
            # os.system('  ')
            # os.system('./server')
            # pass
        else:
            start = time.time()
            with open(os.path.join("sjp-20210625","short_words_11.txt"), 'r', encoding='utf-8') as fp:
                for line in fp:
                    self.trie.insert(str(line.strip('\n')))
            
            end = time.time()
            print("time elapsed = ", end - start)

