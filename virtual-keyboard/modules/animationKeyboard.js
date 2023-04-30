export default class AnimationKeyboard {
  //  Создаем анимацию при нажатии
  addAnimationKey(key) {
    const currentButton = document.getElementById(`${key.code}`);
    if (currentButton.classList.contains('key-down')) {
      return;
    } else {
      currentButton.classList.add('key-down');
    }
  }

  //  Удаляем анимацию при отжатии
  delAnimationKey(key) {
    const currentButton = document.getElementById(`${key.code}`);
    currentButton.classList.remove('key-down');
  }
}
