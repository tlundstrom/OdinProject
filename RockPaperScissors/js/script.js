let computerSelection = getComputerChoice(getRandInt());
let playerSelection = ""

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
        return "You win, " + player + " beats " + computer + ".";
    }else if(player === computer){
        return "Draw, try again."
    }
    return "You lose, " + computer + " beats " + player + ".";
}

function getPlayerSelection(){
    let userInput = prompt("Do you choose rock, paper, or scissors?");
    userInput = userInput.toLowerCase().trim();
    console.log(userInput)
    return invalidEntry(userInput)? getPlayerSelection() : userInput;
}

function setPlayerSelection(userInput){
    playerSelection = userInput;
}












