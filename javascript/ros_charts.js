(async function () {
    const data = [
        { year: "Breaker", count: 1 },
        { year: "Turning", count: 1 },
        { year: "Pink", count: 1 },
        { year: "Light red", count: 1 },
        { year: "Ripe red", count: 1 }
    ];

    // document.getElementById('pie_chart_canvas').height = window.innerHeight * 0.25;
    // document.getElementById('pie_chart_canvas').width = window.innerWidth * 0.25;

    new Chart(
        document.getElementById('pie_chart_canvas'),
        {
            type: 'doughnut',
            data: {
                labels: data.map(row => row.year),
                datasets: [
                    {
                        label: 'Acquisitions by year',
                        data: data.map(row => row.count)
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: "Test"
                },
                cutoutPercentage: 80,
                legend: {
                    position: 'right'
                }
            }
        }
    );
})();  