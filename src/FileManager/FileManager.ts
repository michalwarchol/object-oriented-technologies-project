import fs from 'fs';

export default class FileManager {
  protected dir: string;

  constructor(dir: string) {
    this.dir = dir;
  }

  protected mkdir = async (path: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!fs.existsSync(path)) {
        fs.mkdir(path, { recursive: true }, (err) => {
          if (err) {
            resolve(false);
          }
  
          resolve(true);
        })
      }
  
      resolve(true);
    });
  }

  protected rmdir = async (path: string): Promise<boolean> => new Promise((resolve) => {
    if (!fs.existsSync(path)) {
      fs.rmdir(path, (err) => {
        if (err) {
          resolve(false);
        }
  
        resolve(true);
      })
    }

    resolve(true);
});

  protected readFile = async <T = object>(path: string): Promise<T | null> => {
    if (!fs.existsSync(path)) {
      fs.writeFile(path, JSON.stringify([]), () => {
        return new Promise((resolve) => resolve(null));
      })
    }

    return new Promise((resolve) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          resolve(null);
        }

        resolve(JSON.parse(data.toString('utf-8')));
      })
    })
  }

  protected writeFile = async <T = object>(filename: string, value: T): Promise<boolean> => {
    return new Promise((resolve) => {
      const content = JSON.stringify(value);
      fs.writeFile(filename, content, (err) => {
        if (err) {
          resolve(false);
        }

        resolve(true);
      })
    })
  }
}
