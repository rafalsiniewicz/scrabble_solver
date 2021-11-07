#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include "other_trie.h"
#define PORT 8080

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


const wchar_t *GetWC(const char *c, const size_t size)
{
    wchar_t* wc = new wchar_t[size];
    mbstowcs (wc, c, size);

    return wc;
}

int main(int argc, char const *argv[])
{
    int server_fd, new_socket, valread;
    struct sockaddr_in address;
    int opt = 1;
    int addrlen = sizeof(address);
       
    // Creating socket file descriptor
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0)
    {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }
       
    // Forcefully attaching socket to the port 8080
    if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT,
                                                  &opt, sizeof(opt)))
    {
        perror("setsockopt");
        exit(EXIT_FAILURE);
    }
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons( PORT );
       
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
        char buffer[1024] = {0};
        valread = read( new_socket , buffer, 1024);
        // for(int i = 0; buffer[i] != '\0'; ++i) {
        //     ++size;
        // }
        // wstring ws(&buffer[0], &buffer[size]);
        // const wchar_t* ws = GetWC(buffer, size + 1);
        cout << buffer << endl;
        string ws(buffer);
        // cout << ws << endl;
        // wcout << ws << endl;
        if (search(head, ws.c_str()) == 1)
        {
            send(new_socket , "1", 1 , 0);
        }
        else if (search(head, ws.c_str()) == 0)
        {
            send(new_socket , "0", 1 , 0);
        }
        // printf("%s\n",buffer );
        // const void* response = reinterpret_cast<const void*>(search(head, ws));
        // send(new_socket , response, 1 , 0 );
        // printf("Hello message sent\n");
    }
    
    return 0;
}