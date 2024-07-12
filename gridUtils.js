const gridContainer = document.getElementById('grid-container');
const gridComputedStyle = window.getComputedStyle(gridContainer);
// Get the number of grid columns
gridColumnCount = gridComputedStyle.getPropertyValue('grid-template-columns').split(' ').length;

// Get the number of grid rows
gridRowCount = gridComputedStyle.getPropertyValue('grid-template-rows').split(' ').length;

function extractNumbersFromGrid() {
    const gridContainer = document.getElementById('grid-container');
    const cells = gridContainer.querySelectorAll('.grid-item'); // The class name is 'grid-item' for cells
    const weightsArray = [];
   
    let rowIndex = 0;
    let colIndex = 0;

    cells.forEach((cell) => {
        const number = parseInt(cell.textContent, 10);
        if (!isNaN(number)) {
            if (!weightsArray[rowIndex]) {
                weightsArray[rowIndex] = [];
            }
            weightsArray[rowIndex][colIndex] = number;
            colIndex++;

            if (colIndex === gridColumnCount) {
                rowIndex++;
                colIndex = 0;
            }
        }
    });

    //console.log(weightsArray);
    return weightsArray;    
}