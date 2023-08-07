let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
];

function init() {
    render();
}

function render() {
    let contentDiv = document.getElementById('content');
    let table = '<table>';

    for (let i = 0; i < 3; i++) {
        table += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = fields[index] === 'circle' ? generateAnimatedCircle() : fields[index] === 'cross' ? generateAnimatedCross() : '';
            table += `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
        }
        table += '</tr>';
    }

    table += '</table>';
    contentDiv.innerHTML = table;
}

function handleClick(tdElement, index) {
    if (fields[index] === null) {
        const currentPlayer = fields.filter(Boolean).length % 2 === 0 ? 'circle' : 'cross';
        fields[index] = currentPlayer;
        tdElement.innerHTML = currentPlayer === 'circle' ? generateAnimatedCircle() : generateAnimatedCross();
        tdElement.onclick = null;

        if (isGameFinished()) {
            const winCombination = getWinningCombination();
            drawWinningLine(winCombination);
        }
    }
}

function isGameFinished() {
    return fields.every((field) => field !== null) || getWinningCombination() !== null;
}

function getWinningCombination() {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
            return WINNING_COMBINATIONS[i];
        }
    }
    return null;
}


function drawWinningLine(combination) {
    const lineColor = '#000000';
    const lineWidth = 5;

    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();


    const contentRect = document.getElementById('content').getBoundingClientRect();

    const lineLength = Math.sqrt(
    Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

  
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);
}



function generateAnimatedCircle() {
    const width = 70;
    const height = 70;
    const animationDuration = 0.2; // in seconds

    const svgHTML = `
        <svg width="${width}" height="${height}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="none" stroke="green" stroke-width="8">
                <animate attributeName="r" from="0" to="40" dur="${animationDuration}s" fill="freeze" />
            </circle>
        </svg>
    `;

    return svgHTML;
}

function generateAnimatedCross() {
    const width = 70;
    const height = 70;
    const animationDuration = 0.4; // in seconds
    const color = "#FFc000";

    const svgHTML = `
        <svg width="${width}" height="${height}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,10 L90,90 M90,10 L10,90" fill="none" stroke="${color}" stroke-width="8">
                <animate attributeName="stroke-dasharray" from="0,200" to="200,0" dur="${animationDuration}s" fill="freeze" />
            </path>
        </svg>
    `;
    const sgHTML = `
        <svg width="${width}" height="${height}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,10 L90,90 M90,10 L10,90" fill="none" stroke="${color}" stroke-width="8">
                <animate attributeName="stroke-dasharray" from="0,200" to="200,0" dur="${animationDuration}s" fill="freeze" />
            </path>
        </svg>
    `;
    const sggHTML = `
        <svg width="${width}" height="${height}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,10 L90,90 M90,10 L10,90" fill="none" stroke="${color}" stroke-width="8">
                <animate attributeName="stroke-dasharray" from="0,200" to="200,0" dur="${animationDuration}s" fill="freeze" />
            </path>
        </svg>
    `;

    return svgHTML;
}

