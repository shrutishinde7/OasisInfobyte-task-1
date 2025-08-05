const display = document.getElementById('display');
let currentInput = '', previousInput = '', operation = '';

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.textContent;

    if (val === 'C') {
      currentInput = previousInput = operation = '';
      display.value = '0';
    } else if (val === '←') {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput || '0';
    } else if (val === '=') {
      if (currentInput && previousInput && operation) calculate();
    } else if (['+', '‑', '*', '/'].includes(val)) {
      if (currentInput === '' && previousInput) operation = val;
      else {
        previousInput = currentInput;
        operation = val;
        currentInput = '';
      }
    } else { // digit or decimal
      if (!(val === '.' && currentInput.includes('.'))) {
        currentInput += val;
        display.value = currentInput;
      }
    }
  });
});

function calculate() {
  const a = parseFloat(previousInput);
  const b = parseFloat(currentInput);
  let result;
  switch (operation) {
    case '+': result = a + b; break;
    case '‑': result = a - b; break;
    case '*': result = a * b; break;
    case '/': result = b !== 0 ? a / b : 'Error'; break;
    default: return;
  }
  display.value = result;
  currentInput = result.toString();
  previousInput = '';
  operation = '';
}
