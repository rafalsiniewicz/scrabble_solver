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

// TODO remove it below as its not used
// const wchar_t *GetWC(const char *c, const size_t size)
// {
//     wchar_t* wc = new wchar_t[size];
//     mbstowcs (wc, c, size);

//     return wc;
// }
void get_all_words_from_letters(const string word, const string letters, Trie* head)
{
    string new_word = word;
    string wait;
    string letters_new = letters;
    auto pos = letters_new.find(word.back());
    if (pos != std::string::npos)    
        letters_new.erase(pos,1);
    // subsets.push_back(new_word);
    for (std::string::size_type i = 0; i < letters_new.size(); i++) {
        new_word += letters_new[i];
        if(startsWith(head, new_word.c_str()))
        {
            subsets.push_back(new_word);
            get_all_words_from_letters(new_word, letters_new, head);
        }
        new_word = word;
    }
}

int calculate_points(string word)
{
    std::map<char, int> LETTER_POINTS = {
        { 'A', 1 }, { 'Ą', 5 }, { 'B', 3 }, { 'C', 2 }, { 'Ć', 6 }, { 'D', 2 }, { 'E', 1 }, { 'Ę', 5 }, { 'F', 5 }, { 'G', 3 }, { 'H', 3 }, { 'I', 1 }, 
        { 'J', 3 }, { 'K', 2 }, { 'L', 2 }, { 'Ł', 3 }, { 'M', 2 }, { 'N', 1 }, { 'Ń', 7 }, { 'O', 1 }, { 'Ó', 5 }, { 'P', 2 }, { 'R', 1 }, { 'S', 1 }, 
        { 'Ś', 5 }, { 'T', 2 }, { 'U', 3 }, { 'W', 1 }, { 'Y', 2 }, { 'Z', 1 }, { 'Ź', 9 }, { 'Ż', 5 }
    };
    int points = 0;
    for (auto &ch: word)
        points += LETTER_POINTS[toupper(ch)];
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
       
    // Forcefully attaching socket to the port 8080
    // if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT,
    //                                               &opt, sizeof(opt)))
    // {
    //     perror("setsockopt");
    //     exit(EXIT_FAILURE);
    // }
    address.sun_family = AF_UNIX;
    // address.sin_addr.s_addr = INADDR_ANY;
    // address.sin_port = htons( PORT );
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
    // wstring str = L"aą";
    // wcout << "here " << search(head, str) << endl; 
    // cout << "here " << search(head, L"aa") << endl; 
    // cout << "here " << search(head, L"baa") << endl; 
    // cout << "here " << search(head, L"babć") << endl; 
    // wstring str1 = L"aaa";
    // wcout << str1;

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
            // for(int i = 0; buffer[i] != '\0'; ++i) {
            //     ++size;
            // }
            // wstring ws(&buffer[0], &buffer[size]);
            // const wchar_t* ws = GetWC(buffer, size + 1);
            // cout << buffer << endl;
            subsets.clear();
            string letters(buffer);
            for(auto &let: letters)
            {
                string str{let};
                // subsets.push_back(str);
                get_all_words_from_letters(str, letters, head);
                // thread th(get_all_words_from_letters, str, letters, head);
                // threads.push_back(move(th));
            }
            // cout << ws << endl;
            // wcout << ws << endl;
            
            string response = "{";
            // cout << response << endl;
            // cout << &response << endl;
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
            // if (search(head, ws.c_str()) == 1)
            // {
            //     if (send(new_socket , yes.c_str(), yes.length() , MSG_NOSIGNAL) < 0)
            //         break;
            // }
            // else if (search(head, ws.c_str()) == 0)
            // {
            //     if (send(new_socket , no.c_str(), no.length() , MSG_NOSIGNAL) < 0)
            //         break;
            // }
            // printf("%s\n",buffer );
            // const void* response = reinterpret_cast<const void*>(search(head, ws));
            // send(new_socket , response, 1 , 0 );
            // printf("Hello message sent\n");
            
        }
        
    }
    
    return 0;
}