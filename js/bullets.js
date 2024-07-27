export default class Bullets {
  constructor(settings) {
    this.bulletsArray = [];
    this.element = settings.element;
    this.boardElement = settings.boardElement;
  }

  creatBullet() {
    // bullet
    const bullet = document.createElement("div");
    bullet.className = "bullet";
    bullet.style.left = `${this.element.offsetLeft}px`;
    bullet.style.top = `${this.element.offsetTop}px`;

    // add onto board
    this.boardElement.appendChild(bullet);
    this.bulletsArray.push(bullet);
    console.log(this.bulletsArray);
  }

  getBulletsArray() {
    return this.bulletsArray;
  }

  setBulletsArray() {
    this.bulletsArray.push(data);
  }
}
