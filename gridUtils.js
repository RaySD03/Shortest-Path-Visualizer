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

function dijkstra(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const start = [0, 0];
    const end = [rows - 1, cols - 1];

    const isValid = (i, j) => i >= 0 && i < rows && j >= 0 && j < cols;

    const distances = new Array(rows).fill().map(() => new Array(cols).fill(Number.MAX_SAFE_INTEGER));
    distances[start[0]][start[1]] = 0;

    const visited = new Array(rows).fill().map(() => new Array(cols).fill(false));

    const queue = [start];

    // Initialize an array to store the path
    const path = [];

    while (queue.length > 0) {
        const [row, col] = queue.shift();

        if (visited[row][col]) continue;
        visited[row][col] = true;

        const neighbors = [
            [row - 1, col],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1]
        ];

        for (const [nRow, nCol] of neighbors) {
            if (isValid(nRow, nCol)) {
                const newDist = distances[row][col] + grid[nRow][nCol];
                if (newDist < distances[nRow][nCol]) {
                    distances[nRow][nCol] = newDist;
                    queue.push([nRow, nCol]);
                }
            }
        }
    }

    // Backtrack from the end node to the start node
    let currentNode = end;
    while (currentNode[0] !== start[0] || currentNode[1] !== start[1]) {
        path.push(currentNode);
        const [row, col] = currentNode;
        const neighbors = [
            [row - 1, col],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1]
        ];
        for (const [nRow, nCol] of neighbors) {
            if (isValid(nRow, nCol) && distances[nRow][nCol] + grid[row][col] === distances[row][col]) {
                currentNode = [nRow, nCol];
                break;
            }
        }
    }
    path.push(start);

    // Print the coordinates(columns and rows) in the shortest path
    console.log("Shortest path:");
    for (const [row, col] of path.reverse()) {
        console.log(`Node (${row}, ${col})`);
    }

    shortestPathLength = distances[end[0]][end[1]] || -1;
    console.log("Shortest path length:", shortestPathLength);
    return shortestPathLength;
}
