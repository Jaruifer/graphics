import Controller from '@ember/controller';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';

/**
 * GraphController is the object responsable for the communication
 * among sibling components and other tasks. Any attributes or actions
 * that we want to share with components used on a Route could be
 * defined on the Controller
 *
 * The communication between SaveIcon and Diagram components is based on an attribute
 * named diagramChanged. Any time something changes in the diagram (selection,
 * position, colors, links, font, etc) this property is updated but also the template.
 *
 * Diagram component receives the @action function changeSaveIcon as a property on its definition
 * and this function is bound to the diagram change event listener.
 *
 * Debounce technique allow us to group multiple sequential call in a single one.
 */
export default class GraphController extends Controller {

    constructor() {
        super(...arguments);
        this.set('diagramChanged', false);
    }

    @action
    changeSaveIcon() {
        this.set('diagramChanged', true);
        debounce(this, this.offSave, 5000);
    }

    offSave = () => this.set('diagramChanged', false);
}
