/** @odoo-module **/

import { registry } from "@web/core/registry";
import { loadJS } from "@web/core/assets";
import { Component, onWillStart, useRef, onMounted, xml, useState } from "@odoo/owl";

class BadhabitsChart extends Component {
    setup() {
        this.chartRefs = {
            chart1: useRef("chart1"),
        };

        onWillStart(async () => {
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js");
        });

        this.state = useState({
            passed_xatlov: 60,
            not_passed_xatlov: 40,
        });

        onMounted(() => {
            this.renderChart();
        });
    }

    renderChart() {
        const ctx = this.chartRefs.chart1.el.getContext("2d");
        if (!ctx) return;

        const legendContainer = document.createElement('div');
        legendContainer.style.cssText = 'display: flex; justify-content: center; margin-top: 20px; gap: 30px;';
        this.chartRefs.chart1.el.parentNode.appendChild(legendContainer); // Changed to appendChild to put it below

        const labels = ["Fertil yoshidagilar", "Fertil bo'lmaganlar"];
        const colors = ['#28C48C', '#F74931'];

        labels.forEach((label, index) => {
            const item = document.createElement('label');
            item.style.cssText = 'display: flex; align-items: center; cursor: pointer; padding: 8px; border-radius: 4px;';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = true;
            checkbox.style.cssText = 'margin-right: 8px; cursor: pointer; width: 16px; height: 16px;';

            const colorBox = document.createElement('span');
            colorBox.style.cssText = `width: 16px; height: 16px; background: ${colors[index]}; margin-right: 8px; border-radius: 3px;`;

            const text = document.createElement('span');
            text.textContent = label;
            text.style.cssText = 'font-size: 14px;';

            item.appendChild(checkbox);
            item.appendChild(colorBox);
            item.appendChild(text);
            legendContainer.appendChild(item);

            checkbox.addEventListener('change', (e) => {
                const chart = this.chart;
                const datasetMeta = chart.getDatasetMeta(0);
                datasetMeta.data[index].hidden = !e.target.checked;
                chart.update();
            });
        });

        if (this.chart) {
            this.chart.destroy();
        }

        const totalValue = this.state.passed_xatlov + this.state.not_passed_xatlov;

        // Create new chart
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: [this.state.passed_xatlov, this.state.not_passed_xatlov],
                    backgroundColor: colors,
                    hoverBackgroundColor: colors,
                    borderWidth: 2,
                    borderRadius: 10,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '80%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}`;
                            }
                        }
                    }
                }
            },
            plugins: [{
                id: 'centerText',
                beforeDraw(chart) {
                    const { width, height, ctx } = chart;
                    ctx.save();
                    ctx.font = 'bold 26px Arial';
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = 'black';

                    ctx.fillText(totalValue.toLocaleString(), width / 2, height / 2 - 10);

                    ctx.font = '20px Arial';
                    ctx.fillStyle = 'gray';
                    ctx.fillText('nafar', width / 2, height / 2 + 20);

                    ctx.restore();
                }
            }]
        });
    }
}

BadhabitsChart.template = xml`
<t t-name="teach.PieChart">
    <div class="chart-container" style="position: relative; padding: 20px;">
        <div style="height: 300px; width: 100%;">
            <canvas t-ref="chart1"></canvas>
        </div>
    </div>
</t>
`;

registry.category("fields").add("PieChart", {
    component: BadhabitsChart,
});