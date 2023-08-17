let firstNumber = '';
let secondNumber = '';
let operator = null;
let shoudReset = false;

const currentDisplay = document.getElementById("display-current");
const lastDisplay = document.getElementById('display-last');

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
    currentDisplay.textContent += num;
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
    a = parseInt(a);
    console.log(a);
    b = parseInt(b);
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
            if(b === 0) return 'ERROR';
            return divide(a,b);
        default:
            break;
    }
}

const calculate = () => {
    if(operator === '÷' && currentDisplay.textContent === '0'){
        console.log('error')
        alert("You cant divide by 0!");
        return
    }else{
        secondNumber = currentDisplay.textContent;
        currentDisplay.textContent = evaluate(firstNumber, secondNumber, operator);
    }
}


