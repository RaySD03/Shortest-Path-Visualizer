const gridContainer = document.getElementById('grid-container');
const gridComputedStyle = window.getComputedStyle(gridContainer);
// Get the number of grid columns
gridColumnCount = gridComputedStyle.getPropertyValue('grid-template-columns').split(' ').length;

// Get the number of grid rows
gridRowCount = gridComputedStyle.getPropertyValue('grid-template-rows').split(' ').length;

function extractNumbersFromGrid() {
    const gridContainer = document.getElementById('grid-container');
    const cells = gridContainer.querySelectorAll('.grid-item'); // The class name is 'grid-item'
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

function isEqual(a, b) {
    return a[0] === b[0] && a[1] === b[1];
}

function run() {
    console.clear();
    gridColumnCount = gridComputedStyle.getPropertyValue('grid-template-columns').split(' ').length;
    gridRowCount = gridComputedStyle.getPropertyValue('grid-template-rows').split(' ').length;
    const weights = extractNumbersFromGrid();
    dijkstra(weights);
}

function dijkstra(distances) {
    const n = distances.length; // Number of rows
    const m = distances[0].length; // Number of columns
    const costs = Array(n * m).fill(Infinity);
    const parents = Array(n * m).fill(null);
    const processed = [];
    const startNode = 0; // Index of the start cell (first row, first column)

    costs[startNode] = 0;

    while (true) {
        let minCost = Infinity;
        let node = null;

        // Find the unprocessed cell with the lowest cost
        for (let i = 0; i < n * m; i++) {
            if (!processed.includes(i) && costs[i] < minCost) {
                minCost = costs[i];
                node = i;
            }
        }

        if (node === null) break; // All cells processed

        const row = Math.floor(node / m);
        const col = node % m;

        // Explore neighboring cells
        const neighbors = [
            [row - 1, col], // Up
            [row + 1, col], // Down
            [row, col - 1], // Left
            [row, col + 1]  // Right
        ];

        for (const [r, c] of neighbors) {
            if (r >= 0 && r < n && c >= 0 && c < m) {
                const neighborNode = r * m + c;
                const newCost = costs[node] + distances[r][c];
                if (newCost < costs[neighborNode]) {
                    costs[neighborNode] = newCost;
                    parents[neighborNode] = node;
                }
            }
        }

        processed.push(node);
    }

    // Reconstruct the shortest path
    let path = [n * m - 1];
    let parent = parents[n * m - 1];

    while (parent !== null) {
        path.unshift(parent);
        parent = parents[parent];
    }

    // Print the coordinates (row and column indices) of the shortest path
    console.log('Coordinates of each cell in the shortest path:');
    for (const index of path) {
        const row = Math.floor(index / m);
        const col = index % m;
        console.log(`Row: ${row}, Column: ${col}`);

        const cell = gridContainer.querySelector(`[data-col="${col}"][data-row="${row}"]`);
        if (cell) {
            cell.style.color = 'white';
            cell.style.background = 'linear-gradient(to top, #FF7F27,#B127ED)';
        }
    }

    return path;
}
