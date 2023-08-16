let computerSelection = "";
let playerSelection = "";

const getRandInt =  () => {
    return Math.floor(Math.random()* 3);
}

const getComputerChoice = (num) => {
    if(num<1){
        return "rock";
    }else if(num>1){
        return "paper";
    }
    return "scissors";
}

const getPlayerSelection = () => {
    let userInput = prompt("Do you choose rock, paper, or scissors?");
    return userInput.toLowerCase().trim();
}

const setPlayerSelection = (string) => {
    playerSelection = string;
}
const setComputerSelection = () => {
    computerSelection = getComputerChoice(getRandInt());
}

const winSituation = (computer, player) => {
    if((computer === "rock" && player === "paper") || 
    (computer === "paper" && player === "scissors") || 
    (computer === "scissors" && player === "rock")){
        return "You win, " + player + " beats " + computer + ".";
    }else if(player === computer){
        return "Draw, try again."
    }else{
        return "You lose, " + computer + " beats " + player + ".";
    }
}

const setResult = () =>{

    document
        .getElementById("result")
        .innerHTML = winSituation(computerSelection, playerSelection);

}

const playRound = (string) => {
    setComputerSelection();
    setPlayerSelection(string);
    setResult();
}













