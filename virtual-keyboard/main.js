import keys from './keyboard.json' assert {type: 'json'};
class InitKeyboard {
  constructor() {
    this.language = 'en';
    this.shift = false;
    this.keys = keys;
    const body = document.querySelector('body');

    //  Создаем container
    this.container = document.createElement('div');
    this.container.classList.add('container')
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
    this.container.append(this.keyboard); 123
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

function addAnimationKey(key) {
  let currentButton = document.getElementById(`${key.code}`);
  if (currentButton.classList.contains('key-down')) {
    return;
  }else {
    currentButton.classList.add('key-down');
  }
}

function delAnimationKey(key) {
  let currentButton = document.getElementById(`${key.code}`);
  currentButton.classList.remove('key-down');
}

function ckeckFocus() {
  return document.hasFocus();
}

document.addEventListener('keydown', function (e) {
  console.log(e.code);
  console.log(page.textarea.selectionStart);

  let key = page.keys.find((el) => el.code === `${e.code}`);
  let key_lang = (page.language == "en") ? key.charEN : key.charRU;
  let key_langAndShift = (page.shift) ? key_lang.toUpperCase() : key_lang;
  let cursor = page.textarea.selectionStart;
  let value = String(page.textarea.value);
  if (key.func) {
    console.log('func');
    return;
  }
  if (ckeckFocus()) {
    e.preventDefault();
    if (value.length != cursor) {
      value = value.substring(0, cursor) + key_langAndShift + value.substring(cursor, value.length);
      page.textarea.value = value;
      page.textarea.selectionStart = (cursor + 1);
      page.textarea.selectionEnd = (cursor + 1);
      return;
    }
    page.textarea.value += `${key_langAndShift}`;
  }else {
    page.textarea.value += `${key_langAndShift}`;
  }


  addAnimationKey(e);
});

// page.textarea.addEventListener('input', function (e) {
//   console.log(123);
// })

document.addEventListener('keyup', function (e) {
  delAnimationKey(e);
});