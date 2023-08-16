const getRandInt =  () => {
    return Math.floor(Math.random()* 3);
}

const getComputerChoice = (num) => {
    switch(num){
        case 0:
            return "rock";
            break;
        case 1:
            return "paper";
            break;
        case 2:
            return "scissors";
            break;
    }
}

const winSituation = (computer, player) => {
    if(player === computer){
        return "Draw, try again."
    }else if(
        (computer === "rock" && player === "paper") || 
        (computer === "paper" && player === "scissors") || 
        (computer === "scissors" && player === "rock")){
            return "You win, " + player + " beats " + computer + ".";
    }
    return "You lose, " + computer + " beats " + player + ".";

}

const setResult = (computerSelection, playerSelection) =>{
    document
        .getElementById("result")
        .innerHTML = winSituation(computerSelection, playerSelection);
}

const playRound = (str) => {
    console.log(str);
    setResult(getComputerChoice(getRandInt()), str);
}

