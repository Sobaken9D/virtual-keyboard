import InitKeyboard from './modules/initKeyboard.js';
import AnimationKeyboard from './modules/animationKeyboard.js';
import FuncButtonts from './modules/funcButtons.js';

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
  const key_option = page.checkLayout();
  const key_langAndShift = key[key_option];

  const cursorStart = page.textarea.selectionStart;
  const cursorEnd = page.textarea.selectionEnd;
  let value = String(page.textarea.value);

  if (key.func) {
    console.log('func');
    functButtons.findButton(e, page);
    animPage.addAnimationKey(e);
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
  page.textarea.focus();
});

document.addEventListener('keyup', (e) => {
  animPage.delAnimationKey(e);
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    page.shift = false;
    page.createKeyboard();
  }
  if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
    page.ctrl = false;
  }
  if (e.code === 'AltLeft' || e.code === 'AltRight') {
    page.alt = false;
  }
});


document.addEventListener('click', (e) => {
  console.log(`start: ${page.textarea.selectionStart}`);
  console.log(`end: ${page.textarea.selectionEnd}`);
});
