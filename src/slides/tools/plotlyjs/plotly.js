// @ts-ignore //breaks parcel
// import Plotly from './bundle/plotly.js'
// import Plotly from './bundle/plotly-basic.js'
import austrianCities from './data/austrian-cities'
//
export function createChart(selector) {
    const plot = document.querySelector(selector)
    if (!plot) return

    const barData = {
        type: 'bar',
        x: austrianCities.cities, // [1, 2, 3, 4],
        y: austrianCities.populations, //[5, 10, 2, 8],
        text: austrianCities.populations, //[5, 10, 2, 8],
        textposition: 'outside',
        marker: {
            color: '#78b4c6',
            line: {
                width: 2.5
            }
        }
    };

    const data = [barData];
    const layout = {
        title: 'Population of Austrian Cities',
        font: {size: 18},
        xaxis: {
            title: 'City',
        },
        yaxis: {
            tick0: 0,
            tickmode: 'linear',
            dtick: 200000,
            ntick: 10,
            tickformat: '.2s',
            title: 'Population',
        },
        margin: {
            t: 50,  // Increase the top margin to not cut off top element label
            b: 150, // Increase the bottom margin to make room for the x-axis tick labels and title
        },
    };

    const config = {responsive: true}

    //@ts-ignore
    const chart = Plotly.newPlot(plot, data, layout, config);
}
