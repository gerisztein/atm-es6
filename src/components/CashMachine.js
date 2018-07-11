import Errors from './Exceptions.js';

export default class CashMachine {
  constructor (options = {}) {
    const defaultBills = [10, 20, 50, 100];

    this.availableBills = options.availableBills || defaultBills;
    this.availableBills = this.availableBills.sort((x, y) => y - x);
    this.lowestValue = Math.min(...this.availableBills);
  }

  calculate (value) {
    return this.availableBills
      .reduce((counter, bill) => {
        const totalBills = Math.floor(value / bill);
        counter[bill] = totalBills;
        value -= (totalBills * bill);

        return counter;
      }, {});
  }

  handleError (error) {
    return Errors[error];
  }
  
  printResponse (response = {}, isError) {
    const container = document.getElementById('response');

    container.classList.remove('error');
    container.innerHTML = '';

    if (response.isValid === false) {
      container.classList.add('error');
      container.innerHTML = response.message;

      response.throw();
    }

    const list = document.createElement('ul');

    for (const value in response) {
      if (response.hasOwnProperty(value) && response[value]) {
        const item = document.createElement('li');
        const billsCount = response[value].toLocaleString();
        const formattedValue = value.toLocaleString();
        const resultText = `<span>${billsCount} x $<span>${formattedValue}</span>`;
        
        item.innerHTML = resultText;
        
        list.appendChild(item);
      }
    }
    
    container.appendChild(list);
  }

  validate (value) {
    if (!value) {
      return this.handleError('EMPTY_SET');
    }

    if (value < 0) {
      return this.handleError('InvalidArgumentException');
    }

    if (value % this.lowestValue) {
      return this.handleError('NoteUnavailableException');
    }

    return {
      isValid: true,
      message: value
    };
  }

  withdraw (value) {
    const validate = this.validate(value);
    const isValid = validate.isValid;
    const response = isValid
      ? this.calculate(validate.message)
      : validate;

    this.printResponse(response);
  }
}
