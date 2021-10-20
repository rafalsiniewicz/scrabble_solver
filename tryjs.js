function TrieNode(key) {
  // the "key" value will be the character in sequence
  this.key = key;
  
  // we keep a reference to parent
  this.parent = null;
  
  // we have hash of children
  this.children = {};
  
  // check to see if the node is at the end
  this.end = false;
}

// iterates through the parents to get the word.
// time complexity: O(k), k = word length
TrieNode.prototype.getWord = function() {
  var output = [];
  var node = this;
  
  while (node !== null) {
    output.unshift(node.key);
    node = node.parent;
  }
  
  return output.join('');
};

// -----------------------------------------

// we implement Trie with just a simple root with null value.
function Trie() {
  this.root = new TrieNode(null);
}

// inserts a word into the trie.
// time complexity: O(k), k = word length
Trie.prototype.insert = function(word) {
  var node = this.root; // we start at the root 😬
  
  // for every character in the word
  for(var i = 0; i < word.length; i++) {
    // check to see if character node exists in children.
    if (!node.children[word[i]]) {
      // if it doesn't exist, we then create it.
      node.children[word[i]] = new TrieNode(word[i]);
      
      // we also assign the parent to the child node.
      node.children[word[i]].parent = node;
    }
    
    // proceed to the next depth in the trie.
    node = node.children[word[i]];
    
    // finally, we check to see if it's the last word.
    if (i == word.length-1) {
      // if it is, we set the end flag to true.
      node.end = true;
    }
  }
};

// check if it contains a whole word.
// time complexity: O(k), k = word length
Trie.prototype.contains = function(word) {
  var node = this.root;
  
  // for every character in the word
  for(var i = 0; i < word.length; i++) {
    // check to see if character node exists in children.
    if (node.children[word[i]]) {
      // if it exists, proceed to the next depth of the trie.
      node = node.children[word[i]];
    } else {
      // doesn't exist, return false since it's not a valid word.
      return false;
    }
  }
  
  // we finished going through all the words, but is it a whole word?
  return node.end;
};

// returns every word with given prefix
// time complexity: O(p + n), p = prefix length, n = number of child paths
Trie.prototype.find = function(prefix) {
  var node = this.root;
  var output = [];
  
  // for every character in the prefix
  for(var i = 0; i < prefix.length; i++) {
    // make sure prefix actually has words
    if (node.children[prefix[i]]) {
      node = node.children[prefix[i]];
    } else {
      // there's none. just return it.
      return output;
    }
  }
  
  // recursively find all words in the node
  findAllWords(node, output);
  
  return output;
};

// recursive function to find all words in the given node.
function findAllWords(node, arr) {
  // base case, if node is at a word, push to output
  if (node.end) {
    arr.unshift(node.getWord());
  }
  
  // iterate through each children, call recursive findAllWords
  for (var child in node.children) {
    findAllWords(node.children[child], arr);
  }
}


LETTER_POINTS = {'A': 1, 'Ą': 5, 'B': 3, 'C': 2, 'Ć': 6, 'D': 2, 'E': 1, 'Ę': 5, 'F': 5, 'G': 3, 'H': 3, 'I': 1, 'J': 3, 'K': 2, 'L': 2, 'Ł': 3, 'M': 2, 'N': 1, 'Ń': 7, 'O': 1, 
'Ó': 5, 'P': 2, 'R': 1, 'S': 1, 'Ś': 5, 'T': 2, 'U': 3, 'W': 1, 'Y': 2, 'Z': 1, 'Ź': 9, 'Ż': 5}





// import { factorial } from 'mathjs';
// const URL='http://www.pfs.org.pl/files/php/osps_funkcje3.php',
var METHOD = 'GET'
var response
var existing_words = {}
var words_counter = 0

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

function checkWordCorrectness(word) {
  // alert("5");
  // var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  // alert("6");
  const Http = new XMLHttpRequest()
  // alert("7");
  // var params = 's=spr&slowo_arbiter2=' + word;
  // var params = '?word=' + word;
  // alert(params);
  var URL = 'http://127.0.0.1:8000/words?word=' + word

  Http.open(METHOD, URL, true)
  Http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  Http.responseType = 'json'
  Http.send()

  Http.onreadystatechange = (e) => {
    // var status = Http.status;
    if (Http.readyState == 4) {
      if (Http.status == 200) {
        words_counter += 1
        // console.log(words_counter);
        response = Http.response
        // alert(typeof response);
        console.log(response)
        // alert(response);
        // if (response === '1'){
        if (response.count > 0) {
          // console.log("yes");
          // console.log(response);
          add_to_existing_words(
            response.results[0].word + '\t' + response.results[0].points,
          )
          // alert("yes");
        }
        // add_to_existing_words(word);
        // else{
        // 	// console.log("no");
        // }
      } else {
        console.log(
          '[Error] Http.status = ' +
            Http.status +
            '. Problem with request from: ' +
            URL,
        )
      }
      if (words_counter === number_of_words) {
        get_list_of_existing_words()
      }
    }
    // else
    // {
    // 	console.log("[Error] Http.readyState = " + Http.readyState);
    // }
    //console.log(Http.responseText)
  }

  // console.log(response);
}

