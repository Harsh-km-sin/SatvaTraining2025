let display = document.getElementById('display');
let currentInput = '';

function appendNumber(number) {
    if (currentInput === '0') currentInput = ''; 
    currentInput += number;
    updateDisplay();
}

function appendOperator(operator) {
    if (!isNaN(currentInput.slice(-1))) { 
        currentInput += operator;
    }
    updateDisplay();
}

function appendDot() {
    const lastPart = currentInput.split(/[\+\-\*\/%]/).pop();
    console.log(currentInput.split(/[\+\-\*\/%]/) , 'lastPart');
    if (!lastPart.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0'; 
    }
    updateDisplay(); 
}


function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function calculate() {
    try {
        currentInput = eval(currentInput).toString();
    } catch (error) {
        currentInput = 'Error'; 
    }
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput || '0';
}


document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key)) {
        appendNumber(key); 
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
        appendOperator(key); 
    } else if (key === '.') {
        appendDot(); 
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault(); 
        calculate(); 
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1); 
        updateDisplay();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
});
