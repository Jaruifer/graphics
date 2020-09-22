import Component from '@ember/component';
import * as go from 'gojs';

/**
 * GoJs Diagram
 *
 * Usage:
 * ```
 * <Diagram
 *      id="diagram"
 *      class="diagram-content"
 *      vertices={{model.vertices}}
 *      edges={{model.edges}}
 *      grid={{false}}
 *      allowZoom={{true}}
 *      undoManager={{true}}
 *      changeSaveIcon={{action}}/>
 * ```
 * @property {string} id Id
 * @property {string} class Style
 * @property {Array} vertices Array of Vertex
 * @property {Array} edges Array of Edge
 * @property {boolean} grid Boolean to set or not the grid
 * @property {boolean} allowZoom Boolean to allow or not zoom
 * @property {boolean} undoManager Boolean to allow ctrl+z
 * @property {action} changeSaveIcon Action to notify that diagram has changed
 */
export default class Diagram extends Component {
    grid = false;
    allowZoom = false;
    undoManager = false;
    make = go.GraphObject.make;

    constructor() {
        super(...arguments);
    }

    /**
     * Building the diagram after the container is rendered
     */
    didInsertElement() {
        this.buildDiagram();
        this.addChangedListener();
        this.createContextMenu();
        this.defineNodeTemplate();
        this.defineLinkTemplate();
        this.addGraphLinksModel();
    }

    /**
     * BuildDiagram create a new diagram object with some
     * initial properties.
     */
    buildDiagram = () => {
        this.diagram = this.make(go.Diagram, this.id, {
            allowZoom: this.allowZoom,
            'grid.visible': this.grid,
            'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom,
            'undoManager.isEnabled': this.undoManager,
        });
    };

    /**
     * This function adds a listener when the diagram change and is set
     * when the initial animation finish. ChangeSaveIcon is the action
     * defined in the controller.
     */
    addChangedListener = () => {
        this.diagram.addDiagramListener('AnimationFinished', () => {
            this.diagram.addChangedListener(this.changeSaveIcon);
        });
    }

    /**
     * Creating the contextMenu for the diagram. Here there are several
     * options to create a menu. I created a goJs button with a handler
     * to manage the event click then the show/hide logic is managed
     * by goJs.
     *
     * Alternatively you can create your custom menu but it also requires
     * to manage the logic/events to show/hide the menu.
     */
    createContextMenu = () => {
        this.contextMenu = this.make('ContextMenu',
            this.make('ContextMenuButton',
                this.make(go.TextBlock, 'font size'), { click: this.onClickFontSize })
        );
    };

    /**
     * NodeTemplate definition. Here is defined the look and feel
     * of the diagram based on the model details. Also the context
     * menu is set on here plus the configuration for LinkingTool,
     * relinking and linkshifting
     *
     * Each node is represented by a shape and text.
     */
    defineNodeTemplate = () => {
        this.diagram.nodeTemplate = this.make(go.Node, 'Auto',
            { contextMenu: this.contextMenu },
            this.make(
                go.Shape,
                { portId: '', fromLinkable: true, toLinkable: true, fromSpot: go.Spot.AllSides, toSpot: go.Spot.AllSides },
                new go.Binding('stroke', 'stroke'),
                new go.Binding('figure', 'figure'),
                new go.Binding('fill', 'fill'),
                new go.Binding('width', 'width'),
                new go.Binding('margin', 'margin'),
                new go.Binding('height', 'height')
            ),
            this.make(
                go.TextBlock,
                new go.Binding('text', 'text'),
                new go.Binding('font', 'font'),
                new go.Binding('stroke', 'stroke')
            )
        );
    };

    /**
     * LinkTemplate definition. Here we can define the look and feel
     * of the edges, the context menu and the configuration for the
     * LinkingTool, relinking and linkshifting tools.
     *
     * Each link is represented by a shape, standard arrow, and a text
     */
    defineLinkTemplate = () => {
        this.diagram.linkTemplate = this.make(go.Link,
            { contextMenu: this.contextMenu },
            { reshapable: true, resegmentable: true, relinkableFrom: true, relinkableTo: true, adjusting: go.Link.Stretch },
            new go.Binding('points').makeTwoWay(),
            new go.Binding('fromSpot', 'fromSpot', go.Spot.parse).makeTwoWay(go.Spot.stringify),
            new go.Binding('toSpot', 'toSpot', go.Spot.parse).makeTwoWay(go.Spot.stringify),
            this.make(go.Shape),
            this.make(go.Shape, { toArrow: 'Standard', fill: 'lightblue' }),
            this.make(go.TextBlock, new go.Binding('text', 'text'), new go.Binding('font', 'font'))
        );
    };

    /**
     * Adding the model, vertices and edges, to the Graph/Diagram
     */
    addGraphLinksModel = () => {
        this.diagram.model = new go.GraphLinksModel(this.vertices, this.edges);
    };

    /**
     * Updating the diagram model with the new font size
     * This object can be a link or a node
     *
     * @param {Object} node The diagram target
     */
    updateFontSize = (node) => {
        const description = `update font ${node.fontSize}`;
        this.diagram.startTransaction(description);
        this.diagram.model.setDataProperty(node, 'font', `${node.fontSize}px ${node.fontFamily}`);
        this.diagram.commitTransaction(description);
    }

    /**
     * This function calculates the new font size for
     * nodes or links
     *
     * node *= 2
     * links /= 2
     *
     * @param {Event} event
     * @param {Object} obj
     */
    onClickFontSize = (event, obj) => {
        const part = obj.part.adornedPart;
        if (part instanceof go.Link) {
            part.data.fontSize /= 2;
        } else if (part instanceof go.Node) {
            part.data.fontSize *= 2;
        }; // TODO To be implemented when part instanceof go.Group
        this.updateFontSize(part.data);
    }
}
