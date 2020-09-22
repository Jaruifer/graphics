import Model, { attr, hasMany } from '@ember-data/model';

/**
 * GraphModel define the relationship among nodes and edges.
 *
 * By creating more types of VertexModel we could especify
 * vertex as polimorphic so we can add types that extend
 * from VertexModel like Circle, Rectangle or any other shape.
 *
 * @hasMany('vertex', { polimorphic: true }) vertices;
 */
export default class GraphModel extends Model {
    @attr('string') name;
    @hasMany('vertex') vertices;
    @hasMany('edge') edges;

    constructor() {
        super(...arguments);
    }
}
