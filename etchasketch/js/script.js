let size = 200;

let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup= () => mouseDown = false;



const gridWindow = document.getElementById('window');

const createGrid = (size) => {
    for(let i=0; i<size*size; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('mouseover', draw);
        cell.addEventListener('mousedown', draw);
        gridWindow.appendChild(cell);
    }
}

const draw = (e) => {
    if(e.type === 'mouseover' && !mouseDown) return;
    e.target.style.background = "black";
}



window.onload = () => {
    createGrid(size);
}