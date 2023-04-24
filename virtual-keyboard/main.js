import InitKeyboard from './modules/initKeyboard.js';
import AnimationKeyboard from './modules/animationKeyboard.js';

class FuncButtonts {
  findButton(key, page) {
    if (key.code === 'Backspace') {
      this.backspaceKey(page);
    } else if (key.code === 'Tab') {
      this.tabKey(page, key);
    } else if (key.code === 'CapsLock') {
      this.capsKey(page);
    }
  }

  backspaceKey(page) {
    page.textarea.focus();
  }

  tabKey(page, key) {
    key.preventDefault();
    const cursorStart = page.textarea.selectionStart;
    const cursorEnd = page.textarea.selectionEnd;
    const value = String(page.textarea.value);
    page.textarea.value = value.substring(0, cursorStart) + '    ' + value.substring(cursorEnd, value.length);
    page.textarea.selectionStart = (cursorStart + 4);
    page.textarea.selectionEnd = (cursorStart + 4);
  }

  capsKey(page) {
    page.caps = page.caps ? false : true;
    page.createKeyboard();
  }
}

const page = new InitKeyboard();
const animPage = new AnimationKeyboard();
const functButtons = new FuncButtonts();

// Проверка фокуса textarea
function ckeckFocus() {
  return document.hasFocus();
}

document.addEventListener('keydown', (e) => {
  console.log(e.code);
  animPage.addAnimationKey(e);
  const key = page.keys.find((el) => el.code === `${e.code}`);
  const key_lang = (page.language === 'en') ? key.charEN : key.charRU;
  const key_langAndShift = (page.caps) ? key_lang.toUpperCase() : key_lang;
  const cursorStart = page.textarea.selectionStart;
  const cursorEnd = page.textarea.selectionEnd;
  let value = String(page.textarea.value);
  if (key.func) {
    console.log('func');
    functButtons.findButton(e, page);
    return;
  }
  //  Если ввод внутри строки(курсор перемещен мышкой)
  if (ckeckFocus()) {
    e.preventDefault();
    if (value.length !== cursorStart) {
      value = value.substring(0, cursorStart) + key_langAndShift + value.substring(cursorEnd, value.length);
      page.textarea.value = value;
      page.textarea.selectionStart = (cursorStart + 1);
      page.textarea.selectionEnd = (cursorStart + 1);
      return;
    }
    page.textarea.value += `${key_langAndShift}`;
  } else {
    page.textarea.value += `${key_langAndShift}`;
  }
});

document.addEventListener('keyup', (e) => {
  animPage.delAnimationKey(e);
});

document.addEventListener('click', (e) => {
  console.log(`start: ${page.textarea.selectionStart}`);
  console.log(`end: ${page.textarea.selectionEnd}`);
});
