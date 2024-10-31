/** @odoo-module **/
import { registry } from "@web/core/registry";
import { Component, onMounted, useRef } from "@odoo/owl";

class MapChart extends Component {
    setup() {
        this.root = useRef("root");
        onMounted(() => {
            this.initializeMap();
        });
    }

    initializeMap() {
        const container = this.root.el;
        const regions = container.querySelectorAll(".region");
        const infoBox = container.querySelector(".info-box");
        document.body.appendChild(infoBox);
        const handleMouseOver = (e) => {
            const name = e.target.getAttribute("data-name");
            infoBox.textContent = name;
            infoBox.style.cssText = `
                display: block;
                position: fixed;
                left: ${e.clientX + 10}px;
                top: ${e.clientY + 10}px;
                background: white;
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                z-index: 9999;
                pointer-events: none;
            `;
        };

        const handleMouseOut = () => {
            infoBox.style.display = "none";
        };

        const handleMouseMove = (e) => {
            infoBox.style.left = (e.clientX + 10) + "px";
            infoBox.style.top = (e.clientY + 10) + "px";
        };

        regions.forEach(region => {
            region.addEventListener("mouseover", handleMouseOver);
            region.addEventListener("mouseout", handleMouseOut);
            region.addEventListener("mousemove", handleMouseMove);
        });
    }
}

MapChart.template = 'teach.MapChart';
registry.category("fields").add("MapChart", {
    component: MapChart,
});