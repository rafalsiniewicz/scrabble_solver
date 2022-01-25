# -*- coding: utf8 -*-
"""
Split letter files to up to x letters, e.g. for file a.txt split it to:
- a_up_to_1.txt
- a_up_to_2.txt
- a_up_to_3.txt
- a_up_to_4.txt
.
.
.
Analogically for b.txt, c.txt, ...
"""
import os

letters = ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'o', 'ó', 'p', 'r',
           's', 'ś', 't', 'u', 'w', 'y', 'z', 'ź', 'ż']


def split_file_by_words_length():
    for l in letters:
        print("letter = ", l)
        for n in range(1, 15):
            file = open(
                os.path.dirname(__file__) + r"\..\sjp-20210625\words_by_letters\{letter}\{letter}.txt".format(letter=l),
                'r', encoding='UTF-8')
            out_file = open(
                os.path.dirname(__file__) + r"\..\sjp-20210625\words_by_letters\{letter}\{letter}_up_to_{n}.txt".format(
                    letter=l, n=n), 'w', encoding='UTF-8')
            for line in file:
                word = line.split()[0]
                points = line.split()[1]
                if len(word) <= n:
                    out_file.write(word + ' ' + points + '\n')
            file.close()
            out_file.close()


# print("żółty")
split_file_by_words_length()
