class Trie(object):
   def __init__(self):
      self.child = dict()
      
   def insert(self, word):
      current = self.child
      for l in word:
         if l not in current:
            current[l] = {}
         current = current[l]
      current['#'] = 1

   def include(self, word):
      current = self.child
      for l in word:
         if l not in current:
            return False
         current = current[l]
      return '#' in current