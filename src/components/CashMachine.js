import Errors from './Exceptions.js';

export default class CashMachine {
  constructor () {
    this.bills = [10, 20, 50, 100].sort((x, y) => x + y);
    this.minimum = Math.min(...this.bills);
    this.counter = {}
    
    for (let bill in this.bills) {
      this.counter[this.bills[bill]] = 0
    }
  }

  validate (value) {
    const min = this.minimum;
    let error;

    if (!value) {
      error = Errors.EMPTY_SET;
      
      this.printResponse(error.message, true);
      error.throw();
    }

    if (value < 0) {
      error = Errors.InvalidArgumentException;
      
      this.printResponse(error.message, true);
      error.throw();
    }

    if (value % min) {
      error = Errors.NoteUnavailableException;
      
      this.printResponse(error.message, true);
      error.throw();
    }
  }

  calculate (value) {
    this.bills.map(bill => {
      if (value) {
        const numBills = Math.floor(value / bill);
        this.counter[bill] = numBills;

        value = value - (numBills * bill);
      }
    })

    return this.counter
  }

  withdraw (value) {
    this.validate(value);
    this.printResponse(this.calculate(value));
  }

  printResponse (message, error) {
    let list;
    const response = document.getElementById('response');
    message = message || '';

    response.classList.remove('error');
    response.innerHTML = '';

    if (error) {
      response.className += 'error';
      response.innerHTML = message;
      
      return;
    }

    list = document.createElement('ul');

    for (let value in this.counter) {
      if (this.counter.hasOwnProperty(value) && this.counter[value]) {
        const item = document.createElement('li');
        const count = this.counter[value];
        const formatted = parseFloat(value).toFixed(2);
        const text = `<span>${count} x $<span>${formatted}</span>`;
        item.innerHTML = text;
        
        list.appendChild(item);
        response.appendChild(list);
      }
    }
  }
}
