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

const setPlayerSelection = () => {
    playerSelection = getPlayerSelection();
    console.log(playerSelection);
}
const setComputerSelection = () => {
    computerSelection = getComputerChoice(getRandInt());
    console.log(computerSelection);
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

const playRound = () => {
    setComputerSelection();
    setPlayerSelection();
    alert(winSituation(computerSelection, playerSelection));
}

const game = () => {
    for(let i=0;i<4;i++){
        playRound();
    }
}

game();










