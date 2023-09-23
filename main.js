const activityForm = document.querySelector('#activityForm');
const imgApproved = `<img src='./images/aprovado.png' alt="Emoji celebrando" />`;
const imgFailed = `<img src='./images/reprovado.png' alt="Emoji decepcionado" />`;
const activities = [];
const grades = [];
const spanApproved = '<span class="result approved">Aprovado</span>';
const spanFailed = '<span class="result failed">Reprovado</span>';
let minimalGrade;
do {
    minimalGrade = parseFloat(prompt('Digite a nota mínima para aprovação'));
} while (isNaN(minimalGrade) === true || minimalGrade > 10 || minimalGrade < 0)

let lines = '';

activityForm.addEventListener('submit', function(e){
    e.preventDefault();
    addLine();
    updateTable();
    updateFinalAverage();
});

function addLine(){
    const activityName = document.querySelector('#activityName');
    const activityScore = document.querySelector('#activityScore');

    if (activities.includes(activityName.value)){
        alert(`A atividade ${activityName.value} já foi inserida`)
    } else {
        activities.push(activityName.value);
        grades.push(parseFloat(activityScore.value));

        let line = '<tr>';
        line += `<td>${activityName.value}</td>`;
        line += `<td>${activityScore.value}</td>`;
        line += `<td>${activityScore.value >= minimalGrade ? imgApproved : imgFailed} </td>`;
        line += `</tr>`;

        lines += line;
    }

    activityName.value = '';
    activityScore.value = '';
}

function updateTable(){
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = lines;
}

function updateFinalAverage(){
    const finalAverage = calculateFinalAverage();
    document.querySelector('#finalAverage').innerHTML = finalAverage;
    document.querySelector('#finalGrade').innerHTML = finalAverage >= minimalGrade ? spanApproved : spanFailed;
}

function calculateFinalAverage(){
    let sum = 0;
    for (let i=0; i < grades.length; i++){
        sum+= grades[i];
    };

    let average = sum/(grades.length);
    return average
}