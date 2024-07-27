import elements from "./elements.js";
import Player from "./player.js";
import Bullets from "./bullets.js";

const {
  playerElement,
  boardElement,
  scoreElement,
  lifesElement,
  endGameElement,
  startAgainButton,
  startButtonElement,
  newGameElement,
} = elements;

//bullets' array
//const bullets = [];

//enemies' array
const enemies = [];

const player = new Player({
  element: playerElement,
  boardElement: boardElement,
});

const bulletClass = new Bullets({
  element: playerElement,
  boardElement: boardElement,
});

const handleKeyboard = (e) => {
  switch (e.code) {
    case "ArrowLeft":
      player.PlayerX(-1);
      break; // move left
    case "ArrowRight":
      player.PlayerX(+1);
      break; // move right
    case "ArrowUp":
      player.PlayerY(-1);
      break; // move up
    case "ArrowDown":
      player.PlayerY(+1);
      break; // move down
    case "Space":
      bulletClass.creatBullet(); // create bullet after using space
  }
};

// keyboard functionality
window.addEventListener("keydown", handleKeyboard);

const checkCollision = (bullet, enemy) => {
  return (
    bullet.left > enemy.left &&
    bullet.right < enemy.right &&
    bullet.top < enemy.bottom
  );
};

const addScore = (points) => {
  player.addScoreClass(points);
  scoreElement.innerHTML = player.getScore();
};

const showLife = () => {
  const html = Array(player.getLifes())
    .fill(0)
    .map((n) => '<div class="life"></div>')
    .join("");

  lifesElement.innerHTML = html;
};

const checkBulletCollision = (bullet) => {
  const position = bullet.getBoundingClientRect();

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    const enemyPosition = enemy.getBoundingClientRect();

    // are the ship and the bullet on the same position?
    if (checkCollision(position, enemyPosition)) {
      // add point
      addScore(1);

      // remove bullet
      const idx = bulletClass.getBulletsArray().indexOf(bullet);
      bulletClass.getBulletsArray().splice(idx, 1);
      bullet.remove();

      // add explosion
      makeExplosion(enemy.offsetLeft, enemy.offsetTop);

      // remove enemy
      enemies.splice(i, 1);
      enemy.remove();

      break;
    }
  }
};

const makeExplosion = (left, top) => {
  // explosion
  const explosion = document.createElement("div");
  explosion.className = "explosion";
  explosion.style.left = `${left}px`;
  explosion.style.top = `${top}px`;

  // add explosion onto game board
  boardElement.appendChild(explosion);

  // remove explosion after 2s
  setTimeout(() => {
    explosion.remove();
  }, 2000);
};

const moveBullets = () => {
  for (let i = 0; i < bulletClass.getBulletsArray().length; i++) {
    const bullet = bulletClass.getBulletsArray()[i];

    // move bullet
    bullet.style.top = `${bullet.offsetTop - 10}px`;

    if (bullet.offsetTop <= 0) {
      // remove bullet
      bulletClass.getBulletsArray().splice(i, 1);
      i--;
      bullet.remove();
    } else {
      // check if the bullet hit
      checkBulletCollision(bullet);
    }
  }
};

const createEnemy = () => {
  //create enemies random (0 = no, 1 = yes);
  const shouldCreate = Math.round(Math.random());
  if (!shouldCreate) return;

  // enemy ship
  const enemy = document.createElement("div");
  enemy.className = "enemy";
  enemy.style.top = -40 + "px";
  enemy.style.left = `${Math.floor(
    Math.random() * (boardElement.offsetWidth - 60)
  )}px`;

  // add enemy onto board
  boardElement.append(enemy);
  enemies.push(enemy);
};

const moveEnemies = () => {
  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];

    // move enemy down
    enemy.style.top = `${enemy.offsetTop + 5}px`;

    // if ship is is out of game-board
    if (enemy.offsetTop >= boardElement.offsetHeight) {
      // minus life
      player.setLifes(player.getLifes() - 1);
      showLife();

      // remove enemy from game-board
      enemies.splice(i, 1);
      enemy.remove();

      // game over
      if (player.getLifes() === 0) {
        gameOver();
      }
    }
  }
};

const startAgain = () => {
  window.location.reload();
};

//intervals
let moveEnemiesInterval;
let createEnemyInterval;

const gameOver = () => {
  endGameElement.style.display = "block";
  clearInterval(moveEnemiesInterval);
  clearInterval(createEnemyInterval);
  boardElement.style.animation = "none";
};

const startGame = () => {
  // add animation to background
  boardElement.style.animation = "moveBg 1.5s infinite linear";

  // hide box
  newGameElement.style.display = "none";

  // start intervals
  setInterval(moveBullets, 50);
  moveEnemiesInterval = setInterval(moveEnemies, 200);
  createEnemyInterval = setInterval(createEnemy, 1000);

  showLife();
};

startAgainButton.addEventListener("click", startAgain);
startButtonElement.addEventListener("click", startGame);
