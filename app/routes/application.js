import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { nodes, links } from '../models/data/example';

/**
 * Application route is the top-most route in the route
 * hierarchy and its model hook gets called once when the
 * application starts up. Here is the proper spot to preload
 * some data when the app boots for the first time.
 *
 * The data is provided by models/data/example.js that contains the
 * detail of the diagram. The relationship among nodes and edges
 * is set at the table graph.
 *
 * Again the store is injected via annotations.
 */
export default class ApplicationRoute extends Route {
    @service store;

    constructor() {
        super(...arguments);
    }

    init() {
        nodes.forEach((node) => {
            this.store.push({
                data: {
                    id: node.key,
                    type: 'vertex',
                    attributes: node,
                    relationships: {
                        edges: {
                            data: [{ type: 'edge', id: node.key }],
                        },
                    },
                },
            });
        });
        links.forEach((link, index) => {
            this.store.push({
                data: {
                    id: ++index,
                    type: 'edge',
                    attributes: link,
                },
            });
        });
        this.store.push({
            data: [
                {
                    id: 1,
                    type: 'graph',
                    attributes: {
                        name: 'example',
                    },
                    relationships: {
                        vertices: {
                            data: [
                                { type: 'vertex', id: 1 },
                                { type: 'vertex', id: 2 },
                                { type: 'vertex', id: 3 },
                                { type: 'vertex', id: 4 },
                                { type: 'vertex', id: 5 },
                                { type: 'vertex', id: 6 },
                            ],
                        },
                        edges: {
                            data: [
                                { type: 'edge', id: 1 },
                                { type: 'edge', id: 2 },
                                { type: 'edge', id: 3 },
                                { type: 'edge', id: 4 },
                                { type: 'edge', id: 5 },
                                { type: 'edge', id: 6 },
                            ],
                        },
                    },
                },
            ],
        });
    }
}
