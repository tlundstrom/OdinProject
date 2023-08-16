let size = 16;

const gridWindow = document.getElementById('window');

console.log(gridWindow);

const createGrid = (size) => {
    for(let i=0; i<size*size; i++){
        console.log('test')
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gridWindow.appendChild(cell);
    }
}

window.onload = () => {
    createGrid(16);
}