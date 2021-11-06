from typing import List
from objsize import get_deep_size
from itertools import cycle
import os
import time

class Trie(object):
   def __init__(self):
      self.child = dict()
      self.child_list = []
      
   def insert(self, word):
      current = self.child
      for l in word:
         if l not in current:
            current[l] = {}
         current = current[l]
      current['#'] = 1

   def insert_list(self, word):
      current = self.child_list
      for l in word:
         if l not in current:
            current.extend([l, []])
         current = current[-1]
      current.append('#')

   def include(self, word):
      current = self.child
      for l in word:
         if l not in current:
            return False
         current = current[l]
      return '#' in current

   def include_list(self, word):
      current = self.child_list
      for l in word:
         if l not in current:
            return False
         current = current[current.index(l) + 1]
      return '#' in current


if __name__ == "__main__":
   trie = Trie()
   with open("C:\\Users\\rafal\\OneDrive\\Desktop\\projects\\scrabble_solver\\sjp-20210625\\short_words.txt", 'r', encoding='utf-8') as fp:
      for line in fp:
         trie.insert(str(line.strip('\n')))

   start = time.time()
   for i in range(10000000):
      trie.include("babć")

   end = time.time()
   print(end - start)
   a = get_deep_size(trie)
   b = a / (1024 * 1024)
   pass
