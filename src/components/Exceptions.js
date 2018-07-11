class EMPTY_SET extends Error {
  constructor (message) {
    super(message);
    
    this.name = '[EMPTY SET]';
  }
}

class InvalidArgumentException extends Error {
  constructor (message) {
    super(message);
    
    this.name = 'InvalidArgumentException';
  }
}

class NoteUnavailableException extends Error {
  constructor (message) {
    super(message);
    
    this.name = 'NoteUnavailableException';
  }
}


const Errors = {
  EMPTY_SET: {
    isValid: false,
    message: 'The value must be filled',
    throw: () => {
      try {
        throw new EMPTY_SET(Errors.EMPTY_SET.message);
      } catch (e) {
        throw e.stack;
      }
    }
  },
  
  InvalidArgumentException: {
    isValid: false,
    message: 'The value must be positive',
    throw: () => {
      try {
        throw new InvalidArgumentException(Errors.InvalidArgumentException.message);
      } catch (e) {
        throw e.stack;
      }
    }
  },
  
  NoteUnavailableException: {
    isValid: false,
    message: 'Withdrawal is not possible with the available bills',
    throw: () => {
      try {
        throw new NoteUnavailableException(Errors.NoteUnavailableException.message);
      } catch (e) {
        throw e.stack;
      }
    }
  }
};

export default Errors;
