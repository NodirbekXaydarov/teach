/** @odoo-module **/
import { registry } from "@web/core/registry";
import { loadJS } from "@web/core/assets";
import { Component, onWillStart, useRef, onMounted, xml, useState } from "@odoo/owl";

class AgeGroupChart extends Component {
    setup() {
        this.chartRefs = {
            chart1: useRef("chart1"),
        };

        onWillStart(async () => {
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js");
        });

        this.state = useState({
            ageGroupData: [50, 15, 10, 10, 15], // Adjust the data based on your requirements
            labels: [
                "0-15 yoshlar",
                "15-25 yoshlar",
                "25-40 yoshlar",
                "40-65 yoshlar",
                "65+ yoshlar",
            ],
            labelColors: [
                "#6A5ACD", // Color for 0-15 yoshlar
                "#1E90FF", // Color for 15-25 yoshlar
                "#32CD32", // Color for 25-40 yoshlar
                "#FFD700", // Color for 40-65 yoshlar
                "#FF6347", // Color for 65+ yoshlar
            ]
        });

        onMounted(() => {
            this.renderChart();
        });
    }

    renderChart() {
        const ctx = this.chartRefs.chart1.el.getContext("2d");

        new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: this.state.labels,
                datasets: [
                    {
                        data: this.state.ageGroupData,
                        backgroundColor: this.state.labelColors,
                        borderWidth: 1,
                        hoverBorderColor: '#fff',
                    },
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false, // Hide default legend
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.label}: ${context.raw}%`
                        }
                    }
                },
                scales: {
                    r: {
                        grid: { color: '#ddd' },
                        angleLines: { color: '#ddd' },
                        ticks: {
                            display: false // Hide radial scale ticks if not needed
                        },
                        pointLabels: {
                            color: '#666',
                            font: { size: 12 }
                        }
                    }
                }
            },
            plugins: [{
                id: 'customLegend',
                afterDraw: (chart) => {
                    const { ctx, data } = chart;
                    const fontSize = 14;
                    ctx.font = `${fontSize}px Arial`;
                    ctx.fillStyle = "#010D1D";
                    ctx.textAlign = "left";
                    ctx.textBaseline = "middle";

                    // Custom legend layout
                    data.labels.forEach((label, index) => {
                        const color = data.datasets[0].backgroundColor[index];
                        const value = data.datasets[0].data[index];
                        const y = 50 + index * 30; // Adjust vertical spacing

                        // Draw legend color box
                        ctx.fillStyle = color;
                        ctx.beginPath();
                        ctx.arc(20, y, 8, 0, 2 * Math.PI); // Circle for color
                        ctx.fill();

                        // Draw text
                        ctx.fillStyle = "#010D1D";
                        ctx.fillText(`${label}: ${value}%`, 40, y);
                    });
                }
            }]
        });
    }
}

AgeGroupChart.template = xml`
<t t-name="custom.AgeGroupChart">
    <div>
            <canvas t-ref="chart1"></canvas>
    </div>
</t>
`;





registry.category("fields").add("AgeChart", {
    component: AgeGroupChart,
});


