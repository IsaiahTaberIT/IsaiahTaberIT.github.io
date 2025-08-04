function sayUrMum() {


    potato = w1 + w2;
    w2 = w1;
    w1 = potato;

    console.log('ur mum has ' + potato + ' potatoes');

    potatoElement.textContent = 'ur mum has ' + potato + ' potatoes';
}

const potatoElement = document.getElementById("potatocount")



let potato = 0;
let w1 = 1;
let w2 = 0;

sayUrMum();