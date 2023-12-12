import {
    chartWindowBarStackedData,
    chartWindowBarStackedRender,
    chartWindowBarStackedAutoFilterCategories,
    chartWindowBarStackedAutoFilterSubcategories
} from '../../../../libs/respvis/respvis.js';
import { chooseAxisFormat } from "./chooseAxisFormat.js";
import { chooseResponsiveData } from "./chooseResponsiveData.js";
import { years, desktop, phone, tablet, platforms } from './data/desktop-phone-tablet.js';
import * as d3 from '../../../../libs/d3-7.6.0/d3.js'

const shares = desktop.map((d, i) => [desktop[i], phone[i], tablet[i]]);

const calcData = () => { //data for sufficient space
    return {
        categoryEntity: 'Year',
        categories: years,
        values: shares,
        valuesAsRatios: true,
        valueDomain: [0, 100],
        subcategoryEntity: 'Platforms',
        subcategories: platforms,
        labels: {},
        tooltips: (e, { category, subcategory, value }) =>
            `Year: ${category}<br/>Platform: ${subcategory}<br/>Market Share: ${d3.format('.2f')(
                value
            )}%`,
        xAxis: {
            title: 'Year',
        },
        yAxis: {
            title: 'Market Share',
            configureAxis: (a) => a.tickFormat((v) => `${v}%`),
        },
    };
}

const data = calcData()

export function createChart(selector) {
    const chart = d3
        .select(selector)
        .append('div')
        .datum(chartWindowBarStackedData(data))
        .call(chartWindowBarStackedRender)
        .call(chartWindowBarStackedAutoFilterCategories(data))
        .call(chartWindowBarStackedAutoFilterSubcategories(data))
        .on('resize', function (e, d) {
            chooseResponsiveData(d, e.target)

            const xAxisE = d3.select(selector).select('.axis-x').node()
            chooseAxisFormat(xAxisE, d)

            chart.datum(chartWindowBarStackedData(d)).call(chartWindowBarStackedRender);
        });
}

/*
* chart Orientation:
*
* Long:
* Legend on Right / Legend With Title / Years at Bottom / Percent at Left
*
* Middle:
* Legend on Right / Legend With Title / Years at Bottom + Shortened / Percent at Left
*
* Short:
* Legend on Top / Legend Without Title / Years at Left / Percent at Bottom
*
* */
