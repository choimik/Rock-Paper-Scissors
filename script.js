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

let total = 0;
let win = 0;
let tie = 0;
let lose = 0;

let playerChoice = document.querySelector(".playerChoice");

let playerSelection;
let isRunning = false;

if(playerChoice !== null){
    playerChoice.addEventListener("click", (e)=>{
        if(isRunning){
            return;
        }
        isRunning = true;
        if(e.target.classList.contains("rock")){
            playerChoice.querySelector(".rock img").src = "pictures/darkrock.svg";
            playerSelection = 1;
            total++;
            playRound();
            playerChoice.querySelector(".rock img").src = "pictures/rock.svg", 0;
            
        }
        else if(e.target.classList.contains("paper")){
            playerChoice.querySelector(".paper img").src = "pictures/darkpaper.svg";
            playerSelection = 2;
            total++;
            playRound();
            playerChoice.querySelector(".paper img").src = "pictures/paper.svg", 0;
        }
        else if(e.target.classList.contains("scissors")){
            playerChoice.querySelector(".scissors img").src = "pictures/darkscissors.svg";
            playerSelection = 3;
            total++;
            playRound();
            playerChoice.querySelector(".scissors img").src = "pictures/scissors.svg", 0;
        }
        isRunning = false;
    });
}


//Rock Paper Scissors Game Logic

//Dictionaries allowed for less comparisons than lots of if statements when determining winner
//Correspond number for each move
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

    if(computerSelection == playerSelection){
        alert(`Tie, Computer chose ${computerText} and you chose ${playerText}`);
        animateComputer(`${computerTextCapitalized}`);
        return 0;
    }
    else if(losingMove[playerSelection] == computerSelection){
        alert(`You Lose, Computer chose ${computerText} and you chose ${playerText}`);
        animateComputer(`${computerTextCapitalized}`);
        return -1;
    }
    else if(losingMove[playerSelection] !== computerSelection){
        alert(`You Win, Computer chose ${computerText} and you chose ${playerText}`);
        animateComputer(`${computerTextCapitalized}`);
        return 1;
    }
    else{
        alert("Error");
    }
}

function playGame(){
    for (let i = 0; i < 5; i++){
        playRound();
    }
}

