import EventEmitter from 'events';

import {
  handleNewMember
} from './eventHandlers';

let hasCalledInitBot = false;

class Bot extends EventEmitter {
  constructor (options) {
    super();

    if (hasCalledInitBot) {
      this.emit(
        'error',
        new Error('Unable to initialise Bot more than once')
      );
    }

    this.options = options;

    this.handleNewMember();
  }

  handleNewMember() {
    handleNewMember(this);
  }
}

export default Bot;
