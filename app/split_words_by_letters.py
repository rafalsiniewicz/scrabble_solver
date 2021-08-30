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

write_points()