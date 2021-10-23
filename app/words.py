from typing import List

from app.models import Word
class Words:
    LETTER_POINTS = {'A': 1, 'Ą': 5, 'B': 3, 'C': 2, 'Ć': 6, 'D': 2, 'E': 1, 'Ę': 5, 'F': 5, 'G': 3, 'H': 3, 'I': 1, 'J': 3, 'K': 2, 'L': 2, 'Ł': 3, 'M': 2, 'N': 1, 'Ń': 7, 'O': 1, 
'Ó': 5, 'P': 2, 'R': 1, 'S': 1, 'Ś': 5, 'T': 2, 'U': 3, 'W': 1, 'Y': 2, 'Z': 1, 'Ź': 9, 'Ż': 5}
    def __init__(self) -> None:
        pass
        
    @staticmethod
    def permutation(l):
        if not l:
            return [[]]
        res = []
        for e in l:
            temp = l[:]
            temp.remove(e)
            res.extend([[e] + r for r in Words.permutation(temp)])
        return res

    @staticmethod
    def get_all_words_from_letters(letters: List[str]) -> List:
        listsub = list(letters)
        subsets = []
        for i in range(2**len(listsub)):
            subset = []
            for k in range(len(listsub)):
                if i & 1 << k:
                    subset.append(listsub[k])
            subsets += [''.join(i) for i in Words.permutation(subset)]
        return subsets

    @staticmethod
    def calculate_points(word: str) -> int:
        points = 0
        for ch in word:
            points += Words.LETTER_POINTS[ch.upper()]
        return points


if __name__ == "__main__":
    w = Words()
    print(w.get_all_words_from_letters(['a','b','c']))