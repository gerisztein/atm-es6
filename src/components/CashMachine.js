import Errors from './Exceptions.js';

export default class CashMachine {
  constructor () {
    this.bills = [10, 20, 50, 100].sort((x, y) => y - x);
    this.minimum = Math.min(...this.bills);
  }

  validate (value) {
    const min = this.minimum;

    if (!value) {
      this.handleError('EMPTY_SET')
    }

    if (value < 0) {
      this.handleError('InvalidArgumentException');
    }

    if (value % min) {
      this.handleError('NoteUnavailableException');
    }
  }

  calculate (value) {
    return this.bills
      .reduce((counter, bill) => {
        const numBills = Math.floor(value / bill);
        counter[bill] = numBills;
        value -= (numBills * bill);

        return counter;
      }, {})
  }

  handleError (error) {
    const obj = Errors[error];

    this.printResponse(obj.message, true);
    obj.throw();
  }

  withdraw (value) {
    this.validate(value);
    this.printResponse(this.calculate(value));
  }

  printResponse (message = '', error) {
    let list;
    const response = document.getElementById('response');

    response.classList.remove('error');
    response.innerHTML = '';

    if (error) {
      response.className += 'error';
      response.innerHTML = message;
      
      return;
    }

    list = document.createElement('ul');

    for (let value in message) {
      if (message.hasOwnProperty(value) && message[value]) {
        const item = document.createElement('li');
        const count = message[value];
        const formatted = parseFloat(value).toFixed(2);
        const text = `<span>${count} x $<span>${formatted}</span>`;
        item.innerHTML = text;
        
        list.appendChild(item);
        response.appendChild(list);
      }
    }
  }
}
