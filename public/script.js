// THIS IS FOR AUTOMATED TESTING
if (typeof module !== 'undefined') {
  global.$ = require('jquery')
}
// END

$( document ).ready((() => {
  // DOMContent is laoded, now we can start checking HTML Elements
  // If we dont "wait" for document to be ready, we cannot access HTML elements
  // for testing purposes, you can use a "debugger;" statement or also "console.log(element)"
  console.log('DOM is ready!')
  
  getData(); // TODO: Implement getData Method
  const input = $('#hft-shoutbox-form-input-name')
  const textarea = $('#hft-shoutbox-form-textarea')
  const form = $('#hft-shoutbox-form')

  form.on('keyup', (event) => {
    if (formElementIsValid(input.val(), 3) && formElementIsValid(textarea.val(), 10)) {
      toggleAlertBox(false)
      toggleSubmit(false)
    } else {
      toggleAlertBox(true)
      toggleSubmit(true)
    }
  })

  form.on('submit', async(event) => {
    event.preventDefault();
    await saveData(input.val(), input.val(), textarea.val());
    await getData();
  })
}))

function formElementIsValid(element, minLength) {
  return element.length >= minLength
}

function toggleAlertBox(show) {
  const alertEl = $('#hft-shoutbox-alert')

  if (show) {
    alertEl.removeClass('d-none')
  } else {
    alertEl.addClass('d-none')
  }
}

function toggleSubmit(disable) {
  const submitButton = $('#hft-shoutbox-form-submit')
  submitButton.prop('disabled', disable)
}

async function getData() {
  // clear complete table
  const tableBody = $(".table > tboby")
  tableBody.empty();
  // fetch table data
 const response =  await fetch('/comment', {
    method: 'get', 
    headers: {
      "Content-Type": "application/json"
    },
  });

  const json = await response.json();
  json.forEach(elem => {
    tableBody.append(`<tr><td>&{elem.Vorname}</td><td>&{elem.Nachname}</td><td>&{elem.Kommentar}</td></tr>`);
  });
}

async function saveData(Vorname, Nachname, Kommentar) {
  
  try{
    await fetch('/comment', {
      method: 'post', 
      headers: {
        "Content-Type": "application/json"
      } ,
      body: JSON.stringify({
        Vorname, 
        Nachname,
        Kommentar,
      })
    });
  } catch (e){
      console.error(e);
  }
}

// THIS IS FOR AUTOMATED TESTING
if (typeof module !== 'undefined') {
  module.exports = {
    getData,
    saveData
  }
}
// END