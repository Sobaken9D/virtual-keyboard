import keys from '../keyboard.json' assert { type: 'json' };
export default class InitKeyboard {
  constructor() {
    this.keys = keys;
    this.language = 'en';
    this.ctrl = false;
    this.alt = false;
    this.caps = false;
    this.shift = false;
    this.firtsInit = true;

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
    this.textarea.placeholder = 'Введите текст...';
    this.textarea.classList.add('text');
    this.container.append(this.textarea);

    //  Создаем keyboard
    this.createKeyboard();
  }

  createKeyboard() {
    const keyboard = document.createElement('div');
    const key = this.checkLayout();
    keyboard.classList.add('keyboard');
    const keysArr = [];
    for (let i = 0; i < this.keys.length; i += 1) {
      const button = `<button class = "key" id = "${this.keys[i].code}"><span>${this.keys[i][key]}</span></button>`;
      keyboard.insertAdjacentHTML('beforeend', button);
      keysArr.push(button);
    }
    if (this.keyboard) {
        this.container.replaceChild(keyboard, this.keyboard);
    } else {
        this.container.append(keyboard);
    }
    this.keyboard = keyboard;
  }

  checkLayout() {
    let key = '';
    if (this.language === 'en') {
      if (this.shift) {
        key = 'shiftEN';
      } else if (this.caps) {
        key = 'capsEN';
      } else {
        key = 'charEN';
      }
    } else {
      if (this.shift) {
        key = 'shiftRU';
      } else if (this.caps){
        key = 'capsRU';
      } else {
        key = 'charRU';
      }
    }
    return key;
  }

  swapLayout() {
    console.log('------------------------------------------------');
    console.log(this.ctrl);
    console.log(this.alt);
    console.log('------------------------------------------------');
    if (this.ctrl && this.alt) {
      if (this.language === 'en') {
        this.language = 'ru';
      } else {
        this.language = 'en';
      }
      // Если нужно переключить
      return true;
    }
  }
}