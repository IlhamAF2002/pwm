document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("puzzleContainer");

    // Function to generate a random puzzle
    function createPuzzle() {
        // icon for generating a random puzzle (9x9)
        let icon = [
            '🍓', '🍒', '🍉', '🍑', '🍊', '🍍',
            '🍐', '🍏', '🍈', '🍋', '🍌', '🍇',
            '🍓', '🍒', '🍉', '🍑', '🍊', '🍍',
            '🍐', '🍏', '🍈', '🍋', '🍌', '🍇',
            '🍓', '🍒', '🍉', '🍑', '🍊', '🍍',
            '🍐', '🍏', '🍈', '🍋', '🍌', '🍇'];

        // Function to shuffle a 1D array
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
         }
        
        puzzle = [];
        while (icon.length) {
            puzzle.push(shuffleArray(icon).splice(0, 6).slice());
        }
        clickedCell = [];
        uniqueCell = new Set();

    }

    // Function to show puzzle grid
    function showPuzzle(puzzle) {
        container.innerHTML = '';
        puzzle.forEach((row, rowIndex) => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');
            row.forEach((cell, columnIndex) => {
                const cellElement = document.createElement('button');
                cellElement.classList.add('cell');
                cellElement.id = rowIndex+'-'+columnIndex;
                cellElement.type = 'button';
                cellElement.value = cell;
                cellElement.textContent = cellElement.value;
                cellElement.disabled = true;
                cellElement.classList
                    .add((rowIndex + columnIndex) % 2 === 0 ?
                        'yellowBackground' : 'greenBackground');
                cellElement.addEventListener('click', () => {
                    cellElement.textContent = cellElement.value;// Show cell
                    cellElement.disabled = true; //make button does not working
                    matchPuzzle(cellElement.value,cellElement.id);
                  });
                rowElement.appendChild(cellElement);
            });
            container.appendChild(rowElement);
        });
    }
    
    function matchPuzzle(value,id) {
        clickedCell.push(id);
        uniqueCell.add(value);
        if (uniqueCell.size == 2 || clickedCell.length == 3) {
            if (uniqueCell.size == 2 ) {
                hide();  
            }
            //clear the array
            clickedCell.length = 0;
            uniqueCell.clear();
        }
 
    }

    function hide() {
        for (let cc of clickedCell) {
            setTimeout(() => {
                document.getElementById(cc).textContent = '';
                document.getElementById(cc).disabled = false;
            }, 500);
        }
    }

    // create new puzzle
    createPuzzle();

    // Function to reset the puzzle
    function resetPuzzle() {
        createPuzzle();
        showPuzzle(puzzle);
    }
    
    function startPuzzle() {
        for (let c of document.getElementsByClassName("cell")) {
            c.textContent = c.textContent = '';
            c.disabled = false;
        }
    }

    // Initial puzzle creation
    showPuzzle(puzzle);

    // Attach event listeners to buttons
    document.getElementById("startButton")
        .addEventListener('click', startPuzzle);
    document.getElementById("resetButton")
        .addEventListener("click", resetPuzzle);
});