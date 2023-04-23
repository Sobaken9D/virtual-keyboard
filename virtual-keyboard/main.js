import keys from './keyboard.json' assert {type: 'json'};
class InitKeyboard {
  constructor() {
    this.language = 'en';
    this.keys = keys;
    const body = document.querySelector('body');

    //  Создаем container
    this.container = document.createElement('div');
    this.container.classList.add('container');
    body.append(this.container);

    //  Создаем header
    this.header = document.createElement('h1');
    this.header.classList.add('header');
    this.header.innerHTML = 'Виртуальная клавиатура';
    this.container.append(this.header);

    //  Создаем keyboard
    this.keyboard = this.createKeyboard();
    this.container.append(this.keyboard);
  }
  createKeyboard() {
    let keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    let keysArr = [];
    for (let i = 0; i < this.keys.length; i++) {
        let button = `<button class = "key">${this.keys[i].charEN}</button>`;
        keyboard.insertAdjacentHTML('beforeend', button);
        keysArr.push(button);
    }
    return keyboard;
  }
}

const page = new InitKeyboard();
console.log(page.createKeyboard());
