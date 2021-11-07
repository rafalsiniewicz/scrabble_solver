#include <iostream>
#include <unordered_map>
#include <chrono>
#include <fstream>
#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <chrono>
#include <typeinfo>
#include <fstream>
#include <string>
#include <locale>
#include <cstdlib>
#include <algorithm>
#include <cctype>
#include <chrono>
#include <sstream>
#include <codecvt>
using namespace std;
 
// Data structure to store a Trie node
struct Trie
{
    // true when the node is a leaf node
    bool isLeaf;
 
    // each node stores a map to its child nodes
    unordered_map<char, Trie*> map;
};
 
// Function that returns a new Trie node
Trie* getNewTrieNode()
{
    Trie* node = new Trie;
    node->isLeaf = false;
 
    return node;
}
 
// Iterative function to insert a string into a Trie
void insert(Trie*& head, const char* str)
{
    if (head == nullptr) {
        head = getNewTrieNode();
    }
 
    // start from the root node
    Trie* curr = head;
    while (*str)
    {
        // create a new node if the path doesn't exist
        if (curr->map.find(*str) == curr->map.end()) {
            curr->map[*str] = getNewTrieNode();
        }
 
        // go to the next node
        curr = curr->map[*str];
 
        // move to the next character
        str++;
    }
 
    // mark the current node as a leaf
    curr->isLeaf = true;
}
 
// Returns true if the given node has any children
bool haveChildren(Trie const* curr)
{
    // don't use `(curr->map).size()` to check for children
 
    for (auto it: curr->map)
    {
        if (it.second != nullptr) {
            return true;
        }
    }
 
    return false;
}
 
// Recursive function to delete a string from a Trie
bool deletion(Trie*& curr, const char* str)
{
    // return if Trie is empty
    if (curr == nullptr) {
        return false;
    }
 
    // if the end of the string is not reached
    if (*str)
    {
        // recur for the node corresponding to the next character in
        // the string and if it returns true, delete the current node
        // (if it is non-leaf)
        if (curr != nullptr && curr->map.find(*str) != curr->map.end() &&
            deletion(curr->map[*str], str + 1) && curr->isLeaf == false)
        {
            if (!haveChildren(curr))
            {
                delete curr;
                curr = nullptr;
                return true;
            }
            else {
                return false;
            }
        }
    }
 
    // if the end of the string is reached
    if (*str == '\0' && curr->isLeaf)
    {
        // if the current node is a leaf node and doesn't have any children
        if (!haveChildren(curr))
        {
            delete curr;    // delete the current node
            curr = nullptr;
            return true;    // delete the non-leaf parent nodes
        }
 
        // if the current node is a leaf node and has children
        else {
            // mark the current node as a non-leaf node (DON'T DELETE IT)
            curr->isLeaf = false;
            return false;   // don't delete its parent nodes
        }
    }
 
    return false;
}
 
// Iterative function to search a string in a Trie. It returns true
// if the string is found in the Trie; otherwise, it returns false.
bool search(Trie* head, const char* str)
{
    // return false if Trie is empty
    if (head == nullptr) {
        return false;
    }
 
    Trie* curr = head;
    while (*str)
    {
        // go to the next node
        curr = curr->map[*str];
 
        // if the string is invalid (reached end of a path in the Trie)
        if (curr == nullptr) {
            return false;
        }
 
        // move to the next character
        str++;
    }
 
    // return true if the current node is a leaf and the
    // end of the string is reached
    return curr->isLeaf;
}
 
// C++ implementation of Trie data structure
// int main()
// {
//     std::chrono::steady_clock::time_point begin_1 = std::chrono::steady_clock::now();
//     Trie* head = nullptr;
 
//     // head->insert(L"hello");
//     // cout << head->search(L"hello") << " \n";      // print 1
 
    
//     std::ifstream wif("sjp-20210625/short_words_11.txt");
//     // wif.imbue(std::locale(""));
//     // static std::locale empty;
//     // wif.imbue(std::locale(empty, new std::codecvt_utf8<wchar_t>));

//     // std::wcout.imbue(std::locale());
//     std::string str;
//     while (std::getline(wif, str)) {
//         // for (int i = 0; i < str.length(); i++)
//         //     cout << str[i];
//         str.erase(std::remove_if(str.begin(), str.end(), ::isspace), str.end());
//         insert(head, str.c_str());
//     }
//     std::chrono::steady_clock::time_point end_1 = std::chrono::steady_clock::now();
//     std::cout << "Time difference = " << std::chrono::duration_cast<std::chrono::microseconds>(end_1 - begin_1).count() << "[us]" << std::endl;
//     std::chrono::steady_clock::time_point begin = std::chrono::steady_clock::now();
//     for (int i = 0; i < 10000000; i++)
//         search(head, "babć");     
//     // cout << head->search("babć") << " \n";  
//     // head->insert(L"aą");
//     // cout << head->search("aą") << " \n";  
//     std::chrono::steady_clock::time_point end = std::chrono::steady_clock::now();
//     std::cout << "Time difference = " << std::chrono::duration_cast<std::chrono::microseconds>(end - begin).count() << "[us]" << std::endl;

//     return 0;
// }