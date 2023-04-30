export default class FuncButtonts {
  findButton(key, page) {
    if (key.code === 'Backspace') {
      this.backspaceKey(page);
    } else if (key.code === 'Tab') {
      this.tabKey(page, key);
    } else if (key.code === 'CapsLock') {
      this.capsKey(page);
    } else if (key.code === 'Enter') {
      this.enterKey(page);
    } else if (key.code === 'ShiftLeft' || key.code === 'ShiftRight') {
      this.shiftKey(page);
    } else if (key.code === 'ControlLeft' || key.code === 'ControlRight') {
      this.controlKey(page, key);
    } else if (key.code === 'AltLeft' || key.code === 'AltRight') {
      this.altKey(page, key);
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
    page.textarea.focus();
  }

  capsKey(page) {
    page.caps = page.caps ? false : true;
    page.createKeyboard();
  }

  enterKey(page) {
    page.textarea.focus();
  }

  shiftKey(page) {
    page.shift = true;
    page.createKeyboard();
  }

  controlKey(page, key) {
    key.preventDefault();
    page.ctrl = true;
    if (page.swapLayout()) {
      page.createKeyboard();
    }
  }

  altKey(page, key) {
    key.preventDefault();
    page.alt = true;
    if (page.swapLayout()) {
      page.createKeyboard();
    }
  }
}