let add = (a, b) => a + b
let subtract = (a, b) => a - b
let multiply = (a, b) => a * b
let divide = (a, b) => a / b

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case '✕':
            return multiply(a, b)
        case '÷':
            if (b === 0) return null
            else return divide(a, b)
        default:
            return null
    }
}

let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false
let screenIsResult = true

const screenCurrent = document.querySelector('.screen-current')
const screenLast = document.querySelector('.screen-last')
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const clearButton = document.querySelector('.clearButton')
const equalsButton = document.querySelector('.equalsButton')
const pointButton = document.querySelector('.pointButton')
const deleteButton = document.querySelector('.deleteButton')

equalsButton.addEventListener('click', evaluate)

clearButton.addEventListener('click', clear)

pointButton.addEventListener('click', appendPoint)

deleteButton.addEventListener('click', deleteNumber)

window.addEventListener('keydown', handleKeyboardInput)

numberButtons.forEach((button) => 
button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) => 
    button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
    if (shouldResetScreen) resetScreen()
    screenCurrent.textContent += number
    screenIsResult = false
}

function resetScreen() {
    screenCurrent.textContent = ''
    shouldResetScreen = false
}

function setOperation(operator) {
    if (currentOperation !== null) {
        if (screenIsResult) {
            firstOperand = screenCurrent.textContent
            currentOperation = operator
            screenLast.textContent = `${firstOperand} ${currentOperation}`
            screenCurrent.textContent = ''
        } else {
            evaluate()
            firstOperand = screenCurrent.textContent
            currentOperation = operator
            screenLast.textContent = `${firstOperand} ${currentOperation}`
        }
    } else {
        firstOperand = screenCurrent.textContent
        currentOperation = operator
        screenLast.textContent = `${firstOperand} ${currentOperation}`
        screenCurrent.textContent = ''
    }
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === '÷' && screenCurrent.textContent === '0') {
        alert("You can't divide by 0!")
        return
    }
    secondOperand = screenCurrent.textContent
    screenLast.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    screenCurrent.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand))
    currentOperation = null
    shouldResetScreen = true
    screenIsResult = true
}

function clear() {
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
    shouldResetScreen = false
    screenCurrent.textContent = ''
    screenLast.textContent = ''
}

function roundResult(number) {
    return Math.round(number * 1000000) / 1000000
}

function appendPoint() {
    if (shouldResetScreen) resetScreen()
    if (screenCurrent.textContent === '')
    screenCurrent.textContent = '0'
    if (screenCurrent.textContent.includes('.')) return
    screenCurrent.textContent += '.'
}

function deleteNumber() {
    screenCurrent.textContent = screenCurrent.textContent
        .toString()
        .slice(0, -1)
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}
  
function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '✕'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === '+') return '+'
}