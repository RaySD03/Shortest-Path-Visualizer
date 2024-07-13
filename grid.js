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

// Function to calculate brightness of a color
function calculateLuminance(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16) / 255;
    const g = parseInt(hexColor.slice(3, 5), 16) / 255;
    const b = parseInt(hexColor.slice(5, 7), 16) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function createGrid(rows, cols) {
    const container = document.getElementById('grid-container');
    container.innerHTML = ''; // Clear any existing grid
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= cols; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-item';
            cell.textContent = getRandomNumber().toString();
            cell.style.textAlign = 'center'; // Center number horizontally
            cell.style.display = 'grid';
            cell.style.alignItems = 'center'; // Center number vertically

            // Set data attributes for row and column
            cell.setAttribute('data-row', row);
            cell.setAttribute('data-col', col);

            if ((row == 1 && col == 1) || (row == rows && col == cols)) {
                cell.textContent = '0'; // Display "0" in the first and last cell
            } else {
                cell.textContent = getRandomNumber().toString();
                const colorIndex = Math.floor((parseInt(cell.textContent, 10) - 1) / 10);
                const backgroundColor = colorMap[colorIndex];
                cell.style.backgroundColor = backgroundColor;

                // Calculate luminance (brightness) of the background color
                const luminance = calculateLuminance(backgroundColor);

                // Set font color based on luminance
                cell.style.color = luminance > 0.5 ? '#000' : '#fff'; // Dark background: white font, Light background: black font
            }

            container.appendChild(cell);
        }
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * 99) + 1;
}

// Create N x N grid
createGrid(20, 20);

// Update the current slider value (each time you drag the slider handle)
column_slider.oninput = function() {
    column_count.innerHTML = this.value;
    createGrid(row_count.innerHTML, column_count.innerHTML);
};

// Update the current slider value (each time you drag the slider handle)
row_slider.oninput = function() {
    row_count.innerHTML = this.value;
    createGrid(row_count.innerHTML, column_count.innerHTML);
};