function add_to_existing_words(word, points) {
  existing_words[word] = points
  // console.log(existing_words);
}

function get_list_of_existing_words() {
  var show_on_page = ''
  // console.log('Existing words')
  // // alert("Existing words 2 " + existing_words);
  // for (const word in existing_words) {
  //   console.log('Word: ' + word + ', Points: ' + existing_words[word])
  // }
  show_on_page = show_on_page.replace(/(\r\n|\n|\r)/gm, '')
  if (show_on_page == '') {
    show_on_page = 'There are no existing words for those letters!'
  }
  existing_words = sort_dict_by_value(existing_words)
  generate_table((innerhtml = existing_words))
}

function sort_dict_by_value(dict) {
  var values = Object.keys(dict).map(function (key) {
    return dict[key]
  })
  values.sort(function (a, b) {
    return b - a
  })
  const sorted_dict = new Map()
  for (let i = 0; i < values.length; i++) {
    for (var key in dict) {
      if (values[i] == dict[key]) {
        sorted_dict[key] = values[i]
        delete dict[key]
        break
      }
    }
  }
  // console.log(values)
  // console.log(sorted_dict)
  return sorted_dict
}

module.exports = {sort_dict_by_value, factorial};

function generate_table(innerhtml) {
  // for (const word in existing_words)
  // {
  // 	console.log(word + " = " + existing_words[word]);
  // }
  // get the reference for the body
  var body = document.getElementsByTagName('body')[0]
  t = document.getElementById('table')
  if (t != null) {
    t.parentNode.removeChild(t)
  }
  // creates a <table> element and a <tbody> element
  var tbl = document.createElement('table')
  tbl.id = 'table'
  var tblBody = document.createElement('tbody')
  tblBody.id = 'tbody'

  header_text = ['Word', 'Points']
  // create table header
  var row = document.createElement('tr')
  for (var i = 0; i < 2; i++) {
    var header = document.createElement('th')
    var headerText = document.createTextNode(header_text[i])
    header.appendChild(headerText)
    row.appendChild(header)
  }
  tblBody.appendChild(row)

  // creating all cells
  for (var i = 0; i < Object.keys(innerhtml).length; i++) {
    // creates a table row
    var row = document.createElement('tr')

    for (var j = 0; j < 2; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement('td')
      key = Object.keys(innerhtml)[i]
      if (j == 0) var cellText = document.createTextNode(key)
      else var cellText = document.createTextNode(innerhtml[key])
      cell.appendChild(cellText)
      row.appendChild(cell)
    }

    // add the row to the end of the table body
    tblBody.appendChild(row)
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody)
  // appends <table> into <body>
  body.appendChild(tbl)
  // sets the border attribute of tbl to 2;
  tbl.setAttribute('border', '2')
  // document.getElementById("demo2").innerHTML = innerhtml;
}

var words = {}
var number_of_words = 0

function factorial(num) {
  if (num === 0) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
}

// This function counts instances of elements in an array
// the return object has the array elements as keys
// and number of occurrences as it's value
const arrToInstanceCountObj = (arr) =>
  arr.reduce((obj, e) => {
    obj[e] = (obj[e] || 0) + 1
    return obj
  }, {})

function get_all_letters_permutations(letters) {
  // get all permutations without without repetition
  // console.log("comb " + words);
  occurrences = arrToInstanceCountObj(letters)
  n = factorial(letters.length)
  for (const letter in occurrences) {
    n /= factorial(occurrences[letter])
  }
  // alert("tutaj " + n);
  permutations = []
  while (permutations.length < n) {
    if (permutations.length === 0) {
      // alert("fista");
      w = letters.join('')
      permutations.push(w)
      // alert(w);
      // alert(permutations);
    } else {
      // alert("here");
      let shuffled = letters
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
      word = shuffled.join('')
      // alert(word);
      if (!permutations.includes(word)) {
        permutations.push(word)
      }
      // alert("after word");
    }
    // alert(permutations);
    // alert(i);
  }
  for (var i of permutations) {
    words.push(i)
  }
}

