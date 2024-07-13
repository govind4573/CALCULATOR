document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const historyDisplay = document.createElement('div'); // New element for displaying operations
    historyDisplay.classList.add('history-display'); // Add CSS class for styling
    display.appendChild(historyDisplay); // Append to display container

    let currentInput = '0';
    let calculation = '';
    let resultShown = false;

    function updateDisplay() {
        display.textContent = currentInput === '' ? '0' : currentInput;
        historyDisplay.textContent = calculation; // Update history display with current calculation
    }

    function addToCurrentInput(value) {
        if (resultShown && !isNaN(value)) {
            currentInput = '';
            resultShown = false;
        }
        if (currentInput === '0' && value !== '.') {
            currentInput = '';
        }
        currentInput += value;
        updateDisplay();
    }

    function clearDisplay() {
        currentInput = '0';
        calculation = '';
        updateDisplay();
    }

    function calculate() {
        try {
            const result = eval(calculation + currentInput);
            currentInput = result.toString();
            calculation = '';
            resultShown = true;
            updateDisplay();
        } catch (error) {
            currentInput = 'Error';
            calculation = '';
            updateDisplay();
        }
    }

    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function() {
            const value = button.getAttribute('data-value');
            switch (value) {
                case 'C':
                    clearDisplay();
                    break;
                case '=':
                    calculate();
                    break;
                default:
                    if (['+', '-', '*', '/', '%', '√'].includes(value)) {
                        calculation += currentInput + value;
                        currentInput = '';
                    } else {
                        addToCurrentInput(value);
                    }
                    break;
            }
        });
    });
});
