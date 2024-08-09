const red = document.querySelector(".red");
const blue = document.querySelector(".blue");
const yellow = document.querySelector(".yellow");
const green = document.querySelector(".green");

const boxGame = document.querySelector("#boxgame");

const error = document.querySelector(".error");

const arr = [red, blue, green, yellow];

const start = document.querySelector(".start");

const scr = document.querySelector(".scr span");
const highestScr = document.querySelector(".highestScr span");

let colorQueryArr = [];

let score = 0;
let highestScore = 0;

// let flag;

start.addEventListener("click", async (e) => {
  e.preventDefault();
  score = 0;
  colorQueryArr = [];
  if (!error.classList.contains("hidden")) {
      error.classList.add("hidden");
  }
  start.classList.add("hidden");
  await wait(400);
  await startGame();
});

async function startGame() {



    let rndmCol = randomColor();
    console.log(rndmCol);
    colorQueryArr.push(rndmCol);
    for (const colDiv of colorQueryArr) {
        await animation1(colDiv);
    }

    let clickCounter = 0

    let hoverHandler = async(e) => {
      e.preventDefault();
      if (e.target == red || e.target == blue || e.target == green || e.target == yellow) {
        e.target.style.backgroundColor = 'rgb(218, 215, 215)';
      }
    }

    let mouseOutHandler = (e) => {
      e.preventDefault();
      if (e.target == red) {
        e.target.style.backgroundColor = 'rgb(255, 0, 0)';
      }
      else if (e.target == blue) {
        e.target.style.backgroundColor = 'rgb(0, 0, 255)';
      }
      else if (e.target == green) {
        e.target.style.backgroundColor = 'rgb(0, 128, 0)';
      }
      else if (e.target == yellow) {
        e.target.style.backgroundColor = 'rgb(255, 255, 0)';
      }
    };

    // boxGame.removeEventListener("mouseover", hoverHandler)
    // boxGame.removeEventListener('mouseout', mouseOutHandler);
    // boxGame.addEventListener("mouseover", hoverHandler)
    // boxGame.addEventListener('mouseout', mouseOutHandler);

    let clickHandler = async (e) => {
      e.preventDefault();
      if (e.target == red || e.target == blue || e.target == green || e.target == yellow) {
          // console.log("e.target.textContent", e.target.textContent)
          // console.log("colorQueryArr[clickCounter - 1].textContent", colorQueryArr[clickCounter-1]["textContent"])
          if (clickCounter < colorQueryArr.length) {
            if (e.target.textContent === colorQueryArr[clickCounter].textContent) {
                clickCounter++;
                let audio
                if (e.target.textContent === "red") {
                  audio = new Audio(`./audios/correct/${1}.mp3`);
                } else if (e.target.textContent === "green") {
                  audio = new Audio(`./audios/correct/${2}.mp3`);
                } else if (e.target.textContent === "blue") {
                  audio = new Audio(`./audios/correct/${3}.mp3`);
                } else if (e.target.textContent === "yellow") {
                  audio = new Audio(`./audios/correct/${4}.mp3`);
                }
                audio.play();
                await applyFilterWithAnimation(e.target, 'correct');
                // console.log("nice")
                // console.log("clickCounter", clickCounter)
                console.log("colorQueryArr.length", colorQueryArr.length)
                if (clickCounter == colorQueryArr.length) {
                  boxGame.removeEventListener("click", clickHandler);
                  // boxGame.removeEventListener("mouseover", hoverHandler)
                  score++
                  highestScore = Math.max(score, highestScore);
                  scr.textContent = score;
                  highestScr.textContent = highestScore;
                  await wait(1000)
                  await startGame();
                }  
            } 
            else {
                let audio = new Audio(`./audios/wrong/1.mp3`);
                audio.play();
                score = 0;
                scr.textContent = score;
                await applyFilterWithAnimation(e.target, 'wrong');
                await errorAnimation();
                colorQueryArr = [];
                start.classList.remove("hidden");

                // boxGame.removeEventListener('mouseover', hoverHandler);
                boxGame.removeEventListener("click", clickHandler);
            }
          } 

        }

    }
    boxGame.removeEventListener("click", clickHandler)
    boxGame.addEventListener("click", clickHandler)
}

function randomColor() {
  return arr[Math.floor(Math.random() * 4)];
}

function animation(x) {
  return new Promise((resolve, reject) => {
    let audio 
    if (x.textContent == "red") {
      audio = new Audio(`./audios/correct/${1}.mp3`);
    } else if (x.textContent == "green") {
      audio = new Audio(`./audios/correct/${2}.mp3`);
    } else if (x.textContent == "blue") {
      audio = new Audio(`./audios/correct/${3}.mp3`);
    } else if (x.textContent == "yellow") {
      audio = new Audio(`./audios/correct/${4}.mp3`);
    }
    audio.play()
    x.style.transition = "0.1s all ease-out";
    x.style.transform = "scale(1.1)";
    setTimeout(() => {
      resolve();
    }, 800);
  });
}

function animation2(x) {
  return new Promise((resolve, reject) => {
    x.style.transition = "0.3s all ease-in";
    x.style.transform = "scale(1)";
    setTimeout(() => {
      resolve();
    }, 300);
  });
}

async function animation1(x) {
  await animation(x);
  await animation2(x);
}


async function errorAnimation() {
  error.classList.remove("hidden");
};

async function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

async function applyFilterWithAnimation(box, filterClass) {
  box.classList.add(filterClass);
  // box.style.transform = 'scale(1.1)';

  setTimeout(() => {
      box.style.transform = 'scale(1)';
      box.classList.remove(filterClass);
  }, 400); 
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

