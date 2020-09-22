import Component from '@ember/component';

/**
 * Summernote Component displays the editor under the diagram.
 * The number of editors depends on the number of containers with
 * class .summerNote inside the template. Editors is defined in the
 * controller and passed to the component as a property.
 *
 * Usage
 * ```
 * <Summernote
 *      class="some_class"
 *      editors={{editors}}
 *      placeholder="some text" />
 * ```
 * Editor's height is adapted to the content by default and width is
 * defined by its parent container to 100%
 *
 * @property {string[]} editors Number of editors
 * @property {string} placeholder Default editor text
 */
export default class SummernoteComponent extends Component {
    constructor() {
        super(...arguments);
        this.summernote = {};
    }

    onChange = (event) => {}

    didInsertElement() {
        const editor = this.element.querySelectorAll('.summerNote');
        this.summernote = this.$(editor).summernote({
            placeholder: this.placeholder,
            callbacks: {
                onChange: this.onChange,
            }
        });
    }
}
