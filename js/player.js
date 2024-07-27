export default class Player {
  constructor(settings) {
    this.lifes = settings.lifes || 3;
    this.score = 0;
    this.element = settings.element;
    this.boardElement = settings.boardElement;
  }

  getLifes() {
    return this.lifes;
  }

  setLifes(number) {
    this.lifes = number;
  }

  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score = score;
  }

  addScoreClass(score) {
    this.score += score;
  }

  PlayerX(direction) {
    //check player's new position
    const newPosition = this.element.offsetLeft + direction * 10;

    // get game-board's position
    const { left, right } = this.boardElement.getBoundingClientRect();

    const minLeft = this.element.offsetWidth / 2;
    const maxRight = right - left - minLeft;

    // if player is inside game-board - move
    if (newPosition >= minLeft && newPosition < maxRight) {
      this.element.style.left = `${newPosition}px`;
    }
  }

  PlayerY(direction) {
    //check player's new position
    const newPosition = this.element.offsetTop + direction * 10;

    const minTop = 0;
    const maxTop = this.boardElement.offsetHeight - this.element.offsetHeight;

    // if player is inside game-board - move
    if (newPosition >= minTop && newPosition < maxTop) {
      this.element.style.top = `${newPosition}px`;
    }
  }
}
