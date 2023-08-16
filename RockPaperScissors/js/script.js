let computerSelection = getComputerChoice(getRandInt());
let playerSelection = "rock"

function getRandInt(){
    return Math.floor(Math.random()* 3);
}

function getComputerChoice(num) {
    if(num<1){
        return "rock";
    }else if(num>1){
        return "paper";
    }
    return "scissors";
}

function winSituation(computerSelection, playerSelection){
    if((computerSelection === "rock" && playerSelection === "paper") || 
    (computerSelection === "paper" && playerSelection === "scissors") || 
    (computerSelection === "scissors" && playerSelection === "rock")){
        return true;
    }
}






