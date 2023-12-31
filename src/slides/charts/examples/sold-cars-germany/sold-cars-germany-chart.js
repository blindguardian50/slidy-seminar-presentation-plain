import * as d3 from '../../../../libs/d3-7.6.0/d3.js'
import {ScatterPlot} from '../../../../libs/respvis/respvis.js'
import {carData, getTopMakesData} from './data/sold-cars-germany.js';
import {chooseResponsiveData} from "./chooseResponsiveData.js";
import {format} from "../../../../libs/d3-7.6.0/d3.js";


const {topMakesNames, mileages, horsePower, prices} = getTopMakesData(5)
const allHorsePower = carData.map(entry => entry.hp)
const allPrices = carData.map(entry => entry.price)
const allMileages = carData.map(entry => entry.mileage)

const baseScaleX = d3.scaleLinear()
    .domain([0, 700])
    .nice()
const baseScaleY = d3.scaleLinear()
    .domain([0, Math.max(...allPrices)])
    .nice()
const radiusScale = d3.scaleLinear()
    .domain([0, Math.max(...allMileages)])
    .range([5, 20])

const scales = {
    xScale: baseScaleX,
    yScale: baseScaleY,
    radiusScale
}


const data = {
    xValues: horsePower,
    xScale: scales.xScale,
    yValues: prices,
    yScale: scales.yScale,
    xAxis: { title: 'Horse Power [PS]', configureAxis: (axis) => axis.tickFormat(format('.3d')) },
    yAxis: { title: 'Price [EU]' },
    title: "Car Characteristics",
    radiuses: {
        radiusDim: mileages,
        scale: scales.radiusScale
    },
    markerTooltips: {
        tooltips: (e, {xValue, yValue, radiusValue}) => {
            return `Horse Power: ${xValue}PS<br/>Price: ${yValue}€<br/>Mileage: ${radiusValue}km`
        },
    },
    legend: {
        keys: [...topMakesNames, "Other"],
        labels: [...topMakesNames, "Other"]
    },
    zoom: {
        in: 20,
        out: 1
    }
};

export function createChart(selector) {
    const chartWindow = d3.select(selector).append('div')
    const renderer = new ScatterPlot(chartWindow, data)
    renderer.addCustomListener('resize.custom', (event, data) => {
        chooseResponsiveData(event.target, data)
    })

    renderer.buildWindowChart()
}


