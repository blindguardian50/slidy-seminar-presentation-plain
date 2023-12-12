import { select } from '../../../../libs/d3-7.6.0/d3.js'
import {
  chartWindowLineData,
  chartWindowLineRender,
  chartWindowLineAutoResize,
} from '../../../../libs/respvis/respvis.js';

import {date, tablet, desktop, mobile} from './data'
import {chooseResponsiveData} from "./chooseResponsiveData.js";

const calcData = () => {
  return {
    xValues: date,
    yValues: [desktop, mobile, tablet],
    xAxis: {
      title: 'Year',
      tickOrientation: {
        bounds: [ {minWidth: '50rem'}, {minWidth: '20rem'} ],
        orientation: ['horizontal', 'transition', 'vertical'],
        rotationDirection: 'counterclockwise'
      }
    },
    yAxis: {
      title: 'Share',
      configureAxis: (a) => a.tickFormat((v) => v + '%')
    },
    markerTooltips: {
      tooltips: (_, {xValue, yValue}) => `Date: ${xValue}<br/>Share: ${yValue}%`
    },
    legend: {
      keys: ['Desktop', 'Mobile', 'Tablet'],
      labels: ['Desktop', 'Mobile', 'Tablet'],
    }
  }
}

export function createChart(selector) {
  const chart = select(selector)
    .append('div')
    .datum(chartWindowLineData(calcData()))
    .call(chartWindowLineRender)
    .call(chartWindowLineAutoResize)
    .on('resize', (e, d) => {
      // chooseResponsiveData(d, e.target)
      chart.datum(chartWindowLineData(d)).call(chartWindowLineRender);
    })
}
