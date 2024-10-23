/** @odoo-module */

import {registry} from "@web/core/registry";
import {listView} from "@web/views/list/list_view";
import {TeachStudent} from "@teach/js/widget/studentClass";

registry.category("views").add("ResCompanyInheritDashboard", {
  ...listView,
  Renderer: TeachStudent
});
