import austrianCities from './data/austrian-cities.js';
import { chart } from 'highcharts';

export function createChart(selector) {
    const renderTo  = document.querySelector(selector)
    if (!renderTo) return
    const formatter = (context) => {
        const value = context.value
        if (Number(value) > 999999) {
            const text = value.toString()
            const shortened = text.slice(0, text.length - 6) + '.' + text[text.length - 6]
            return shortened + 'M'
        } else if (Number(value) > 999) {
            const text = value.toString()
            const shortened = text.slice(0, text.length - 3) // + '.' + text[text.length - 6]
            return shortened + 'K'
        }
        return context.text;
    }
    const option = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Population of Austrian Cities',
            align: 'center'
        },
        subtitle: {
            text: 'Source: <a ' +
                'href="https://www.kaggle.com/datasets/juanmah/world-cities"' +
                'target="_blank">Kaggle.com</a>',
            align: 'left'
        },
        xAxis: {
            categories: austrianCities.cities,
            title: {
                text: 'City',
                align: 'middle'
            },
            labels: {
                autoRotation: [-10, -20, -30, -40, -50, -60, -70, -80, -90]
            },
            gridLineWidth: 1,
            lineWidth: 0
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population',
                align: 'middle'
            },
            labels: {
                overflow: 'justify',
                formatter
            },
            gridLineWidth: 0
        },
        legend: {
            enabled: false
        },
        tooltip: {
            valueSuffix: ' millions'
        },
        plotOptions: {
            column: {
                borderRadius: '5%',
                dataLabels: {
                    enabled: true
                },
                groupPadding: 0.1,
                color: '#78b4c6',
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            type: 'column', // same as as SeriesBarOptions
            name: 'Cities',
            data: austrianCities.populations
        }]
    }
    return chart(renderTo, options);
}
