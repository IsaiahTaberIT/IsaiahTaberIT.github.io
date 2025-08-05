function sayUrMum() {


    potato = w1 + w2;
    w2 = w1;
    w1 = potato;

    console.log('ur mum has ' + potato + ' potatoes');

    potatoElement.textContent = 'ur mum has ' + potato + ' potatoes';
}

function fetchAndSetByid(file, id) {
    let element = document.getElementById(id)

    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {

            element.innerHTML = data;

        })
        .catch(error => {
            console.error('There was a problem fetching the file:', error);
        });
}

fetchAndSetByid("education", "education")
fetchAndSetByid("background", "background")

const potatoElement = document.getElementById("potatocount")
const aboutMetxt = document.getElementById("aboutme")
const currentDate = new Date();
const currentyear = currentDate.getFullYear() * 1;

let agetext = 'My name is Isaiah Taber I\'m ' +  (currentyear - 2004) + ' years old and, ';


fetch('aboutmetext')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // Parse the response as text
    })
    .then(data => {
        // Now 'data' holds the text from the file
        console.log(data);
        aboutMetxt.textContent = agetext + data;
        // You can display it in an HTML element, e.g.:
        // document.getElementById('outputDiv').textContent = data;
    })
    .catch(error => {
        console.error('There was a problem fetching the file:', error);
    });

//aboutMetxt.textContent = text;



let potato = 0;
let w1 = 1;
let w2 = 0;

//sayUrMum();