function convert_To_Len_th_base(arr, len) {
  // Sequence is of length len
  for (var i = 0; i < parseInt(Math.pow(len, len)); i++) {
    n = i
    wo = ''
    arr2 = [...arr]
    for (j = 0; j < len; j++) {
      // Print the ith element
      // of sequence
      wo += arr2[n % len]
      // alert(arr);
      arr2[n % len] = ''
      // alert(arr);
      n = parseInt(n / len)
    }
    // words.push(wo)
    if (wo[0] in words) {
      // if (!words[wo[0]].includes(wo)) {
      // console.log("wo[0] =", wo[0], " wo =", wo)
      words[wo[0]].add(wo)
      // }
    } else {
      // console.log("wo[0] =", wo[0], " wo =", wo)
      words[wo[0]] = new Set(wo)
    }
    
  }
  // remove_duplicates()
}

function remove_duplicates() {
  for (let key in words) {
    words[key] = [...new Set(words[key])]
  }
}

// Print all the permuataions
// function print( arr, len, L)
// {
//     // There can be (len)^l
//     // permutations
//     for (var i = 0; i < parseInt(Math.pow(len, L)); i++) {
//         // Convert i to len th base
//         convert_To_Len_th_base(i, arr, len, L);
//     }
// }

function get_words() {
  var letters = document
    .getElementById('letters')
    .value.replace(/\s/g, '')
    .split(',')
  // print(arr,len,L);
  convert_To_Len_th_base(letters, letters.length)
  // alert(words);
  // alert(letters);
  // get_all_letters_permutations(letters);
  // alert(letters);
  // while (letters.length > 0)
  // {
  // 	get_all_letters_permutations(letters);
  // 	letters.pop();
  // 	alert(letters);
  // }
  // number_of_words = words.length;
  // alert(number_of_words);
  // for (let i=0; i < number_of_words; i++)
  // 	alert(words[i]);
  return letters
}

function reset_variables() {
  existing_words = {}
  words = {}
  words_counter = 0
}

function run_check() {
  // alert("existing_words " + existing_words);
  // alert("words" + words);
  reset_variables()
  // get_words();
  // readTextFile(file="sjp-20210625\\slowa2.txt");
  letters = get_words()
  for (const [key, value] of Object.entries(words)) {
    console.log(key, value)
  }
  for (const l of letters) {
    readTextFile(
      (file =
        'sjp-20210625\\words_by_letters\\' +
        l +
        '\\' +
        l +
        '_up_to_' +
        letters.length.toString() +
        '.txt'),
      (letter = l),
    )
  }

  // alert("words" + words);
  // for (let i=0; i < words.length; i++) {
  // 	// alert(words[i]);
  // 	// alert("2");
  // 	checkWordCorrectness(words[i]);
  // 	// sleep(1000);
  // 	// alert("3");
  // 	// console.log(response);
  // 	  // console.log(existing_words);
  //   }
}

function readTextFile(file, letter) {
  var allText = ''
  var rawFile = new XMLHttpRequest()
  rawFile.open('GET', file, false)
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allText = rawFile.responseText
        show_text(allText, (letter = letter))
      }
    }
  }
  rawFile.send(null)
}

function show_text(allText, letter) {
  // Windows: '\r\n'
  // Mac (OS 9-): '\r'
  // Mac (OS 10+): '\n'
  // Unix/Linux: '\n'

  // console.log("allText\n");
  trie = new Trie();

  // TODO refactor below code
  allText = allText.replace(/[\r\n]+/g, '\n')
  lines = allText.split('\n')
  for (var line = 0; line < lines.length; line++) {
    // console.log(lines[line]);
    // console.log(lines[line] === "aa");
    // console.log(typeof(lines[line]));
    word = lines[line].split(' ')[0];
    // points = lines[line].split(' ')[1];
    // console.log(word);
    // if (words[letter].has(word)) {
    //   existing_words[word] = points
    // }
    trie.insert(word);
  }
  for (const word of words[letter])
  {
    if (trie.contains(word))
    {
      existing_words[word] = calc_points(word.toUpperCase());
    }
  }
  get_list_of_existing_words()
}

function calc_points(word)
{
    points = 0;
    for (const c of word) {
      points += LETTER_POINTS[c];
    }
    return points;
}


// window.run_check = run_check

// run_check();

// checkWordCorrectness(words[1]);
// console.log(response);
// console.log(existing_words);

// sleep(10000).then(() => {
//     // Do something after the sleep!
//     console.log(ret);
// });





