/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, onWillUpdateProps} from "@odoo/owl";

class GenderWidget extends Component {
    handleChange(event) {
        const newValue = event.target.value;
        this.props.record.update({ [this.props.name]: newValue });
    }

    get value() {
        return this.props.record.data[this.props.name];
    }
}

GenderWidget.template = 'input_mask.GenderWidgetTemplate';

registry.category("fields").add("gender_radio", {
    component: GenderWidget,
});
