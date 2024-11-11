const items = [
    { id: 1, priceSold: 150, dateSold: '2024-10-15', artistId: 1 },
    { id: 2, priceSold: 200, dateSold: '2024-10-14', artistId: 1 },
    { id: 3, priceSold: 250, dateSold: '2024-10-12', artistId: 1 },
    { id: 4, priceSold: 300, dateSold: '2024-10-10', artistId: 1 },
    { id: 5, priceSold: 400, dateSold: '2024-10-08', artistId: 1 },
];

const ctx = document.getElementById('incomeChart').getContext('2d');
const incomeChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14'],
        datasets: [{
            label: 'Amount',
            data: [30, 50, 45, 60, 25, 80, 70, 50, 20, 65, 55, 30, 75, 60], 
            backgroundColor: '#d95f4d',
            borderRadius: 5, 
            barThickness: 15, 
        }]
    },
    options: {
        indexAxis: 'y', 
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: '#e5d2c9', 
                },
                ticks: {
                    color: '#5a3e36',
                }
            },
            y: {
                grid: {
                    display: false, 
                },
                ticks: {
                    color: '#5a3e36',
                }
            }
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#5a3e36', 
                }
            }
        }
    }
});

document.getElementById('addButton').addEventListener('click', function() {
    window.location.href = 'artist-itempage.html';  
});


