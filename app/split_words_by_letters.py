import os

def write_points():
    first_letter = 'a'
    output_file = open(os.path.dirname(__file__) + "\..\sjp-20210625\words_by_letters\\a.txt", 'a', encoding='utf-8')
    file = open(os.path.dirname(__file__) + "\..\sjp-20210625\slowa3.txt", 'r', encoding='utf-8')
    lines = file.readlines()
    for line in lines:
        print(line)
        word = str(line)
        if word[0] != first_letter:
            output_file.close()
            output_file = open(os.path.dirname(__file__) + "\..\sjp-20210625\words_by_letters\{}.txt".format(word[0]), 'a', encoding='utf-8')
    
        
        output_file.write(word)

    output_file.close()
    file.close()


def remove_long_words():
    f = open("../sjp-20210625/short_words_13.txt", "a")
    with open(os.path.join("..","sjp-20210625","slowa.txt"), 'r') as fp:
        for line in fp:
            if len(line) <= 13:
                f.write(line)

    f.close()

remove_long_words()          
# write_points()