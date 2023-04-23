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

    // Создадим textarea
    this.textarea = document.createElement('textarea');
    this.textarea.placeholder = "Введите текст..."
    this.textarea.classList.add('text');
    this.container.append(this.textarea);

    //  Создаем keyboard
    this.keyboard = this.createKeyboard();
    this.container.append(this.keyboard);
  }
  createKeyboard() {
    let keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    let keysArr = [];
    for (let i = 0; i < this.keys.length; i++) {
        let button = `<button class = "key" id = "${this.keys[i].code}"><span>${this.keys[i].charEN}</span></button>`;
        keyboard.insertAdjacentHTML('beforeend', button);
        keysArr.push(button);
    }
    return keyboard;
  }
}

const page = new InitKeyboard();
console.log(page.createKeyboard());
