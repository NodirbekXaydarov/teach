/** @odoo-module **/
import { registry } from "@web/core/registry";
import { loadJS } from "@web/core/assets";
import { Component, onWillStart, useRef, onMounted, xml } from "@odoo/owl";

class ThirdChart extends Component {
    setup() {
        this.chartRef = useRef("barchart");

        onWillStart(async () => {
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js");
            await loadJS("https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/2.0.0/chartjs-plugin-datalabels.min.js");
        });

        onMounted(() => {
            this.renderChart();
        });
    }

    renderChart() {
        const ctx = this.chartRef.el.getContext("2d");

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    "Sil kasalliklari", "Ruxiyat va xulq-atvor", "Xavfli o'sma kasalliklari",
                    "Asab tizimi kasalliklari", "Siydik tizimi kasalliklari", "Endokrin tizim",
                    "Qon aylanish tizimi", "Suyak va mushak tizimi", "Qon va qon yaratish a'zolari",
                    "Nafas olish a'zolari", "Perinatal davri holatlar", "Boshqa kasalliklar"
                ],
                datasets: [
                    {
                        label: "Erkaklar",
                        data: [88000, 19000, 42000, 58000, 18000, 16000, 20000, 96000, 20000, 60000, 81000, 94000],
                        backgroundColor: "#007BFF", // Blue color
                        borderRadius: 5,
                    },
                    {
                        label: "Ayollar",
                        data: [91000, 31000, 53000, 41000, 60000, 20000, 14000, 53000, 20000, 38000, 112000, 96000],
                        backgroundColor: "#FF00FF", // Pink color
                        borderRadius: 5,
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: '#6c757d' // Gray color for legend text
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let value = context.raw.toLocaleString();
                                return `${value} bemorlar`;
                            }
                        }
                    },
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        color: '#6c757d',
                        font: {
                            weight: 'bold'
                        },
                        formatter: (value) => value.toLocaleString(), // Format values with commas
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#6c757d', // Gray color for x-axis labels
                            autoSkip: false, // Prevent skipping labels
                            maxRotation: 0, // Prevent label rotation
                            callback: function(value, index) {
                                const label = this.getLabelForValue(value);
                                if (typeof label === "string") {
                                    const words = label.split(" ");
                                    return words.length > 1 ? words : label;
                                }
                                return label;
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            borderDash: [5, 5], // Dashed grid lines
                            color: '#e7e7e7'
                        },
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString(); // Format values with commas
                            },
                            color: '#6c757d'
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    }
}

ThirdChart.template = xml`
    <t t-name="teach.ThirdChart">
        <div>
            <h2>Kasalliklar solishtiruv grafigi</h2>
                <canvas  t-ref="barchart"></canvas>
        </div>
    </t>
`;






registry.category("fields").add("BarDisease", {
    component: ThirdChart,
});


