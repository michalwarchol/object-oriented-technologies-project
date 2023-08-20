import readline from 'readline';

class CommandLineInterface {
  private rl;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  private question = (question: string): Promise<string> => {
    return new Promise((resolve) => {
      this.rl.question(`${question} `, (response) => {
        resolve(response);
      })
    })
  }

  public input = async (question: string, callback: (output: string) => void): Promise<void> => {
    const output = await this.question(question);

    callback(output);
  }

  public output = (text: string): void => {
    console.log(text);
  }

  public error = (text: string): void => {
    console.error(text);
  }

  public close = (): void => {
    this.rl.close();
  };
}

export default new CommandLineInterface();