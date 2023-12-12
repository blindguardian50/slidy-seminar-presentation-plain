import IntroSlides from 'bundle-text:../slides/intro/intro.html'
import PatternSlides from 'bundle-text:../slides/patterns/patterns.html'
import SinglePatternSlides from 'bundle-text:../slides/patterns/single_patterns.html'
import ExamplesSlides from 'bundle-text:../slides/examples/examples.html'
import ToolsSlides from 'bundle-text:../slides/tools/tools.html'
import OutroSlides from 'bundle-text:../slides/outro/outro.html'
import GroupedBarWide from 'bundle-text:../images/grouped_bar_wide.svg'
import PowerBiSmall from 'bundle-text:../images/tools/power-bi/power_bi_small.svg'
import PowerBilarge from 'bundle-text:../images/tools/power-bi/power_bi_large.svg'
import {createChart as createMultiLineChart} from "./examples/charts/electric-power-consumption/electric-power-consumption";
import {createChart as createStackedBarChart} from "./examples/charts/market-shares/market-shares-chart";
import {createChart as createChartjsChart} from "./tools/chartjs/chartjs";
import {createChart as createPlotlyjsChart} from "./tools/plotlyjs/plotly";
import {createChart as createChartistChart} from "./tools/chartist/chartist";
import {createChart as createHighChartsChart} from "./tools/highcharts/highcharts";
import {createChart as createScatterPlot} from "./examples/charts/sold-cars-germany/sold-cars-germany-chart";
import {createChart as createPlatformMarketShareChart} from "./intro/charts/platform-comparison-market-share/platform-comparison-market-share";

function addHTML(selector, html) {
    const container = document.querySelector(selector)
    if (!container) return
    container.innerHTML += html;
}

function mergeDocument() {
    addHTML('body',  IntroSlides)
    addHTML('body',  PatternSlides)
    // addHTML('body',  SinglePatternSlides)
    addHTML('body',  ExamplesSlides)
    addHTML('body',  ToolsSlides)
    addHTML('body',  OutroSlides)
    addHTML('#grouped_bar_full_width',  GroupedBarWide)
    addHTML('#power_bi_small',  PowerBiSmall)
    addHTML('#power_bi_large',  PowerBilarge)
}

function resizeElement(selector, from, to) {
    const element = document.querySelector(selector)
    if (!element) return
    element.style.width = element.style.width === from ? to : from
}

function addClickResizing(selector, onClick) {
    const e = document.querySelector(selector)
    if (!e) return
    e.addEventListener('click', onClick)
}

function addRangeResizing(selector, onInput) {
    const e = document.querySelector(selector)
    if (!e) return
    e.addEventListener('input', onInput)
}

document.addEventListener("DOMContentLoaded", (event) => {
    mergeDocument()

    createPlatformMarketShareChart('#platform-comparison-market-share')

    createMultiLineChart('#electric-power-consumption')
    createStackedBarChart('#market-shares-chart')
    createScatterPlot('#sold-cars-germany')
    createChartjsChart('#chartjs-chart')
    createPlotlyjsChart('#plotlyjs-chart')
    createChartistChart('#chartist-chart')
    createHighChartsChart('#highcharts-chart')


    addClickResizing('#grouped_bar_full_width', () => resizeElement('#grouped_bar_full_width_figure', '30%', '90%'))
    addClickResizing('#iframe-example1-resizer', () => resizeElement('#iframe-example1-figure', '30%', '90%'))

    addClickResizing('#iframe-example2-resizer', () => resizeElement('#iframe-example2-figure', '30%', '90%'))
    addRangeResizing('#iframe-example2-range-resizer', (e) => resizeElement('#iframe-example2-figure', e.currentTarget.value + '%', e.currentTarget.value + '%'))

    addRangeResizing('#iframe-tool1-range-resizer', (e) => resizeElement('#iframe-tool1', e.currentTarget.value + '%', e.currentTarget.value + '%'))

    addRangeResizing('#iframe-tool2-range-resizer', (e) => resizeElement('#iframe-tool2', e.currentTarget.value + '%', e.currentTarget.value + '%'))

    addRangeResizing('#iframe-tool3-range-resizer', (e) => resizeElement('#iframe-tool3', e.currentTarget.value + '%', e.currentTarget.value + '%'))

    addRangeResizing('#iframe-tool4-range-resizer', (e) => resizeElement('#iframe-tool4', e.currentTarget.value + '%', e.currentTarget.value + '%'))
});
