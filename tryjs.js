const URL='http://127.0.0.1:8000/words-from-letters?letters=', 
      METHOD = 'GET';

function checkWordCorrectness(letters) {
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
        get_list_of_existing_words()
    }
  }
}

function get_list_of_existing_words() {
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
  return sorted_dict
}

module.exports = {sort_dict_by_value, factorial};

function generate_table(innerhtml) {

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
function get_letters() {
  return document.getElementById('letters').value.replace(/\s/g, '').replaceAll(/[^a-zA-Z\d\s:]/g, '');
}

function reset_variables() {
  existing_words = {}
  words = {}
  words_counter = 0
}

function run_check()
{
  reset_variables();
  letters = get_letters();
  checkWordCorrectness(letters);

}




