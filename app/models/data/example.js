export const nodes = [
    { key: 1, text: 'node 1', stroke: 'blue' },
    { key: 2, text: 'node 2', stroke: 'gray' },
    { key: 3, text: 'node 3', stroke: 'green' },
    { key: 4, text: 'node 4', stroke: 'red' },
    { key: 5, text: 'node 5', stroke: 'orange' },
    {
        key: 6,
        text: 'Circle',
        fill: 'violet',
        figure: 'Circle',
        height: 125,
        width: 125,
    },
];

export const links = [
    { from: 1, to: 6, text: 'Link 1' },
    { from: 2, to: 6, text: 'Link 2' },
    { from: 3, to: 6, text: 'Link 3' },
    { from: 4, to: 6, text: 'Link 4' },
    { from: 5, to: 6, text: 'Link 5' },
    { from: 6, to: -1, text: 'Link 6' },
];
