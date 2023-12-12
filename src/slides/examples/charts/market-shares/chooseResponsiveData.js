import {findMatchingBoundsIndex} from '../../../../libs/respvis/respvis.js';

const responsiveData = [
    { maxWidth: '27.5rem' },
    { maxWidth: '36.25rem' },
]

export function chooseResponsiveData(data, element) {
    const index = findMatchingBoundsIndex(element, responsiveData)
    switch (index) {
        case 0: case 1: data.title = 'Device Types'; break
        default: data.title = "Market Share of Device Types"

    }
    switch (index) {
        case 0: case 1: data.legend.title = ''; break
        default: data.legend.title = 'Device Type'
    }
    switch (index) {
        case 0: data.flipped = true; break
        default: data.flipped = false;
    }
}
