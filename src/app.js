import CashMachine from './components/CashMachine.js';

const formATM = document.getElementById('form');
const Cash = new CashMachine();

formATM.addEventListener('submit', withdrawMoney);

function withdrawMoney (e) {
  const amountInput = document.getElementById('amount');
  const amountValue = +amountInput.value;

  e.preventDefault();
  Cash.withdraw(amountValue);
}
