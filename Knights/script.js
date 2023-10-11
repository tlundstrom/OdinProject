const Node = (position, path) => {
  if (position[0] < 0 || position[0] > 7 || position[1] < 0 || position[1] > 7) {
    return null;
  }
  return { position, path };
};

const KnightTravails = ([x, y], [a, b]) => {
  let queue = [Node([x, y], [[x, y]])];
  let currentNode = queue.shift();

  while (currentNode.position[0] !== a || currentNode.position[1] !== b) {
    let moves = [
      [currentNode.position[0] + 2, currentNode.position[1] - 1],
      [currentNode.position[0] + 2, currentNode.position[1] + 1],
      [currentNode.position[0] - 2, currentNode.position[1] - 1],
      [currentNode.position[0] - 2, currentNode.position[1] + 1],
      [currentNode.position[0] + 1, currentNode.position[1] - 2],
      [currentNode.position[0] + 1, currentNode.position[1] + 2],
      [currentNode.position[0] - 1, currentNode.position[1] - 2],
      [currentNode.position[0] - 1, currentNode.position[1] + 2],
    ];
    moves.forEach((move) => {
      let node = Node(move, currentNode.path.concat([move]));
      if (node) {
        queue.push(node);
      }
    });
    currentNode = queue.shift();
  }

  alert(
    `You made it in ${currentNode.path.length - 1} moves!`
    // "\n",
    // `Here's your path:${currentNode.path.map((position) => {
    //   return position;
    // })}`
  );
};

function addGlow(element) {
  element.classList.add("glow");
}

let startPosition = [];
let endPosition = [];

function getCoordinates(e) {
  const x = e.target.getAttribute("x");
  const y = e.target.getAttribute("y");
  if (startPosition[0] || startPosition[0] === 0) {
    endPosition[0] = parseInt(x);
    endPosition[1] = parseInt(y);
    KnightTravails(startPosition, endPosition);
  } else {
    startPosition[0] = parseInt(x);
    startPosition[1] = parseInt(y);
    console.log(startPosition);
    addGlow(e.target);
  }
}
const chessboard = document.getElementById("chess");
for (var i = 0; i < 8; i++) {
  for (var j = 0; j < 8; j++) {
    var chessSquare = document.createElement("div");
    chessSquare.className = "chess-square";
    chessSquare.setAttribute("x", i);
    chessSquare.setAttribute("y", j);
    chessSquare.addEventListener("click", (e) => {
      getCoordinates(e);
    });
    chessboard.appendChild(chessSquare);
  }
}
