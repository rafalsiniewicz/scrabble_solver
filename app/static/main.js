// const URL='http://127.0.0.1:8000/words-from-letters/?letters=', 
const URL = 'https://scrabble-solver-app.herokuapp.com/words-from-letters/?letters='
      METHOD = 'GET';

function checkWordCorrectness(letters) {
  /*
  Use provided letters in GET request and get all existing words and their points.
  Args:
    letters (array): provided letters
  */
  const Http = new XMLHttpRequest()
  var url = URL + letters

  Http.open(METHOD, url, true)
  Http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  Http.responseType = 'json'
  Http.send()

  Http.onreadystatechange = (e) => {
    if (Http.readyState == 4) {
      if (Http.status == 200) {
        words_counter += 1
        response = Http.response;
        if (!Object.keys(response).length == 0) {
          existing_words = response;
        }
      } else {
         console.log('[Error] Http.status = ' + Http.status + '. Problem with request from: ' + URL)
      }
      getListOfExistingWords();
    }
  }
}

function getListOfExistingWords() {
  existing_words = sortDictByValue(existing_words)
  generateTable((innerhtml = existing_words))
}

function sortDictByValue(dict) {
  /*
  Sort dict by values.
  Args:
    dict (dict): dict to be sorted by values
  */
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
  return sorted_dict
}

function generateTable(innerhtml) {
  /*
  Generate table for existing words with points.
  Args:
    innerhtml
  */
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
    header.style.backgroundColor = "#3399ff"
    header.style.color = "white"
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
function getLetters() {
  return document.getElementById('letters').value.replace(/\s/g, '').replaceAll(/[^a-zA-Z\d\s:ąęćżźńśłó]/g, '');
}

function resetVariables() {
  /*
  Reset global variables
  */
  existing_words = {}
  words = {}
  words_counter = 0
}

function runCheck()
{
  /*
  Find all of the existing words with their points, basing on provided letters.
  Steps:
  1. Reset global variables
  2. Get letters provided by user
  3. Use provided letters in API endpoint
  4. Get list of existing words with points
  */
  resetVariables();
  letters = getLetters();
  checkWordCorrectness(letters);

}




