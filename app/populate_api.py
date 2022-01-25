# -*- coding: utf-8 -*-
import os.path
import sys
import requests
from django.utils.encoding import force_str

URL = 'http://127.0.0.1:8000/words/'
LETTER_POINTS = {'A': 1, 'Ą': 5, 'B': 3, 'C': 2, 'Ć': 6, 'D': 2, 'E': 1, 'Ę': 5, 'F': 5, 'G': 3, 'H': 3, 'I': 1, 'J': 3,
                 'K': 2, 'L': 2, 'Ł': 3, 'M': 2, 'N': 1, 'Ń': 7, 'O': 1,
                 'Ó': 5, 'P': 2, 'R': 1, 'S': 1, 'Ś': 5, 'T': 2, 'U': 3, 'W': 1, 'Y': 2, 'Z': 1, 'Ź': 9, 'Ż': 5}


def calculateWordPoints(word):
    points = 0
    for letter in word:
        let_up = letter.upper()
        if let_up in LETTER_POINTS.keys():
            points += LETTER_POINTS[let_up]
        else:
            return -1
    return points

# def populateApi():
#     i = 0
#     client = requests.session()
#     # Retrieve the CSRF token first
#     client.get(URL)  # sets cookie

#     with open(os.path.dirname(__file__) + "\..\sjp-20210625\slowa.txt", 'r', encoding='utf-8') as file:
#         for line in file:
#             word = str(line.strip('\n'))
#             points = calculateWordPoints(word=word)
#             if points > 0:
#                 data = dict(word=word, points=points, id=i)
#                 data['Content-Type'] = 'utf-8'
#                 r = client.post(URL, headers=dict(Referer=URL), data=data)
#                 # print(r.json())
#                 i += 1
#                 print(i)

# def write_points():
#     i = 0
#     n = 0
#     file = open(os.path.dirname(__file__) + "\..\sjp-20210625\slowa2.txt", 'r', encoding='utf-8')
#     lines = file.readlines()
#     for line in lines:
#         # print(line)
#         word = str(line.strip('\n'))
#         points = calculateWordPoints(word=word)
#         lines[i] = lines[i].strip('\n') + " " + str(points) + "\n"
#         i += 1 
#         print(i)

#     file = open(os.path.dirname(__file__) + "\..\sjp-20210625\slowa2.txt", 'w', encoding='utf-8')
#     file.writelines(lines)
#     file.close()


# write_points()
