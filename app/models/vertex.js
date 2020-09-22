import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
/**
 * VertexModel represents a node in the graph. Nodes have some properties
 * by default. Properties can be overwrite.
 *
 * Nodes also contain a relationship with edges since a node has a set of
 * edges
 *
 * This is a very simple schema but we could create more types like:
 *
 * type Shape extends VertexModel
 * type Circle extends shape -> VertexModel
 * type Rectangle extends shape -> VertexModel
 *
 * By using explicit inverses you can specify which property on the related
 * model is the inverse using belongsTo or hasMany inverse option.
 *
 * toJSON() returns a custom object for the diagram.
 */
export default class VertexModel extends Model {
    @belongsTo('graph', { inverse: 'vertices' }) graph;
    @hasMany('edge', { inverse: false }) edges;
    @attr('string') key;
    @attr('string') text;
    @attr('number', { defaultValue: 0 }) margin;
    @attr('number', { defaultValue: 150 }) width;
    @attr('number', { defaultValue: 100 }) height;
    @attr('number', { defaultValue: 28 }) fontSize;
    @attr('string', { defaultValue: 'black' }) stroke;
    @attr('string', { defaultValue: 'transparent' }) fill;
    @attr('string', { defaultValue: 'RoundedRectangle'}) figure;
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
            key: this.key,
            text: this.text,
            fontSize: this.fontSize,
            fontFamily: this.fontFamily,
            font: this.fontFormat,
            margin: this.margin,
            width: this.width,
            height: this.height,
            stroke: this.stroke,
            fill: this.fill,
            figure: this.figure
        };
    }
}
