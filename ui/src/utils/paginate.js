import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items)
        .slice(startIndex)
        .take(pageSize)
        .value();
}

export function getPageRange(pageNumber, windowSize, previousPageRange) {
    // don't change the range if current page lies within it
    if (previousPageRange.includes(pageNumber)) {
        return previousPageRange;
    }

    let startIndex, endIndex;
    if (pageNumber < previousPageRange[0]) {
        // when clicked on the previous icon
        startIndex = pageNumber;
        endIndex = pageNumber + windowSize;
    } else {
        // when clicked on the next icon
        startIndex = pageNumber > 5 ? (pageNumber - windowSize) + 1 : 1;
        endIndex = pageNumber > 5 ? pageNumber + 1 : windowSize + 1;
    }

    return _.range(startIndex, endIndex);
}
