//add event delegation later with ul
// code for index.html
let scrollBtn = document.getElementById("ruleBtn");
let rules = document.querySelector("h4");

if(scrollBtn !== null){
    scrollBtn.addEventListener("click",()=>{
        rules.scrollIntoView();
    });
}

let playBtn = document.getElementById("playBtn");

if(playBtn !== null){
    playBtn.addEventListener("click", () =>{
        window.location.href='play.html';
    });
}
// code for play.html

let numberMove = {
    rock: 1,
    paper: 2,
    scissors: 3
};

//corresponding move that each move loses to

let losingMove = {
    1: 2,
    2: 3,
    3: 1
};


let total = 0;
let win = 0;
let tie = 0;
let lose = 0;

let playerChoice = document.querySelector(".playerChoice");

let playerSelection;
let isRunning = false;
let flag = false

let resultText;

if(playerChoice !== null){
        playerChoice.addEventListener("click", (e)=>{
            let src;

            if(e.target.classList.contains("rock") && isRunning === false){
                isRunning = true;
                playerSelection = 1;
                src = getKey(numberMove, playerSelection);
                playerChoice.querySelector(`.${src} img`).src = `pictures/dark${src}.svg`;
                total++;
                playRound()
            }
            else if(e.target.classList.contains("paper") && isRunning === false){
                isRunning = true;
                playerSelection = 2;
                src = getKey(numberMove, playerSelection);
                playerChoice.querySelector(`.${src} img`).src = `pictures/dark${src}.svg`;
                total++;
                playRound()
                }
                else if(e.target.classList.contains("scissors") && isRunning === false){
                    isRunning = true;
                    playerSelection = 3;
                    src = getKey(numberMove, playerSelection);
                    playerChoice.querySelector(`.${src} img`).src = `pictures/dark${src}.svg`;
                    total++;
                    playRound()
                }

            });
    
}

let reset = document.querySelector("#reset");

if(reset !== null){
    reset.addEventListener("click", ()=>{
        if(isRunning === false){
            let playerScore = document.querySelector(".playerScore h2");
            let computerScore = document.querySelector(".computerScore h2");
            let gameResult = document.querySelector(".gameResult h4");
            let computerImg = document.querySelector("#computerImg");
            win = 0;
            lose = 0;
            playerScore.textContent = 0;
            computerScore.textContent = 0;
            gameResult.textContent = "Who Will Win?";
            computerImg.src = "pictures/unknown.svg";
        }
    });
}


function updateScore(text){
    let gameResult = document.querySelector(".gameResult h4")
    gameResult.textContent = text;

    let playerScore = document.querySelector(".playerScore h2")
    let computerScore = document.querySelector(".computerScore h2")

    playerScore.textContent = win;
    computerScore.textContent = lose;


}

//Rock Paper Scissors Game Logic

//Dictionaries allowed for less comparisons than lots of if statements when determining winner
//Correspond number for each move



function getKey(dict, value){
    for (let key in dict){
        if(value == dict[key]){
            return String(key);
        }
    }
}



function animateComputer(end){

    let computerCaption = document.querySelector("#computerCaption");


    let rock = document.createElement("img");
    rock.objectName = "Rock";
    rock.src = "pictures/rock.svg";
    rock.setAttribute("id", "computerImg");
    rock.width = "10%";
    rock.height = "10%";

    let paper = document.createElement("img");
    paper.objectName = "Paper";
    paper.src = "pictures/paper.svg";
    paper.setAttribute("id", "computerImg");
    paper.width = "10%";
    paper.height = "10%";

    let scissors = document.createElement("img");
    scissors.objectName = "Scissors";
    scissors.src = "pictures/scissors.svg";
    scissors.setAttribute("id", "computerImg");
    scissors.width = "10%";
    scissors.height = "10%";

    //another way to do this is have one img and change the source with `${}`

    let j = 0;
    let options = [rock, paper, scissors];
    
    for (let i = 0, stop = 8; i < stop; i++){
        for (choice of options){
            waitAnimate(choice, computerCaption, j);
            j+=2; //javascript pass by value so need to re-update j
            if(choice.objectName === end && i == (stop-1)){
                break;
            }
        }
    }


}

function waitAnimate(choice, computerCaption, j){

    const image = document.querySelector("#computerImg");
    choiceName = choice.objectName;
    let src = choiceName.charAt(0).toLowerCase() + choiceName.slice(1);
    setTimeout(()=>{
        computerCaption.textContent = "";
        image.src = `pictures/${src}.svg`;
        computerCaption.textContent = `${choice.objectName}`;
    }, 100+(50*j));

    j++;

}

function playRound(){

// replace this with button event handler and change outputs
        let randomNumber = () => (Math.floor(Math.random()*3)+1);
        let computerSelection = randomNumber();


        // playerSelection = numberMove[playerSelection];

        let playerText = getKey(numberMove, playerSelection);
        let computerText = getKey(numberMove, computerSelection);
        let computerTextCapitalized = computerText.charAt(0).toUpperCase() + computerText.slice(1);
        let text;
        let bool;


        if(computerSelection == playerSelection){
            animateComputer(`${computerTextCapitalized}`);
            tie++;
            text = `Tie, Computer chose ${computerText} and you chose ${playerText}`;
            bool = false;
            setTimeout(()=>{
                updateScore(text);
                playerChoice.querySelector(`.${playerText} img`).src = `pictures/${playerText}.svg`;
                isRunning = bool;
            }, 2400);
        }
        else if(losingMove[playerSelection] == computerSelection){
            animateComputer(`${computerTextCapitalized}`);
            lose++;
            text = `You Lose, Computer chose ${computerText} and you chose ${playerText}`;
            bool = false;
            setTimeout(()=>{
                updateScore(text);
                playerChoice.querySelector(`.${playerText} img`).src = `pictures/${playerText}.svg`;
                isRunning = bool;
            }, 2400);
        }
        else if(losingMove[playerSelection] !== computerSelection){
            animateComputer(`${computerTextCapitalized}`);
            win++;
            text = `You Win, Computer chose ${computerText} and you chose ${playerText}`;
            bool = false;
            setTimeout(()=>{
                updateScore(text);
                playerChoice.querySelector(`.${playerText} img`).src = `pictures/${playerText}.svg`;
                isRunning = bool;
            }, 2400);
        }

}