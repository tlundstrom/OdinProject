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

function winSituation(computer, player){
    if((computer === "rock" && player === "paper") || 
    (computer === "paper" && player === "scissors") || 
    (computer === "scissors" && player === "rock")){
        return true;
    }
    return false
}







