// script.js
document.getElementById('variable').addEventListener('change', function() {
    const selectedVariable = this.value;
    const inputs = ['E', 'C', 'M', 'R', 'A'];
    inputs.forEach(input => {
        document.getElementById(input).disabled = input === selectedVariable;
    });
});

document.getElementById('pavementForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const variable = document.getElementById('variable').value;
    const E = parseFloat(document.getElementById('E').value);
    const C = parseFloat(document.getElementById('C').value);
    const M = parseFloat(document.getElementById('M').value);
    const R = parseFloat(document.getElementById('R').value);
    const A = parseFloat(document.getElementById('A').value);

    let result;

    switch (variable) {
        case 'E':
            result = calculateThickness(C, M, R, A);
            break;
        case 'C':
            result = calculateLoad(E, M, R, A);
            break;
        case 'M':
            result = calculateModulusRupture(E, C, R, A);
            break;
        case 'R':
            result = calculateModulusReaction(E, C, M, A);
            break;
        case 'A':
            result = calculateReliability(E, C, M, R);
            break;
    }

    generateParameterGraph(E, C, M, R, A);
    generateResultGraph(variable, result);
});

document.getElementById('resetButton').addEventListener('click', function() {
    resetGraphs();
    const inputs = ['E', 'C', 'M', 'R', 'A'];
    inputs.forEach(input => {
        document.getElementById(input).disabled = false;
    });
});

function calculateThickness(C, M, R, A) {
    return Math.pow((C / (M * R * A)), 1 / 3);
}

function calculateLoad(E, M, R, A) {
    return E * E * E * M * R * A;
}

function calculateModulusRupture(E, C, R, A) {
    return C / (E * E * E * R * A);
}

function calculateModulusReaction(E, C, M, A) {
    return C / (E * E * E * M * A);
}

function calculateReliability(E, C, M, R) {
    return C / (E * E * E * M * R);
}

function generateParameterGraph(E, C, M, R, A) {
    const data = [
        {
            x: ['Espesor (E)', 'Carga (C)', 'Módulo de Ruptura (M)', 'Módulo de Reacción (R)', 'Confiabilidad (A)'],
            y: [E, C, M, R, A],
            type: 'bar',
            marker: { color: 'rgba(55, 128, 191, 0.7)' }
        }
    ];

    const layout = {
        title: 'Parámetros de Diseño de Pavimento',
        autosize: true,
        margin: {
            l: 40,
            r: 40,
            b: 40,
            t: 40
        }
    };

    Plotly.newPlot('parameter-graph', data, layout);
}

function generateResultGraph(variable, result) {
    const data = [
        {
            x: [`${variable} calculado`],
            y: [result],
            type: 'bar',
            marker: { color: 'rgba(204, 204, 204, 0.7)' }
        }
    ];

    const layout = {
        title: `Resultado: ${variable} calculado`,
        autosize: true,
        margin: {
            l: 40,
            r: 40,
            b: 40,
            t: 40
        }
    };

    Plotly.newPlot('result-graph', data, layout);
}

function resetGraphs() {
    Plotly.purge('parameter-graph');
    Plotly.purge('result-graph');
}