let fields = [
    null,
    null,
    null,
    'circle',
    null,
    null,
    'cross',
    null,
    null,
];

function init(){
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
            table += `<td>${symbol}</td>`;
        }
        table += '</tr>';
    }

    table += '</table>';
    contentDiv.innerHTML = table;
}


function generateAnimatedCircle() {
    const width = 70;
    const height = 70;
    const animationDuration = 0.5; // in seconds

    const svgHTML = `
        <svg width="${width}" height="${height}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" fill="none" stroke="green" stroke-width="15">
                <animate attributeName="r" from="0" to="40" dur="${animationDuration}s" fill="freeze" />
            </circle>
        </svg>
    `;

    return svgHTML;
}

function generateAnimatedCross() {
    const width = 70;
    const height = 70;
    const animationDuration = 0.7; // in seconds
    const color = "#FFc000";

    const svgHTML = `
        <svg width="${width}" height="${height}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,10 L90,90 M90,10 L10,90" fill="none" stroke="${color}" stroke-width="15">
                <animate attributeName="stroke-dasharray" from="0,200" to="200,0" dur="${animationDuration}s" fill="freeze" />
            </path>
        </svg>
    `;

    return svgHTML;
}

