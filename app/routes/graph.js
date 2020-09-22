import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

/**
 * GraphRoute is the object responsable of providing the model
 * to the template graph. This model is the first record
 * of the table/model graph named example and that contains the
 * detail and relationships among nodes and edges.
 *
 * The store is injected into the class by using the annotation
 * @service then we are able to perform queries over the data.
 *
 * This model is accessible from the route, controller, templates and
 * components.
 *
 * The Model is initialized when the application route is executed so the
 * information is available at this point.
 *
 * PeekRecord retrieves a record by its type and id without making a
 * network request since the information is already at the application
 * and not in the server.
 *
 * model.toJSON() is overwritten and it returns a custom object;
 * record.toJON() is deprecated: https://deprecations.emberjs.com/ember-data/v3.x/#toc_record-toJSON
 */
export default class GraphRoute extends Route {
    @service store;

    constructor() {
        super(...arguments);
    }

    model() {
        const record = this.store.peekRecord('graph', 1);
        const vertices = record.vertices.map(vertex => vertex.toJSON());
        const edges = record.edges.map(edge => edge.toJSON());

        return {
            editors: [ 'editor_1', 'editor_2', 'editor_3', 'editor_4', 'editor_5'],
            vertices: vertices,
            edges: edges
        };
    }
}
