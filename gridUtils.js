const gridContainer = document.getElementById('grid-container');
const gridComputedStyle = window.getComputedStyle(gridContainer);

function extractNumbersFromGrid() {
    // Get the number of grid columns
    gridColumnCount = gridComputedStyle.getPropertyValue('grid-template-columns').split(' ').length;
    // Get the number of grid rows
    gridRowCount = gridComputedStyle.getPropertyValue('grid-template-rows').split(' ').length;

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

async function run() {
    console.clear();
    distLengthLabel.innerHTML = "_";
    const weights = extractNumbersFromGrid();
    const shortestPathResult = await dijkstra(weights);
    animateShortestPath(shortestPathResult.coordinates);
    animateDistanceLabel(0, shortestPathResult.distance, shortestPathResult.coordinates.length * 70);
}

async function dijkstra(distances) {
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

        // Find the unprocessed cell with the least cost
        for (let i = 0; i < n * m; i++) {
            if (!processed.includes(i) && costs[i] < minCost) {
                minCost = costs[i];
                node = i;
            }
        }

        if (node === null) break; // All cells processed

        const row = Math.floor(node / m);
        const col = node % m;

        // Highlight the cell being processed
        await highlightCell(row, col);

        // Explore neighbors
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

    // Create an array of objects representing each cell in the path
    const cellCoordinates = path.map(index => ({
        row: Math.floor(index / m),
        col: index % m
    }));

    // Calculate the distance of the shortest path and update distance label
    let totalDistance = 0;
    for (let i = 1; i < cellCoordinates.length; i++) {
        const { row, col } = cellCoordinates[i];
        totalDistance += distances[row][col];
    }

     // Print the coordinates (row and column indices) of the shortest path
     console.log('Coordinates of all cells in the shortest path:');
     for (const { row, col } of cellCoordinates) {
        console.log(`Row: ${row}, Column: ${col}`);
     }
 
    // Return an object with coordinates and distance
    return {
        coordinates: cellCoordinates,
        distance: totalDistance
    };
}

async function animateShortestPath(coordinates) {
    const animationDuration = 60; // milliseconds

    async function changeCellColor(element, color) {
        element.style.background = color;
        await new Promise(resolve => setTimeout(resolve, animationDuration));
    }

    for (const { row, col } of coordinates) {
        const cell = gridContainer.querySelector(`[data-col="${col}"][data-row="${row}"]`);
        if (cell) {
            cell.style.color = 'white';
            await changeCellColor(cell, 'linear-gradient(to top, #6F7CDB, #AD80DB)');
        }
    }
}

async function highlightCell(row, col) {
    const processingCell = gridContainer.querySelector(`[data-col="${col}"][data-row="${row}"]`);
    processingCell.style.background = "#86DB74"; 
    processingCell.style.color= "#444";

    await new Promise(resolve => setTimeout(resolve, 1 / (gridRowCount * gridColumnCount))); 
}

function animateDistanceLabel(initDistance, totalDistance, duration) {
    const startValue = initDistance;
    const startTime = performance.now();

    function updateNumber(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic easing function

        const currentValue = Math.round(easedProgress * (totalDistance - startValue) + startValue);
        distLengthLabel.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}
