#include <iostream>
#include <fstream>
#include <string>
#include <locale>
#include <cstdlib>
#include <algorithm>
#include <cctype>
#include <chrono>
// Define the character size
#define CHAR_SIZE 26 + 9 // plus 9 polish letters
using namespace std;
// Data structure to store a Trie node
struct Trie
{
    int isLeaf;             // 1 when the node is a leaf node
    struct Trie* character[CHAR_SIZE];
};
 
// Function that returns a new Trie node
struct Trie* getNewTrieNode()
{
    struct Trie* node = (struct Trie*)malloc(sizeof(struct Trie));
    node->isLeaf = 0;
 
    for (int i = 0; i < CHAR_SIZE; i++) {
        node->character[i] = NULL;
    }
 
    return node;
}
 
// Iterative function to insert a string into a Trie
void insert(struct Trie *head, wstring str)
{
    // start from the root node
    struct Trie* curr = head;
    for(std::wstring::size_type i = 0; i < str.size(); ++i) {
        int index = int(str[i]) - 'a';
        // cout << index << endl;
        if (index == 164) { index = 26;}
        else if (index == 166) { index = 27;}
        else if (index == 184) { index = 28;}
        else if (index == 225) { index = 29;}
        else if (index == 227) { index = 30;}
        else if (index == 146) { index = 31;}
        else if (index == 250) { index = 32;}
        else if (index == 281) { index = 33;}
        else if (index == 283) { index = 34;}
        // printf("%d\n", index);
        // create a new node if the path doesn't exist
        if (curr->character[index] == NULL) {
            curr->character[index] = getNewTrieNode();
        }
 
        // go to the next node
        curr = curr->character[index];
    }
 
    // mark the current node as a leaf
    curr->isLeaf = 1;
}
 
// Iterative function to search a string in a Trie. It returns 1
// if the string is found in the Trie; otherwise, it returns 0.
int search(struct Trie* head, wstring str)
{
    // return 0 if Trie is empty
    if (head == NULL) {
        return 0;
    }
    struct Trie* curr = head;
    for(std::wstring::size_type i = 0; i < str.size(); ++i) {
        int index = int(str[i]) - 'a';
        if (index == 164) { index = 26;}
        else if (index == 166) { index = 27;}
        else if (index == 184) { index = 28;}
        else if (index == 225) { index = 29;}
        else if (index == 227) { index = 30;}
        else if (index == 146) { index = 31;}
        else if (index == 250) { index = 32;}
        else if (index == 281) { index = 33;}
        else if (index == 283) { index = 34;}
        // go to the next node
        curr = curr->character[index];
 
        // if the string is invalid (reached end of a path in the Trie)
        if (curr == NULL) {
            return 0;
        }
    }
 
    // return 1 if the current node is a leaf and the
    // end of the string is reached
    return curr->isLeaf;
}


int main() {
    
    struct Trie* head = getNewTrieNode();
    std::wifstream wif("sjp-20210625/slowa.txt");
    wif.imbue(std::locale(""));

    std::wcout.imbue(std::locale());
    std::wstring str;
    while (std::getline(wif, str)) {
        str.erase(std::remove_if(str.begin(), str.end(), ::isspace), str.end());
        insert(head, str);
    }
    std::chrono::steady_clock::time_point begin = std::chrono::steady_clock::now();   
    wstring a = L"abadańskimi";
    // cout << search(head, L"aą") << endl;
    // cout << search(head, L"ab") << endl;
    // cout << search(head, L"bćń") << endl;
    // cout << search(head, L"aą ") << endl;
    // cout << search(head, L"bćń ") << endl;
    cout << search(head, a) << endl;
    std::chrono::steady_clock::time_point end = std::chrono::steady_clock::now();
    std::cout << "Time difference = " << std::chrono::duration_cast<std::chrono::microseconds>(end - begin).count() << "[us]" << std::endl;
    
}
