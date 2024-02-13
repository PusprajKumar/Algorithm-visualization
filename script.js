function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function visualize() {
    let selectedAlgorithm = document.getElementById('algorithm').value;
    
    if (selectedAlgorithm === 'bubble') {
        await bubbleSort();
        showComplexities("Bubble Sort", "O(n^2)", "O(1)");
    } else if (selectedAlgorithm === 'insertion') {
        await insertionSort();
        showComplexities("Insertion Sort", "O(n^2)", "O(1)");
    } else if (selectedAlgorithm === 'linear') {
        await linearSearch();
        showComplexities("Linear Search", "O(n)", "O(1)");
    } else if (selectedAlgorithm === 'binary') {
        await binarySearch();
        showComplexities("Binary Search", "O(log n)", "O(1)");
    }
}

// Time Complexity: O(n^2), Space Complexity: O(1)
async function bubbleSort() {
    let bars = document.querySelectorAll('.array-bar');
    let n = bars.length;
    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            bars[j].style.backgroundColor = '#e74c3c'; // Color current bar being compared
            bars[j+1].style.backgroundColor = '#e74c3c'; // Color next bar being compared
            await sleep(500); // Delay for visualization
            if (parseInt(bars[j].style.height) > parseInt(bars[j+1].style.height)) {
                await sleep(500); // Delay for visualization
                swap(bars[j], bars[j+1]);
            }
            bars[j].style.backgroundColor = '#3498db'; // Reset color
            bars[j+1].style.backgroundColor = '#3498db'; // Reset color
        }
    }
}

// Time Complexity: O(n^2), Space Complexity: O(1)
async function insertionSort() {
    let bars = document.querySelectorAll('.array-bar');
    let n = bars.length;
    for (let i = 1; i < n; i++) {
        let key = parseInt(bars[i].style.height);
        let j = i - 1;
        while (j >= 0 && parseInt(bars[j].style.height) > key) {
            bars[j].style.backgroundColor = '#e74c3c'; // Color current bar being compared
            bars[j+1].style.backgroundColor = '#e74c3c'; // Color next bar being compared
            await sleep(500); // Delay for visualization
            bars[j+1].style.height = bars[j].style.height;
            j = j - 1;
            await sleep(500); // Delay for visualization
            bars[j+1].style.backgroundColor = '#3498db'; // Reset color
        }
        bars[j+1].style.height = key + 'px';
    }
}

// Time Complexity: O(n), Space Complexity: O(1)
async function linearSearch() {
    let bars = document.querySelectorAll('.array-bar');
    let searchValue = parseInt(prompt("Enter the value to search:"));
    let found = false;
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = '#e74c3c'; // Color current bar being compared
        await sleep(500); // Delay for visualization
        if (parseInt(bars[i].style.height) === searchValue) {
            found = true;
            bars[i].style.backgroundColor = '#2ecc71'; // Highlight the found element
            break;
        }
        bars[i].style.backgroundColor = '#3498db'; // Reset color
    }
    if (!found) {
        alert("Value not found!");
    }
}

// Time Complexity: O(log n), Space Complexity: O(1)
async function binarySearch() {
    let bars = document.querySelectorAll('.array-bar');
    let searchValue = parseInt(prompt("Enter the value to search:"));
    let left = 0;
    let right = bars.length - 1;
    let found = false;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        bars[mid].style.backgroundColor = '#e74c3c'; // Color current bar being compared
        await sleep(500); // Delay for visualization
        if (parseInt(bars[mid].style.height) === searchValue) {
            found = true;
            bars[mid].style.backgroundColor = '#2ecc71'; // Highlight the found element
            break;
        } else if (parseInt(bars[mid].style.height) < searchValue) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
        bars[mid].style.backgroundColor = '#3498db'; // Reset color
    }
    if (!found) {
        alert("Value not found!");
    }
}

function swap(bar1, bar2) {
    let tempHeight = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = tempHeight;
}

// Function to display time and space complexities
function showComplexities(algorithm, timeComplexity, spaceComplexity) {
    let complexityInfo = document.getElementById('complexity-info');
    complexityInfo.innerHTML = `
        <h3>${algorithm}</h3>
        <p><strong>Time Complexity:</strong> ${timeComplexity}</p>
        <p><strong>Space Complexity:</strong> ${spaceComplexity}</p>
    `;
}

// Function to generate random heights for bars
function generateBars() {
    let container = document.getElementById('array-container');
    container.innerHTML = ''; // Clear previous bars
    for (let i = 0; i < 20; i++) {
        let height = Math.floor(Math.random() * 100) + 10; // Random height between 10 and 100
        let bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = height + 'px';
        container.appendChild(bar);
    }
}

// Generate initial bars
generateBars();
