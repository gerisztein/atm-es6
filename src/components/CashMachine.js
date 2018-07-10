import Errors from './Exceptions.js';

export default class CashMachine {
  constructor (options = {}) {
    const defaultBills = [10, 20, 50, 100]

    this.availableBills = options.availableBills || defaultBills;
    this.availableBills = this.availableBills.sort((x, y) => y - x);
    this.lowestValue = Math.min(...this.availableBills);
  }

  validate (value) {
    if (!value) {
      this.handleError('EMPTY_SET');
    }

    if (value < 0) {
      this.handleError('InvalidArgumentException');
    }

    if (value % this.lowestValue) {
      this.handleError('NoteUnavailableException');
    }
  }

  calculate (value) {
    return this.availableBills
      .reduce((counter, bill) => {
        const totalBills = Math.floor(value / bill);
        counter[bill] = totalBills;
        value -= (totalBills * bill);

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

  printResponse (message = '', isError) {
    const response = document.getElementById('response');

    response.classList.remove('error');
    response.innerHTML = '';

    if (isError) {
      response.classList.add('error');
      response.innerHTML = message;
      
      return;
    }

    const list = document.createElement('ul');

    for (const value in message) {
      if (message.hasOwnProperty(value) && message[value]) {
        const item = document.createElement('li');
        const billsCount = message[value].toLocaleString();
        const formattedValue = value.toLocaleString();
        const resultText = `<span>${billsCount} x $<span>${formattedValue}</span>`;
        
        item.innerHTML = resultText;
        
        list.appendChild(item);
      }
    }
    
    response.appendChild(list);
  }
}
