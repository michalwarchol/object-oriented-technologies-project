import EventManager from "../EventManager/EventManager";
import commandLine from "../CommandLineInterface/CommandLineInterface";

export default class Menu {
  private eventManager: EventManager;

  constructor() {
    this.eventManager = new EventManager('events.json');
    this.eventManager.init();
  }

  public run = async () => {
    commandLine.output('1. Show upcoming events');
    commandLine.output('2. Create a new event');
    commandLine.output('3. Edit event');
    commandLine.output('4. Delete event');

    commandLine.output('9. Exit');

    const response = await commandLine.input('Please choose an option:');

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

      case '3': {
        this.eventManager.editEvent().then(() => {
          this.run();
        });
        break;
      }

      case '4': {
        this.eventManager.deleteEvent().then(() => {
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
  }
};
