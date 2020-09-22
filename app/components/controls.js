import Component from '@ember/component';

/**
 * Controls is a component with only one functionality
 * implemented that it is the saveIcon. We don't really
 * need this as a component but we may want to extend
 * the functionality later on.
 *
 * Usage
 * ```
 * <Controls diagramChanged={{diagramChanged}} />
 * ```
 * @property {boolean} diagramChanged Change the state
 */
export default class Controls extends Component {
    constructor() {
        super(...arguments)
    }
}
