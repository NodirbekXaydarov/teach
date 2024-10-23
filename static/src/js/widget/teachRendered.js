/** @odoo-module */

import {registry} from "@web/core/registry";
import {listView} from "@web/views/list/list_view";
import {ResCompany} from "./teachClass.js";

registry.category("views").add("ResCompanyInheritDashboard", {
  ...listView,
  Renderer: ResCompany
});
