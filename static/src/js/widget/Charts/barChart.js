/** @odoo-module **/

import { registry } from "@web/core/registry";
import { loadJS } from "@web/core/assets";
import { Component, onWillStart, useRef, onMounted, xml } from "@odoo/owl";

class BarChart extends Component {
    setup() {
        this.chartRef = useRef("chart");

        onWillStart(async () => {
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js");
        });

        onMounted(() => {
            this.renderChart();
        });
    }

    renderChart() {
        const ctx = this.chartRef.el.getContext('2d');
        if (!ctx) {
            console.error("Chart element not found!");
            return;
        }

        const data = {
            labels: ['85+', '80-84', '75-79', '70-74', '65-69', '60-64', '55-59', '50-54', '45-49',
                     '40-44', '35-39', '30-34', '25-29', '20-24', '15-19', '10-14', '5-9', '0-4'],
            datasets: [
                {
                    label: 'Amaliy sog\'lom (Males)',
                    data: [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1],
                    backgroundColor: '#00C851',
                    borderRadius: 10,
                    borderSkipped: false
                },
                {
                    label: 'Amaliy sog\'lom (Females)',
                    data: [-0.1, -0.2, -0.25, -0.3, -0.4, -0.5, -0.6, -0.7, -0.8, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1],
                    backgroundColor: '#00C851',
                    borderRadius: 10,
                    borderSkipped: false
                },
                {
                    label: 'Past xavf (Males)',
                    data: [0.3, 0.4, 0.5, 0.6, 0.8, 1.0, 1.2, 1.3, 1.4, 1.5, 1.4, 1.3, 1.2, 1.1, 1.0, 0.8, 0.6, 0.4],
                    backgroundColor: '#FFEB3B',
                    borderRadius: 10,
                    borderSkipped: false
                },
                {
                    label: 'Past xavf (Females)',
                    data: [-0.3, -0.4, -0.5, -0.6, -0.8, -1.0, -1.2, -1.3, -1.4, -1.5, -1.4, -1.3, -1.2, -1.1, -1.0, -0.8, -0.6, -0.4],
                    backgroundColor: '#FFEB3B',
                    borderRadius: 10,
                    borderSkipped: false
                },
                {
                    label: 'O\'rta xavf (Males)',
                    data: [0.2, 0.3, 0.35, 0.4, 0.5, 0.7, 0.9, 1.0, 1.1, 1.2, 1.1, 1.0, 0.9, 0.8, 0.7, 0.6, 0.4, 0.3],
                    backgroundColor: '#FF9100',
                    borderRadius: 10,
                    borderSkipped: false
                },
                {
                    label: 'O\'rta xavf (Females)',
                    data: [-0.2, -0.3, -0.35, -0.4, -0.5, -0.7, -0.9, -1.0, -1.1, -1.2, -1.1, -1.0, -0.9, -0.8, -0.7, -0.6, -0.4, -0.3],
                    backgroundColor: '#FF9100',
                    borderRadius: 10,
                    borderSkipped: false
                },
                {
                    label: 'Yuqori xavf (Males)',
                    data: [0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.15, 0.1],
                    backgroundColor: '#FF4444',
                    borderRadius: 10,
                    borderSkipped: false
                },
                {
                    label: 'Yuqori xavf (Females)',
                    data: [-0.1, -0.15, -0.2, -0.25, -0.3, -0.4, -0.5, -0.6, -0.7, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.15, -0.1],
                    backgroundColor: '#FF4444',
                    borderRadius: 10,
                    borderSkipped: false
                }
            ]
        };

        const options = {
            indexAxis: 'y',
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Percent'
                    },
                    ticks: {
                        callback: function(value) {
                            return Math.abs(value) + '%';
                        }
                    }
                },
                y: {
                    stacked: true,
                    reverse: true
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return Math.abs(context.raw) + '%';
                        }
                    }
                },
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Aholining taqsimlanishi',
                    align: 'left',
                }
            },
            barPercentage: 0.9,
           categoryPercentage: 0.8,
        };

        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    }
}

BarChart.template = xml`
<t t-name="teach.FourChart">
        <canvas id="chart" t-ref="chart"></canvas>
</t>
`;



registry.category("fields").add("BarChart", {
    component: BarChart,
});