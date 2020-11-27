const numbers = document.querySelectorAll('.digit-num');
const operations = document.querySelectorAll('.digit-math');
const decimalBtn = document.querySelector('.digit-decimal');
const howToUseBtn = document.querySelector('#howToUse');
const resetBtns =  document.querySelectorAll('.digit-reset');
const display = document.querySelector('#display');
const aboutList = document.querySelector('#aboutList');

let currentNum = 0;
let isNewNum = false;
let pendedSign = '';


numbers.forEach(num => {
    num.addEventListener('click', (event) => {
        pressNumber(event.target.textContent);
    })
});

operations.forEach(operation => {
    operation.addEventListener('click', (event) => {
        mathOperation(event.target.textContent);
    })
});

resetBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        let id = event.srcElement.id;
        clear(id);
    })
});

decimalBtn.addEventListener('click', decimal);

howToUseBtn.addEventListener('click', howToUse);

function pressNumber(num) {
    let displayVal = display.value;
    if (isNewNum) {
        display.value = num;
        isNewNum = false;
    } else {
        display.value === '0' ? display.value = num : display.value += num;
    }
}

function mathOperation(sign) {
    let localNum = +display.value;

    if (isNewNum && pendedSign !== '=') {
        display.value = currentNum
    } else {
        isNewNum = true;

        switch (pendedSign) {
            case '÷':
                currentNum /= localNum;
                break;
            case '×':
                currentNum *= localNum;
                break;
            case '+':
                currentNum += localNum;
                break;
            case '-':
                currentNum -= localNum;
                break;
            default: currentNum = localNum;
        }
        display.value = currentNum;
        pendedSign = sign;
    }
}

function decimal() {
    let localDecimal = display.value;

    if (isNewNum) {
        localDecimal = '0.';
        isNewNum = false;
    } else {
        if (!!localDecimal.indexOf('.')) {
            localDecimal += '.';
        }
    }
    display.value = localDecimal;
}

function clear(id) {
    switch (id) {
        case 'ce':
            display.value = 0;
            isNewNum = true;
            break;
        case 'c':
            display.value = 0;
            isNewNum = true;
            currentNum = 0;
            pendedSign = '';
            break;
    }
    console.log('click on', id)
}

function howToUse() {
    operations.forEach(text => {
        let newLi = document.createElement('li');
        newLi.innerText = text.value;
        aboutList.appendChild(newLi);
    });
    howToUseBtn.setAttribute('disabled', 'disabled');
}
