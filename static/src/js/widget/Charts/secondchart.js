// /** @odoo-module **/
//
// import {registry} from "@web/core/registry";
// import {loadJS} from "@web/core/assets";
// import {Component, onWillStart, useRef, onMounted, useState, xml} from "@odoo/owl";
//
// class SecondChart extends Component {
//
//     setup() {
//         this.chartRef = useRef("chart");
//         this.state = useState({view: 'month'}); // Initial view is set to 'month'
//
//         onWillStart(async () => {
//             await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js");
//         });
//
//         onMounted(() => {
//             this.renderChart();
//         });
//     }
//
//     get chartData() {
//         return this.state.view === 'month'
//             ? {
//                 labels: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05', '2024-10-06', '2024-10-07'],
//                 data: [1200, 2300, 3100, 2500, 4700, 2800, 1500]
//             }
//             : {
//                 labels: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'],
//                 data: [600, 800, 1100, 1500, 1300, 1400, 1600]
//             };
//     }
//
//     renderChart() {
//         const ctx = this.chartRef.el.getContext("2d");
//
//         const gradient = ctx.createLinearGradient(0, 0, 0, 400);
//         gradient.addColorStop(0, 'rgba(0, 123, 255, 0.4)');
//         gradient.addColorStop(1, 'rgba(0, 123, 255, 0)');
//
//         this.chart = new Chart(ctx, {
//             type: 'line',
//             data: {
//                 labels: this.chartData.labels,
//                 datasets: [{
//                     label: 'Patients',
//                     data: this.chartData.data,
//                     fill: true,
//                     backgroundColor: gradient,
//                     borderColor: '#007BFF',
//                     pointBackgroundColor: '#fff', // White inner color
//                     pointBorderColor: '#007BFF', // Blue border color
//                     pointBorderWidth: 3, // Border width for the points
//                     pointRadius: 6, // Increase radius for larger points
//                     pointHoverRadius: 7, // Slightly larger on hover
//                     tension: 0.4
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     legend: {display: false},
//                     tooltip: {
//                         enabled: false, // Disable default tooltip
//                         external: (context) => this.customTooltip(context)
//                     }
//                 },
//                 scales: {
//                     x: {grid: {display: true}},
//                     y: {
//                         beginAtZero: true,
//                         max: 5000,
//                         ticks: {
//                             stepSize: 1000,
//                             callback: (value) => value.toLocaleString(),
//                         }
//                     }
//                 }
//             }
//         });
//     }
//
//     customTooltip(context) {
//         const tooltipEl = document.getElementById('custom-tooltip');
//
//         // Create tooltip element if it doesn’t exist
//         if (!tooltipEl) {
//             const tooltip = document.createElement('div');
//             tooltip.id = 'custom-tooltip';
//             tooltip.style.position = 'absolute';
//             tooltip.style.background = 'white';
//             tooltip.style.border = '1px solid #007BFF';
//             tooltip.style.borderRadius = '8px';
//             tooltip.style.padding = '10px';
//             tooltip.style.pointerEvents = 'none';
//             tooltip.style.color = '#007BFF';
//             tooltip.style.textAlign = 'center';
//             tooltip.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)';
//             document.body.appendChild(tooltip);
//         }
//
//         const tooltip = document.getElementById('custom-tooltip');
//
//         // Hide the tooltip if there are no active points
//         if (context.tooltip.opacity === 0) {
//             tooltip.style.opacity = 0;
//             return;
//         }
//         const dayNames = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'];
//         // Set tooltip text
//         if (context.tooltip.dataPoints) {
//             const dataPoint = context.tooltip.dataPoints[0]; // Get the first data point
//             const index = dataPoint.dataIndex; // Get the index from the data point
//             const value = dataPoint.formattedValue;
//
//             const formattedDate = this.state.view === 'month'
//                 ? dataPoint.label.split('-').reverse().join('.') // Converts YYYY-MM-DD to DD.MM.YYYY
//                 : dayNames[index]; // Use day names directly in 'week' view
//
//             tooltip.innerHTML = `<strong>${value} ta bemor</strong><br><span style="color: #6c757d;">${formattedDate}</span>`;
//         }
//
//         // Position tooltip
//         const position = context.chart.canvas.getBoundingClientRect();
//         tooltip.style.opacity = 1;
//         tooltip.style.left = position.left + window.pageXOffset + context.tooltip.caretX - tooltip.offsetWidth / 2 + 'px';
//         tooltip.style.top = position.top + window.pageYOffset + context.tooltip.caretY - tooltip.offsetHeight - 10 + 'px';
//     }
//
//     updateChart() {
//         this.chart.data.labels = this.chartData.labels;
//         this.chart.data.datasets[0].data = this.chartData.data;
//         this.chart.update();
//     }
//
//     switchView(view) {
//         this.state.view = view;
//         this.updateChart();
//     }
// }
//
// SecondChart.template = xml`
// <t t-name="teach.Secondchart">
//     <div style="width:98%" class="tw-bg-white tw-p-[20px] tw-rounded-[16px]">
//         <h2>Bemorlar o‘sish grafigi</h2>
//         <div class="tw-flex tw-justify-end tw-mb-2">
//             <button t-on-click="() => this.switchView('month')"
//                     class="tw-px-4 tw-py-2 tw-mx-2"
//                     t-att-class="{'tw-bg-blue-500 tw-text-white': state.view === 'month', 'tw-bg-gray-200': state.view !== 'month'}">
//                 Oy
//             </button>
//             <button t-on-click="() => this.switchView('week')"
//                     class="tw-px-4 tw-py-2 tw-mx-2"
//                     t-att-class="{'tw-bg-blue-500 tw-text-white': state.view === 'week', 'tw-bg-gray-200': state.view !== 'week'}">
//                 Hafta
//             </button>
//         </div>
//         <div>
//             <canvas t-ref="chart" ></canvas>
//         </div>
//     </div>
// </t>
// `;
//
//
// registry.category("fields").add("Secondchart", {
//     component: SecondChart,
// });