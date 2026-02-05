$(document).ready(function () {

    $('.filter-option').click(function (e) {
        e.preventDefault();

        let filter = $(this).data('filter');

        if (filter === 'all') {
            $('.chart-item').show();
        } else {
            $('.chart-item').hide();
            $(`.chart-item[data-type="${filter}"]`).show();
        }
    });
});

function openChartModal(chartId, title, description) {
    document.getElementById('chartModalTitle').innerText = title;
    document.getElementById('chartModalDescription').innerText = description;

    if (window.currentChart instanceof Chart) {
        window.currentChart.destroy();
    }

    const ctx = document.getElementById('modalChart').getContext('2d');
    const sourceChart = Chart.getChart(chartId);

    if (sourceChart) {
        const chartType = sourceChart.config.type;
        const chartData = JSON.parse(JSON.stringify(sourceChart.config.data));

        window.currentChart = new Chart(ctx, {
            type: chartType,
            data: chartData,
            options: sourceChart.config.options
        });
    }

    const myModal = new bootstrap.Modal(document.getElementById('chartModal'));
    myModal.show();
}

document.querySelectorAll(".chart").forEach(chart => {
    chart.addEventListener("click", function () {
        const chartId = this.querySelector("canvas").id;
        openChartModal(chartId, "Chart Title", "Chart description goes here.");
    });
});

document.addEventListener("DOMContentLoaded", function () {

    fetch('/api/chart-data/top_stations')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error fetching data:", data.error);
                return;
            }

            const ctx = document.getElementById('station').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Stations',
                        data: data.datasets[0].data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(255, 159, 64, 0.8)',
                            'rgba(255, 99, 71, 0.8)',
                            'rgba(144, 238, 144, 0.8)',
                            'rgba(255, 215, 0, 0.8)',
                            'rgba(0, 191, 255, 0.8)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    indexAxis: 'x',
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true
                        }
                    },

					scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Stations'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Total Stations'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));


    fetch('/api/chart-data/total_vehicles')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error fetching data:", data.error);
                return;
            }

            const ctx = document.getElementById('totalve').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Total Electric Vehicles by County in US',
                        data: data.datasets[0].data,
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true
                        }
                    },
					scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'County'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Vehicle Totals'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    
    fetch('/api/chart-data/batt_vehicles')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("Error fetching data:", data.error);
                return;
            }

            const ctx = document.getElementById('batt_vehicles').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Battery Vehicles in 2022',
                        data: data.datasets[0].data,
                        backgroundColor: [
                            'rgb(255, 0, 55)',
                            'rgb(0, 153, 255)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Month'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Vehicle Totals'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));

});
