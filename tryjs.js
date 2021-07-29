// import { factorial } from 'mathjs';
// const URL='http://www.pfs.org.pl/files/php/osps_funkcje3.php',
const URL='https://scrabble123.pl/checkWordForm'
	METHOD = 'POST';
var response;
var existing_words = [];
var words_counter = 0;
var LETTER_POINTS = {'A': 1, 'Ą': 5, 'B': 3, 'C': 2, 'Ć': 6, 'D': 2, 'E': 1, 'Ę': 5, 'F': 5, 'G': 3, 'H': 3, 'I': 1, 'J': 3, 'K': 2, 'L': 2, 'M': 2, 'N': 1, 'Ń': 7, 'O': 1, 'Ó': 5, 'P': 2, 
					'R': 1, 'S': 1, 'Ś': 5, 'T': 2, 'U': 3, 'W': 1, 'Y': 2, 'Z': 1, 'Ź': 9, 'Ż': 5};

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function checkWordCorrectness(word) {
	// alert("5"); 
	// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	// alert("6");
	const Http = new XMLHttpRequest();
	// alert("7");
	// var params = 's=spr&slowo_arbiter2=' + word;
	var params = 'checkWord=' + word;
	
	Http.open(METHOD, URL, true);
	Http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	Http.send(params);
	
	Http.onreadystatechange = (e) => {
		// var status = Http.status;
		if (Http.readyState == 4)
		{
			if (Http.status == 200)
			{
				words_counter += 1;
				// console.log(words_counter);
				response = Http.responseText;
				// alert(response);
				// console.log(response);
				// if (response === '1'){
				if (response.includes("text-success")){	
					// console.log("yes");
					add_to_existing_words(word);
					// alert("yes");
				}
				// else{
				// 	// console.log("no");
				// }
			}
			else{
			console.log("problem with request from: " + URL);
			}
			if (words_counter === number_of_words)
			{
				get_list_of_existing_words();
			}

		}
	  	//console.log(Http.responseText)
	}
	
	// console.log(response);
}

function add_to_existing_words(word)
{
	existing_words.push(word);
	// console.log(existing_words);
}

function get_list_of_existing_words()
{
	var show_on_page = '';
	console.log("Existing words");
	// alert("Existing words 2 " + existing_words);
	for (const word of existing_words)
	{
		console.log("Word: " + word);
		show_on_page += word + "\n";
	}
	show_on_page = show_on_page.replace(/(\r\n|\n|\r)/gm, "<br>");
	document.getElementById("demo2").innerHTML = show_on_page;
}


var words = [];
var number_of_words = 0; 

function factorial(num)
{
    if (num === 0)
      { return 1; }
    else
      { return num * factorial( num - 1 ); }
}

// This function counts instances of elements in an array
// the return object has the array elements as keys
// and number of occurrences as it's value
const arrToInstanceCountObj = arr => arr.reduce((obj, e) => {
	obj[e] = (obj[e] || 0) + 1;
	return obj;
  }, {});
  
//   arrToInstanceCountObj(['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd'])
  /*
	{
	  h: 1,
	  e: 1,
	  l: 3,
	  o: 2,
	  w: 1,
	  r: 1,
	  d: 1,
	}
  */

function get_all_letters_permutations(letters)
{
	occurrences = arrToInstanceCountObj(letters);
	n = factorial(letters.length);
	for (const letter in occurrences)
	{
		n /= factorial(occurrences[letter]);
	}
	// alert("tutaj " + n);
	while(words.length != n)
	{

		if (words.length === 0) 
		{
			// alert("fista");
			w = letters.join("");
			words.push(w);
			// alert(w);
			// alert(words);
			
		} 
		else 
		{
			// alert("here");
			let shuffled = letters
			.map((value) => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value)
			word = shuffled.join("");
			// alert(word);
			if(!(words.includes(word)))
			{
				words.push(word);
			}
			// alert("after word");
			
		}
		// alert(words);
		// alert(i);
	}
	

}


function get_words()
{
	var letters = document.getElementById('letters').value.replace(/\s/g, '').split(",");
	// alert(letters);
	get_all_letters_permutations(letters);
	number_of_words = words.length;
	// alert(number_of_words);
	// for (let i=0; i < number_of_words; i++)
	// 	alert(words[i]);
	
}

function reset_variables ()
{
	existing_words = [];
	words = [];
	words_counter = 0;
}

function run_check()
{
	// alert("existing_words " + existing_words);
	// alert("words" + words);
	reset_variables();
	get_words();
	// alert("words" + words);
	for (let i=0; i < words.length; i++) {
		// alert(words[i]);
		// alert("2");
		checkWordCorrectness(words[i]);
		// alert("3");
		// console.log(response);
		  // console.log(existing_words);
	  }
}

window.run_check = run_check;

// run_check();

// checkWordCorrectness(words[1]);
// console.log(response);
// console.log(existing_words);

// sleep(10000).then(() => {
//     // Do something after the sleep!
//     console.log(ret);
// });



// function loadDoc() {
//   const xhttp = new XMLHttpRequest();
//   xhttp.onload = function() {
//     document.getElementById("demo").innerHTML = this.responseText;
//     }
//   xhttp.open("GET", "ajax_info.txt", true);
//   xhttp.send();
// }
