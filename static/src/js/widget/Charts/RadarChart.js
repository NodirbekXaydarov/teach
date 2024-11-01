/** @odoo-module **/

import { registry } from "@web/core/registry";
import { loadJS } from "@web/core/assets";
import { Component, onWillStart, useRef, onMounted, xml, useState } from "@odoo/owl";

class LifestyleComparisonChart extends Component {
    setup() {
        this.chartRefs = {
            chart1: useRef("chart1"),
        };

        onWillStart(async () => {
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js");
        });

        this.state = useState({
            menData: [65, 59, 80, 81, 56, 55, 40],
            womenData: [28, 48, 40, 19, 86, 27, 90],
            labels: [
                ["Alkogol", "iste'mol qiluvchilar"],
                ["Tamaki", "chekuvchilar"],
                ["Oziq-ovqat", "Sabzavotlar"],
                ["Oziq-ovqat", "Shirinliklar"],
                ["Oziq-ovqat", "Yog'li ovqatlar"],
                ["Oziq-ovqat", "Sho'r ovqatlar"],
                ["Sport bilan", "shug‘ullanuvchilar"]
            ],
            labelColors: [
                "#FFD700", // Color for "Alkogol iste'mol qiluvchilar"
                "#FF6347", // Color for "Tamaki chekuvchilar"
                "#3CB371", // Color for "Sabzavotlar"
                "#FF69B4", // Color for "Shirinliklar"
                "#8A2BE2", // Color for "Yog'li ovqatlar"
                "#1E90FF", // Color for "Sho'r ovqatlar"
                "#FFA500"  // Color for "Sport bilan shug‘ullanuvchilar"
            ]
        });

        onMounted(() => {
            this.renderChart();
        });
    }

    renderChart() {
        const ctx = this.chartRefs.chart1.el.getContext("2d");

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: this.state.labels,
                datasets: [
                    {
                        label: 'Erkaklar',
                        data: this.state.menData,
                        backgroundColor: 'rgba(40, 196, 140, 0.2)',
                        borderColor: '#28C48C',
                        pointBackgroundColor: '#28C48C',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#28C48C',
                    },
                    {
                        label: 'Ayollar',
                        data: this.state.womenData,
                        backgroundColor: 'rgba(247, 73, 49, 0.2)',
                        borderColor: '#F74931',
                        pointBackgroundColor: '#F74931',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#F74931',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#010D1D',
                            font: {
                                size: 14,
                                weight: 500,
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.dataset.label}: ${context.raw}%`
                        }
                    }
                },
                scales: {
                    r: {
                        angleLines: { color: '#ddd' },
                        grid: { color: '#ddd' },
                        ticks: {
                            display: false
                        },
                        pointLabels: {
                            color: '#666',
                            font: { size: 12 }
                        }
                    }
                }
            },
            plugins: [{
                id: 'labelDots',
                beforeDraw: (chart) => {
                    const { ctx, scales: { r } } = chart;

                    // Calculate coordinates for each label
                    const labelCoords = chart.config.data.labels.map((label, index) => {
                        const angle = r.getIndexAngle(index) - Math.PI / 2;

                        // Calculate position slightly closer to the center for the dot (below the label)
                        const x = r.xCenter + Math.cos(angle) * (r.drawingArea + 30); // Move dot slightly inward
                        const y = r.yCenter + Math.sin(angle) * (r.drawingArea + 0); // Move dot slightly inward
                        return { x, y };
                    });

                    // Draw dots below each label
                    labelCoords.forEach((coord, index) => {
                        ctx.fillStyle = this.state.labelColors[index];
                        ctx.beginPath();
                        ctx.arc(coord.x, coord.y, 4, 0, 2 * Math.PI); // Dot size of 4
                        ctx.fill();
                    });
                }
            }]
        });
    }
}

LifestyleComparisonChart.template = xml`
<t t-name="teach.LifestyleComparisonChart">
    <div>
      <canvas t-ref="chart1"></canvas>
    </div>
</t>
`;









registry.category("fields").add("RadarChart", {
    component: LifestyleComparisonChart,
});