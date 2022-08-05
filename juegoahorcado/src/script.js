const palabras = [`rebañasandias`, `morlaco`, `energumeno`, `lamecharcos`,`meapilas`,`pelazarzas`,`pillavispas`,`robaperas`,`tiralevitas`,`zarrapastroso`,`zangano`,`tontucio`];
let hiddenWord = [];
let wordToGuess = [];
let historyLettersUser = [];
let numIntentos = 10;
const nodeLetter = document.querySelector(`#letra`);
let historyNode = document.querySelector(`#historial`);

document.querySelector(`#startGame`).addEventListener(`click`, startGame);

function startGame() {
  const randomWord = palabras[Math.floor(Math.random() * palabras.length)];
  wordToGuess = randomWord.split(``); //split es para separar letra a letra
  console.log(wordToGuess);//muestra la palabra en la consola separada
  //document.querySelector(`#aqui`).innerHTML = randomWord;//ayudapara saber cual es la palabra
  for (let i = 0; i < wordToGuess.length; i++) {
    hiddenWord.push(`_`);//por cada letra mete un guion y lo separa con comas
  }
  drawBoard()
}

function drawBoard() {//pone el tablero y join hace q haya un hueco entre cada guion
  document.querySelector(`#resultado`).innerHTML = hiddenWord.join(` `);
  document.querySelector(`#intentos`).innerHTML = numIntentos;
  historyNode.textContent = historyLettersUser.join(` `);
  removeClassHidden();
  buttonOut();
}

function removeClassHidden() {//cambia la clase invisible a visible, o sea, q se ve ^^
  let removeHidden = document.querySelectorAll(`.invisible`);
  for (const item of removeHidden) {
    item.classList.remove(`invisible`);
  }
}

function buttonOut() {//"esconde" el boton de empezar a jugar 
  let buttonStartGame = document.querySelector(`#startGame`);
  buttonStartGame.classList.remove(`claseVisible`);
  buttonStartGame.classList.add(`invisible`);
}


document.querySelector(`#boton`).addEventListener(`click`, checkUserLetter);



function checkUserLetter() {// Sustitucion por letra acertada o resta el numero de intentos
  // Guardo la letra del input que ha escrito el usuario en una variable
  let letterUser = nodeLetter.value;
  // Vaciamos el input para que el usuario vuelva a escribir
  nodeLetter.value = '';
  // Le devolvemos el foco al input para que pueda introducir otra letra despues del intro
  nodeLetter.focus();
  // Recorremos las letras, para ver si alguna coincide.The object whose enumerable own property [key, value] pairs are to be returned.
  for (const [position, letterToGuess] of wordToGuess.entries()) {
    // Comprobamos si la letra del usuario es igual a la letra a adivinar
    if (letterUser == letterToGuess) {
      // Sustituimos el guion por la letra acertada
      hiddenWord[position] = letterToGuess;
    }
  }

  // esta la letra? .includes es para saber si esta en wordToGuess y si no es asi le restamos 1 intento
  if (!wordToGuess.includes(letterUser)) {
    // Restamos un intento
    numIntentos--;
    // Guardamos en el historial la letra pulsada por el usuario
    historyLettersUser.push(letterUser);
  }
  // Comprobamos si hay que terminar el juego
  endGame();
  // Mostramos los cambios
  drawBoard();
}

function endGame() {
  // ¿no quedan guiones? ha ganado. includes mira si incluye ese elemento, en este caso el guion
  if (!hiddenWord.includes(`_`)) {
    alert(`Felicidades has ganado, te sobraron ${numIntentos} intentos, gracias por jugar!`);
    //carga de nuevo la URL actual, como lo hace el boton de Refresh de los navegadores.
    location.reload(true);
  }
  //¿Tiene 0 intentos? Ha perdido 
  if (numIntentos == 0) {
    //sin join se veria con comas ya q la palabra esta separada por comas ^^
    alert(`Has Perdido, la palabra era ` + wordToGuess.join(''));
    location.reload(true);
  }
}