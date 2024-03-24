let scrollBtn = document.querySelector("#rules");

scrollBtn.addEventListener("click",()=>{
    let para = document.querySelector("p");
    para.scrollIntoView();
});



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


function playRound(){
    // let playerSelection = prompt("Rock, Paper or Scissors?").toLowerCase();
// replace this with button event handler and change outputs

    while(playerSelection !== "rock" && playerSelection !== "paper" && playerSelection !== "scissors"){
        playerSelection = prompt("Not valid please type rock, paper or scissors.").toLowerCase();
    }

    let randomNumber = () => (Math.floor(Math.random()*3)+1);
    let computerSelection = randomNumber();


    playerSelection = numberMove[playerSelection];

    if(computerSelection == playerSelection){
        alert(`Tie, Computer chose ${getKey(numberMove, computerSelection)} and you chose ${getKey(numberMove, playerSelection)}`);
    }
    else if(losingMove[playerSelection] == computerSelection){
        alert(`You Lose, Computer chose ${getKey(numberMove, computerSelection)} and you chose ${getKey(numberMove, playerSelection)}`)
    }
    else if(losingMove[playerSelection] !== computerSelection){
        alert(`You Win, Computer chose ${getKey(numberMove, computerSelection)} and you chose ${getKey(numberMove, playerSelection)}`)
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

