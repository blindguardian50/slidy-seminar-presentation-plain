import {
  createChart as createMultiLineChart
} from "./charts/examples/electric-power-consumption/electric-power-consumption.js";
import {createChart as createStackedBarChart} from "./charts/examples/market-shares/market-shares-chart.js";
import {createChart as createChartjsChart} from "./charts/tools/chartjs/chartjs.js";
import {createChart as createPlotlyjsChart} from "./charts/tools/plotlyjs/plotly.js";
import {createChart as createChartistChart} from "./charts/tools/chartist/chartist.js";
import {createChart as createHighChartsChart} from "./charts/tools/highcharts/highcharts.js";
import {createChart as createScatterPlot} from "./charts/examples/sold-cars-germany/sold-cars-germany-chart.js";
import {
  createChart as createPlatformMarketShareChart
} from "./charts/intro/platform-comparison-market-share/platform-comparison-market-share.js";

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

document.addEventListener("DOMContentLoaded", () => {
  createPlatformMarketShareChart('#platform-comparison-market-share')

  createMultiLineChart('#electric-power-consumption')
  createStackedBarChart('#market-shares-chart')
  createScatterPlot('#sold-cars-germany')
  createChartjsChart('#chartjs-chart')
  createPlotlyjsChart('#plotlyjs-chart')
  createChartistChart('#chartist-chart')
  createHighChartsChart('#highcharts-chart')

  addClickResizing('#grouped_bar_full_width', () => resizeElement('#grouped_bar_full_width_figure', '30%', '90%'))
});
