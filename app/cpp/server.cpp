#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <sys/un.h>
#include "trie.h"
#include <vector>
#include <algorithm>
#include <map>
#define PORT 8080
vector<string> subsets;

void initialize_trie(Trie* head)
{
    std::chrono::steady_clock::time_point begin = std::chrono::steady_clock::now();
    std::ifstream wif("sjp-20210625/short_words_11.txt");
    std::string str;
    while (std::getline(wif, str)) {
        str.erase(std::remove_if(str.begin(), str.end(), ::isspace), str.end());
        insert(head, str.c_str());
    }
    std::chrono::steady_clock::time_point end = std::chrono::steady_clock::now();
    std::cout << "Time difference = " << std::chrono::duration_cast<std::chrono::microseconds>(end - begin).count() << "[us]" << std::endl;
}

short int count_non_alpha(string str)
{
    short int nr_of_non_alpha = 0;
    for(auto &ch: str)
    {
        if (!isalpha(ch))
            nr_of_non_alpha++;
    }
    return nr_of_non_alpha;
}

void get_all_words_from_letters(const string word, const string letters, Trie* head)
{
    string new_word = word;
    string wait;
    string letters_new = letters;
    auto pos = letters_new.find(word.back());
    if (pos != std::string::npos)    
        letters_new.erase(pos,1);
    short nr_of_letters = 0;
    for (std::string::size_type i = 0; i < letters_new.size(); i++) {
        new_word += letters_new[i];
        if(startsWith(head, new_word.c_str()))
        {
            if (count_non_alpha(new_word) % 2 == 0)
                subsets.push_back(new_word);
            get_all_words_from_letters(new_word, letters_new, head);
        }
        new_word = word;  
    }
}

int calculate_points(string word)
{
    std::map<string, int> LETTER_POINTS = {
        { "a", 1 }, { "ą", 5 }, { "b", 3 }, { "c", 2 }, { "ć", 6 }, { "d", 2 }, { "e", 1 }, { "ę", 5 }, { "f", 5 }, { "g", 3 }, { "h", 3 }, { "i", 1 }, 
        { "j", 3 }, { "k", 2 }, { "l", 2 }, { "ł", 3 }, { "m", 2 }, { "n", 1 }, { "ń", 7 }, { "o", 1 }, { "ó", 5 }, { "p", 2 }, { "r", 1 }, { "s", 1 }, 
        { "ś", 5 }, { "t", 2 }, { "u", 3 }, { "w", 1 }, { "y", 2 }, { "z", 1 }, { "ź", 9 }, { "ż", 5 }
    };
    int points = 0;
    string temp = "";
    for (auto &ch: word)
    {
        if (!isalpha(ch))
        {
            temp += toupper(ch);
            if (count_non_alpha(temp) != 2)
                continue;
        }
        else
        {
            temp += toupper(ch);
        }
        points += LETTER_POINTS[temp];
        temp = "";
    }
    return points;
}
    


int main(int argc, char const *argv[])
{
    int server_fd, new_socket, valread;
    struct sockaddr_un address;
    int opt = 1;
    int addrlen = sizeof(address);
       
    // Creating socket file descriptor
    if ((server_fd = socket(AF_UNIX, SOCK_STREAM, 0)) == 0)
    {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }
       
    address.sun_family = AF_UNIX;
    char *path = strcpy(address.sun_path, "socket");
    unlink(path);

    // Forcefully attaching socket to the port 8080
    if (bind(server_fd, (struct sockaddr *)&address, 
                                 sizeof(address))<0)
    {
        perror("bind failed");
        exit(EXIT_FAILURE);
    }
    if (listen(server_fd, 3) < 0)
    {
        perror("listen");
        exit(EXIT_FAILURE);
    }

    Trie* head = nullptr;
    std::chrono::steady_clock::time_point begin = std::chrono::steady_clock::now();
    std::ifstream wif("sjp-20210625/short_words_11.txt");
    std::string str;
    while (std::getline(wif, str)) {
        str.erase(std::remove_if(str.begin(), str.end(), ::isspace), str.end());
        insert(head, str.c_str());
    }
    std::chrono::steady_clock::time_point end = std::chrono::steady_clock::now();
    std::cout << "Time difference = " << std::chrono::duration_cast<std::chrono::microseconds>(end - begin).count() << "[us]" << std::endl;

    while(1)
    {
        
        // short size = 0;
        if ((new_socket = accept(server_fd, (struct sockaddr *)&address, 
                       (socklen_t*)&addrlen))<0)
        {
            perror("accept");
            exit(EXIT_FAILURE);
        }
        else{
            cout << "new accept" << endl;
        }
        while(1)
        {
            char buffer[1024] = {0};
            valread = read( new_socket , buffer, 1024);
            subsets.clear();
            string letters(buffer);
            for(auto &let: letters)
            {
                string str{let};
                get_all_words_from_letters(str, letters, head);
            }
            
            string response = "{";
            for (auto w: subsets)
            {
                response += "\"";
                response += w;
                response += "\": ";
                response += to_string(calculate_points(w));
                response += ", ";
            }
            try {
                response.erase(response.length()-2);
            }
            catch(...)
            {

            }
            response += "}";
            cout << response << endl;
            if (send(new_socket , response.c_str(), response.length() , MSG_NOSIGNAL) < 0)
                break;       
        }
        
    }
    
    return 0;
}