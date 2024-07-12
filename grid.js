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
        if (i === 0 || i === rows * cols - 1) {
            cell.textContent = '0'; // Display "0" in the first and last cell (Source and Destination)
            cell.style.textAlign = 'center'; // Center numbers horizontally
        } else {
            const randomNumber = Math.floor(Math.random() * 99) + 1;
            cell.textContent = randomNumber.toString();
            cell.style.color = '#222'; // Set font color
            cell.style.textAlign = 'center'; // Center number horizontally
            cell.style.display = 'grid';
            cell.style.alignItems = 'center'; // Center number vertically
            
            const colorIndex = Math.floor((randomNumber - 1) / 10); // Map to color index
            cell.style.backgroundColor = colorMap[colorIndex];
        }
        container.appendChild(cell);
    }
}

createGrid(20, 20);

// Update the current slider value for the column count (each time the slider is changed)
column_slider.oninput = function() {
    column_count.innerHTML = this.value;
    // Create grid - keep same value for row count, use updated value for column count
    createGrid(row_count.innerHTML, column_count.innerHTML);
};

// Update the current slider value for the row count (each time the slider is changed)
row_slider.oninput = function() {
    row_count.innerHTML = this.value;
    // Create grid - keep same value for column count, use updated value for row count
    createGrid(row_count.innerHTML, column_count.innerHTML);
};
