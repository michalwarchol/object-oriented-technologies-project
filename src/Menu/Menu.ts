import EventManager from "../EventManager/EventManager";
import commandLine from "../CommandLineInterface/CommandLineInterface";

import messages from './Menu.messages';

export default class Menu {
  private eventManager: EventManager;

  constructor() {
    this.eventManager = new EventManager('events', 'events.json');
    this.eventManager.init();
  }

  public run = async () => {
    commandLine.output(`1. ${messages.showCloseEvents}`);
    commandLine.output(`2. ${messages.createEvent}`);
    commandLine.output(`3. ${messages.manageEvents}`);

    commandLine.output(`9. ${messages.exit}`);

    await commandLine.input(messages.choose, (response) => {
      switch (response) {
        case '1': {
          this.eventManager.showCloseEvents().then(() => {
            this.run();
          });
          break;
        }

        case '2': {
          this.eventManager.createEvent().then(() => {
            this.run();
          });
          break;
        }

        case '9': {
          commandLine.close();
          break;
        }

        default: {
          console.clear();
          commandLine.output('Option not recognized... Try again');
          this.run();
        }
      }
    })
  }
};
