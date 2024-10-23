/** @odoo-module */

import {ListRenderer} from "@web/views/list/list_renderer";
import {useService} from "@web/core/utils/hooks";

export class ResCompany extends ListRenderer {
  setup() {
    super.setup();
    this.action = useService("action");
    this.orm = useService("orm");
  }
}

ResCompany.template = "style_timetable.resCompany";
