const ctx = document.getElementById('myChart').getContext('2d');

const data = {
    labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    datasets: [{
        label: 'Atendimentos',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(0, 99, 132, 0.6)',
        borderColor: 'rgba(0, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(0, 99, 132, 0.8)',
        hoverBorderColor: 'rgba(0, 99, 132, 1)'
    }]
};

const options = {
    scales: {
        y: {
            beginAtZero: true,
            max: 5,
            ticks: {
                stepSize: 1
            }
        }
    },
    onClick: (event, elements) => {
        if (elements.length > 0) {
            const index = elements[0].index;
            const day = data.labels[index];
            const count = data.datasets[0].data[index];
            document.getElementById('selectedDay').textContent = `${day} - 01/06`;
            document.getElementById('attendanceCount').textContent = `Atendimentos: ${count}`;
        }
    }
};

const myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
});

document.getElementById('addButton').addEventListener('click', () => {
    const dayIndex = document.getElementById('daySelect').value;
    const attendanceCount = document.getElementById('attendanceInput').value;

    data.datasets[0].data[dayIndex] = Number(attendanceCount);
    myChart.update();
});

// Simulação de integração futura com uma agenda
function fetchAgendaData() {
    // Simulação de dados de uma agenda
    const agendaData = {
        'Dom': 1,
        'Seg': 2,
        'Ter': 3,
        'Qua': 1,
        'Qui': 2,
        'Sex': 3,
        'Sáb': 2
    };

    data.labels.forEach((day, index) => {
        data.datasets[0].data[index] = agendaData[day];
    });

    myChart.update();
}

// Função para ser chamada quando a integração estiver pronta
function updateFromAgenda() {
    fetchAgendaData();
}

// Chamada inicial de atualização para simular a agenda
updateFromAgenda();

// Função para atualizar a data e hora atual
function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleDateString('pt-BR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }) + ' ' + now.toLocaleTimeString('pt-BR');
    document.getElementById('currentDateTime').textContent = dateTimeString;
}

// Atualizar a data e hora atual a cada segundo
setInterval(updateDateTime, 1000);
updateDateTime();
