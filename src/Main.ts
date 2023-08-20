import Menu from './Menu/Menu';

export default class Main {
  static async run () {
    // application starts here

    const menu = new Menu();
    await menu.run();
  }
}
