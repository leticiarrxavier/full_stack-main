const body = document.querySelector('body');
const game = document.querySelector('.game');

const count = document.querySelector('h1');
const reset = document.querySelector('#reset');
const ash = document.querySelector('#ash');

const charmander = document.querySelector('#charmander');
const pikachu = document.querySelector('#pikachu');
const zubat = document.querySelector('#zubat');

let findCharmander = false;
let findPikachu = false;
let findZubat = false;

const audio = document.querySelector("audio");
audio.volume = 0.1;

const musicControl = document.querySelector(".music-control");

musicControl.addEventListener('click', (event) => {
  event.stopPropagation();
  event.target.src = event.target.src.includes("on.png")
    ? "assets/icons/off.png"
    : "assets/icons/on.png";

  event.target.src.includes('on.png') ? audio.play() : audio.pause();
});

reset.addEventListener('click', () => {
  window.location.reload();
  reset.style.display = "none";
});

function clearCharactersAndFinishGame() {
  ash.style.display = 'none';
  pikachu.style.display = 'none';
  charmander.style.display = 'none';
  zubat.style.display = 'none';

  reset.style.display = 'block';
  count.textContent = "";
}

let currentCount = 60;

const interval = setInterval(() => {
  if (currentCount < 0) {
    game.style.backgroundImage = "url('../assets/game-over.jpg')";
    clearCharactersAndFinishGame();
    clearInterval(interval);
    return;
  }

  currentCount--;
  count.textContent = currentCount;
}, 1000);

function finishGame() {
  if (findCharmander && findPikachu && findZubat) {
    clearCharactersAndFinishGame();

    setTimeout(() => {
      game.style.backgroundImage = "url('../assets/winner.jpg')";
      clearInterval(interval);
      audio.pause();
    }, 400);
  }
}

function getRightPosition() {
  return parseInt(ash.style.right.split("px")) || 2;
}

function getTopPosition() {
  return parseInt(ash.style.top.split("px")) || 2;
}

// Função para fazer os pokémons seguirem o Ash
function updateFollowersPosition() {
  const ashRight = getRightPosition();
  const ashTop = getTopPosition();

  if(findCharmander) {
    // Charmander fica atrás e um pouco para cima do Ash
    charmander.style.right = `${ashRight + 70}px`;
    charmander.style.top = `${ashTop + 10}px`;
  }

  if(findPikachu) {
    // Pikachu fica atrás e um pouco para baixo
    pikachu.style.right = `${ashRight + 100}px`;
    pikachu.style.top = `${ashTop + 50}px`;
  }

  if(findZubat) {
    // Zubat fica atrás mais distante
    zubat.style.right = `${ashRight + 120}px`;
    zubat.style.top = `${ashTop + 90}px`;
  }
}

function verifyLookPokemon() {
  // Quando Ash passa nos locais, os pokémons aparecem e começam a seguir
  if (
    getTopPosition() >= 2 &&
    getTopPosition() <= 98 &&
    getRightPosition() >= 130 &&
    getRightPosition() <= 216
  ) {
    charmander.style.display = "block";
    findCharmander = true;
  }

  if (
    getTopPosition() >= 474 &&
    getTopPosition() <= 594 &&
    getRightPosition() <= 138 &&
    getRightPosition() >= 42
  ) {
    zubat.style.display = "block";
    findZubat = true;
  }

  if (
    getTopPosition() >= 266 &&
    getTopPosition() <= 394 &&
    getRightPosition() <= 650 &&
    getRightPosition() >= 546
  ) {
    pikachu.style.display = "block";
    findPikachu = true;
  }

  finishGame();
}

body.addEventListener("keydown", (event) => {
  event.stopPropagation();

  switch (event.code) {
    case "ArrowLeft":
      if (getRightPosition() < 770) {
        ash.style.right = `${getRightPosition() + 8}px`;
        ash.src = "assets/left.png";
      }
      break;

    case "ArrowRight":
      if (getRightPosition() > 2) {
        ash.style.right = `${getRightPosition() - 8}px`;
        ash.src = "assets/right.png";
      }
      break;

    case "ArrowDown":
      if (getTopPosition() < 625) {
        ash.style.top = `${getTopPosition() + 8}px`;
        ash.src = "assets/front.png";
      }
      break;

    case "ArrowUp":
      if (getTopPosition() > 2) {
        ash.style.top = `${getTopPosition() - 8}px`;
        ash.src = "assets/back.png";
      }
      break;

    default:
      break;
  }

  verifyLookPokemon();

  // Atualiza posição dos pokémons seguidores
  updateFollowersPosition();
});
