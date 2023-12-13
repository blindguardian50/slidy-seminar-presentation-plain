import { BarChart } from '../../../libs/chart-libs/chartist/chartist.ems.js';
import austrianCities from './data/austrian-cities.js'
export function createChart(selector) {
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

    return new BarChart(selector, {
        labels: austrianCities.cities,
        series: [austrianCities.populations]
    }, {
        axisX: {
            // labelInterpolationFnc: (value, index) => (index % 2 === 0 ? value : null)
        },
        axisY: {
            labelInterpolationFnc: formatter
        },
        chartPadding: { left: 30, top: 20, bottom: 20 }, //Necessary for example data, without it labels get cut off
        // reverseData: true,
        // horizontalBars: true,
        plugins: []
    });
}

