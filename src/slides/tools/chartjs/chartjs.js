// import Chart from 'chart.js/auto'
// import Chart from '../../../libs/chart-libs/chartjs.esm.js'
// import ChartDataLabels from 'chartjs-plugin-datalabels' // 'chartjs-plugin-datalabels';
// import ChartDataLabels from './chartjs-plugin-datalabels.js' //The esm bundle does not work in production,
                                                             // which is also the reason the package
                                                             // datalabels package does not work. The local bundle does
                                                             // not work together with the chart.js umd bundle
import austrianCities from './data/austrian-cities.js'

//Global registration
//Chart.register(ChartDataLabels)

export async function createChart(selector) {
    const element = document.querySelector(selector)
    if (!element) return
    const data = austrianCities.cities.map((city, index) => {
        return {city, population: austrianCities.populations[index]}
    })

    const formatter = (value) => {
        if (Number(value) > 999999) {
            const text = value.toString()
            const shortened = text.slice(0, text.length - 6) + '.' + text[text.length - 6]
            return shortened + 'M'
        } else if (Number(value) > 999) {
            const text = value.toString()
            const shortened = text.slice(0, text.length - 3) // + '.' + text[text.length - 6]
            return shortened + 'K'
        }
        return value;
    }

    const cityScale = {
        type: 'category',
        title: {
            display: true,
            text: 'City'
        },
        ticks: {
            autoSkip: false,
            maxRotation: 90, // Set the rotation angle to 0 degrees
            minRotation: 0  // Set the rotation angle to 0 degrees
        }
    }

    const populationScale = {
        title: {
            display: true,
            text: 'Population'
        },
        ticks: {
            // Include a dollar sign in the ticks
            callback: formatter
        }
    }

    const config = {
        type: 'bar',
        // plugins: [ChartDataLabels],
        options: {
            onResize(chart, size) {
                chart.options.scales.x = size.width < 400 ? populationScale : cityScale
                chart.options.scales.y = size.width < 400 ? cityScale : populationScale
                chart.options.indexAxis = size.width < 400 ? 'y' : 'x'
            },
            indexAxis: 'x',  // flipchart: turn to y
            scales: {
                x: cityScale, // flipchart: turn to populationScale
                y: populationScale // flipchart: turn to cityScale
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Population of Austrian Cities',
                    padding: {
                        bottom: 25
                    }
                },
                legend: {
                    display: false
                },
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    // offset: 4
                    // color: '#36A2EB'
                    formatter
                }
            },
            responsive: true,
            maintainAspectRatio: false
        },
        data: {
            labels: data.map(row => row.city),
            datasets: [
                {
                    // label: 'Population of Austrian Cities',
                    data: data.map(row => row.population)
                }
            ]
        }
    }
    new Chart(element, config);
}
