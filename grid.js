const column_slider = document.getElementById('ColumnRangeSlider');
const row_slider = document.getElementById('RowRangeSlider');
const column_count = document.getElementById('ColumnRange');
const row_count = document.getElementById('RowRange');
const container = document.getElementById('grid-container');
const colorMap = [
    "#EEF4FA", // 1-10
    "#DBE6F4", // 11-20
    "#C9D9EC", // 21-30
    "#ADCCE1", // 31-40
    "#9CC2DC", // 41-50
    "#6BA1CC", // 51-60
    "#5089BE", // 61-70
    "#396FB1", // 71-80
    "#2F62A7", // 81-90
    "#1F478D"  // 91-100
];

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
