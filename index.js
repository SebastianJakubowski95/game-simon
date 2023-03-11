var colors = ["red", "blue", "green", "yellow"];
var computerArray = [];
var userArray = [];
var level = 1;
var gameOverFlag = false;
var bestLevel = 1;

////////////////////////////////-USER CLICK BUTTON-////////////////////////////////////////
$('.btn').on('click', function (event) {
  if (computerArray.length > 0) {
    userArray.push(event.target.id);
    $(event.target).addClass('pressed');
    setTimeout(function () {
      $(event.target).removeClass('pressed');
    }, 300);
    for (let i = 0; i < userArray.length; i++) {
      if (userArray[i] !== computerArray[i]) {
        makeSound('wrong');
        bgColor('red');
        setTimeout(() => {
        }, 300);
        gameOver('show');
      }
    }
    if (gameOverFlag === false) {
      makeSound(event.target.id);
    }
    if ((userArray.length === computerArray.length) && (gameOverFlag === false)) {
      bgColor('green');
      level++;
      setLevel(level);
      setTimeout(function () {
        userArray = [];
        pushNewBox();
      }, 1500);
    }
  }
}
);
////////////////////////////////////////////////////////////////////////

function pushNewBox() {
  //pushes new box into computerArray N show it
  var randomNum = Math.floor(Math.random() * 4);
  computerArray.push(colors[randomNum]);
  var lastCube = $('#' + computerArray[computerArray.length - 1]);
  makeSound(computerArray[computerArray.length - 1]);
  lastCube.addClass('pressed');
  setTimeout(() => {
    lastCube.removeClass('pressed');
  }, 300);
}


function makeSound(color) {
  switch (color) {
    case 'blue':
      var blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;
    case 'green':
      var green = new Audio('sounds/green.mp3');
      green.play();
      break;
    case 'red':
      var red = new Audio('sounds/red.mp3');
      red.play();
      break;
    case 'yellow':
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;
    case 'wrong':
      var wrong = new Audio('sounds/wrong.mp3');
      wrong.play();
      break;
    default:
      console.log('sound error');
      break;
  }
}

function setLevel(lvl) {
  $('h1').text("Level " + lvl);
}

$('.start-btn').on('click', (event) => {
  gameOver('hide');
  computerArray = [];
  userArray = [];
  level = 1;
  setLevel(level);
  $('.start-btn').addClass('not-active');
  setTimeout(() => {
    $('.start-btn').removeClass('not-active');
    pushNewBox();
  }, 750);
})

$('.start-btn-again').on('click', (event) => {
  gameOver('hide');
  computerArray = [];
  userArray = [];
  level = 1;
  setLevel(level);
  $('.start-btn').addClass('not-active');
  setTimeout(() => {
    $('.start-btn').removeClass('not-active');
    pushNewBox();
  }, 750);
})

function setBestLevel() {
  if (level > bestLevel) {
    $('h2').text('Your Best Score: ' + level);
  }
}

function bgColor(state) {
  if (state === 'green') {
    $('body').addClass('correct-answer');
    setTimeout(() => {
      $('body').removeClass('correct-answer');
    }, 300);
  } else if (state === 'red') {
    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 300);
  }

}

function gameOver(state) {
  //show/hide Game Over overlay
  if (state === 'show') {
    setBestLevel();
    $('.overlay').css('display', 'block');
    $('.start-btn-again').css('display', 'block');
    gameOverFlag = true;
  } else if (state === 'hide') {
    $('.overlay').css('display', 'none');
    $('.start-btn-again').css('display', 'none');
    gameOverFlag = false;
  }
}

