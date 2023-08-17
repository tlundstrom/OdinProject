let firstNumber = '';
let secondNumber = '';
let operator = null;
let shoudReset = false;

const currentDisplay = document.getElementById("display-current");
const lastDisplay = document.getElementById('display-last');


const errorCheck = () => {
    if(currentDisplay.textContent === 'ERROR'){
        return 'ERROR';
    }
}

const getNumber = (e) => {
    let num =  e.target.textContent;
    appendNumber(num);
}

const getOperator = (e) => {
    let newOperator = e.target.textContent;
    setOperator(newOperator);
}

const displayReset = () =>{
    return currentDisplay.textContent = '';
}

const setText = (num) => {
    if(shoudReset){
        displayReset();
        currentDisplay.textContent = currentDisplay.textContent += num;
        shoudReset = false;
        return;
    }
    currentDisplay.textContent = currentDisplay.textContent += num;
}

const appendNumber = (num) => {
    setText(num);
}

const setOperator = (newOperator) => {
    firstNumber = currentDisplay.textContent
    operator = newOperator;
    lastDisplay.textContent = `${firstNumber} ${operator}`
    displayReset();
}

const clearDisplay = () => {
    firstNumber = '';
    secondNumber = '';
    operator = '';
    displayReset();
    lastDisplay.textContent = '';
}

const deleteCurrent = () => {
    currentDisplay.textContent = currentDisplay.textContent.toString().slice(0, -1);
}

const add = (a, b) => {
    return a+b;
}

const subtract = (a, b) => {
    return a-b;
}

const multiply = (a, b) => {
    return a*b;
}

const divide = (a, b) => {
    return a/b;
}

const evaluate = (a, b, operator) => {
    a = parseFloat(a);
    console.log(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return add(a,b)
            break;
        case '-':
            return subtract(a,b);
            break;
        case '×':
            return multiply(a,b);
        case '÷':
            if(b === 0){
                shoudReset=true;
                return 'ERROR';
            }
            return divide(a,b);
        default:
            break;
    }
}

const calculate = () => {
    if(errorCheck() !== 'ERROR'){
        secondNumber = currentDisplay.textContent;
        lastDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`
        currentDisplay.textContent = evaluate(firstNumber, secondNumber, operator);
        if(secondNumber === '0'){
            secondNumber = '';
            lastDisplay.textContent = `${firstNumber} ${operator}`
            return
        }
        firstNumber = secondNumber;
    }
}


