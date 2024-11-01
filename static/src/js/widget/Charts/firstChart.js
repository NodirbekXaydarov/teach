/** @odoo-module **/


import {registry} from "@web/core/registry";

import {loadJS} from "@web/core/assets";

import {Component, onWillStart, useRef, onMounted} from "@odoo/owl";


class FirstChart extends Component {

    setup() {

        this.chartRef = useRef("chart");


        onWillStart(async () => {
            await loadJS("https://cdn.jsdelivr.net/npm/apexcharts");
        });
        onMounted(() => {
            this.renderChart();
        });
    }


    renderChart() {

        const options = {

            series: [{
                data: [
                    {x: 'New Delhi', y: 218},
                    {x: 'Kolkata', y: 149},
                    {x: 'Mumbai', y: 184},
                    {x: 'Ahmedabad', y: 55},
                    {x: 'Bangaluru', y: 84},
                    {x: 'Pune', y: 31},
                    {x: 'Chennai', y: 70},
                    {x: 'Jaipur', y: 30},
                    {x: 'Surat', y: 44},
                    {x: 'Hyderabad', y: 68},
                    {x: 'Lucknow', y: 28},
                    {x: 'Indore', y: 19},
                    {x: 'Kanpur', y: 29}
                ]

            }],

            legend: {
                show: false
            },

            chart: {
                height: 350,
                type: 'treemap'
            },

            title: {
                text: 'Distributed Treemap',
                align: 'left',
            },

            colors: [

                '#3B93A5', '#F7B844', '#ADD8C7', '#EC3C65', '#CDD7B6',

                '#C1F666', '#D43F97', '#1E5D8C', '#421243', '#7F94B0',

                '#EF6537', '#C0ADDB'

            ],

            plotOptions: {

                treemap: {

                    distributed: true,

                    enableShades: false

                }

            }

        };


        const chart = new ApexCharts(this.chartRef.el, options);

        chart.render();

    }
}

FirstChart.template = 'teach.FirstChart';


registry.category("fields").add("firstChart", {
    component: FirstChart,
});