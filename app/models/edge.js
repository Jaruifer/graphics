import Model, { attr, belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';

/**
 * EdgeModel defines the edges for a node.
 *
 * toJSON() returns a custom object for the diagram.
 */
export default class EdgeModel extends Model {
    @belongsTo('graph') graph;
    @attr('string') from;
    @attr('string') to;
    @attr('string') text;
    @attr('number', { defaultValue: 18 }) fontSize;
    @attr('string', { defaultValue: 'sans-serif'}) fontFamily;

    constructor() {
        super(...arguments);
    }

    @computed('fontSize', 'fontFamily')
    get fontFormat() {
        return `${this.fontSize}px ${this.fontFamily}`;
    }

    toJSON() {
        return {
            from: this.from,
            to: this.to,
            text: this.text,
            fontSize: this.fontSize,
            fontFamily: this.fontFamily,
            font: this.fontFormat
        };
    }
}
