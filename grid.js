const slider = document.getElementById('myRange');
const output = document.getElementById('sliderValue');
const container = document.getElementById('grid-container');

function createGrid(rows, cols) {
    container.innerHTML = ''; // Clear any existing grid
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('div');
            cell.className = 'grid-item';
            container.appendChild(cell);
        }
    }

// Create N x N grid
createGrid(20, 20);

// Display the slider value
output.innerHTML = slider.value;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    createGrid(this.value, this.value);
};