/** @odoo-module **/

import {registry} from "@web/core/registry";
import {Component, useState, onWillStart} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";


class GetTeacher extends Component {
    setup() {
        this.rpc = useService("rpc");
        this.state = useState({teachers: []});
        onWillStart(async () => {
            const result = await this.rpc("/teacher", {});
            if (result.success) {
                this.state.teachers = result.data;
            }
        });
    }


}

GetTeacher.template = 'teach.get_teacher';

registry.category("fields").add("get_teacher", {
    component: GetTeacher,
});
