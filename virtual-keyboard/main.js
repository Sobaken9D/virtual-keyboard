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

function keyPress(e) {
  animPage.addAnimationKey(e);
  if ((e.code === 'ShiftLeft' && page.shift) || (e.code === 'ShiftRight' && page.shift)) {
    return;
  }
  if ((e.code === 'ControlLeft' && page.ctrl) || (e.code === 'ControlRight' && page.ctrl)) {
    return;
  }
  if ((e.code === 'AltLeft' && page.alt) || (e.code === 'AltLeft' && page.alt)) {
    return;
  }
  console.log(e);

  const key = page.keys.find((el) => el.code === `${e.code}`);
  const key_option = page.checkLayout();
  const key_langAndShift = key[key_option];

  const cursorStart = page.textarea.selectionStart;
  const cursorEnd = page.textarea.selectionEnd;
  let value = String(page.textarea.value);

  if (key.func) {
    page.textarea.focus();
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
}

document.addEventListener('keydown', (e) => {
  keyPress(e);
});

function keyUp(e) {
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
}

document.addEventListener('keyup', (e) => {
  keyUp(e);
});


document.addEventListener('mousedown', (e) => {
  let id_btn = e.target.id || e.target.closest('.key').id;
  let obj_down = new KeyboardEvent('keydown', {code: `${id_btn}`});
  const cursorStart = page.textarea.selectionStart;
  const cursorEnd = page.textarea.selectionEnd;
  let value = String(page.textarea.value);
  if (id_btn === 'Backspace') {
    value = value.substring(0, cursorStart - 1) + value.substring(cursorEnd, value.length);
    page.textarea.value = value;
    page.textarea.selectionStart = (cursorStart - 1);
    page.textarea.selectionEnd = (cursorStart - 1);
  }
  if (id_btn === 'Delete') {
    value = value.substring(0, cursorStart) + value.substring(cursorEnd + 1, value.length);
    page.textarea.value = value;
    page.textarea.selectionStart = (cursorStart);
    page.textarea.selectionEnd = (cursorStart);
  }
  if (id_btn === 'Space') {
    value = value.substring(0, cursorStart) + ' ' + value.substring(cursorEnd + 1, value.length);
    page.textarea.value = value;
    page.textarea.selectionStart = (cursorStart + 1);
    page.textarea.selectionEnd = (cursorStart + 1);
  }
  if (id_btn === 'Enter') {
    value = value.substring(0, cursorStart) + '\n' + value.substring(cursorEnd + 1, value.length);
    page.textarea.value = value;
  }
  keyPress(obj_down);
  page.textarea.focus();
});

document.addEventListener('mouseup', (e) => {
  page.textarea.focus();
  let id_btn = e.target.id || e.target.closest('.key').id;
  let obj_up = new KeyboardEvent('keyup', {code: `${id_btn}`});
  keyUp(obj_up);
});

document.addEventListener('mouseout', (e) => {
  let id_btn = e.target.id || e.target.closest('.key').id;
  let obj_up = new KeyboardEvent('keyup', {code: `${id_btn}`});
  keyUp(obj_up);
});
