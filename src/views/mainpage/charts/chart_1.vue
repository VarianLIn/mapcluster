<template>
    <div class="mainChart">
        <div id="mainChart"></div>
    </div>
</template>
<script>
/* eslint-disable no-undef */
/*eslint-disable no-unused-vars*/

export default {
    name: "",
    data() {
        return {};
    },
    mounted() {
        this.initChart();
    },
    methods: {
        initChart() {
            var echarts = require("echarts");
            var mychart = echarts.init(document.getElementById("mainChart"));
            var xData = ["a", "b", "c", "d", "e", "f", "g"];
            var days = [""];
            var data = [
                [0, 0, 5],
                [0, 1, 11],
                [0, 2, 3],
                [6, 3, 1],
                [6, 4, 2],
                [6, 5, 2],
                [6, 6, 6],
            ];
            var option = {
                tooltip: {},
                visualMap: {
                    show: false,
                    max: 15,
                    inRange: {
                        color: [
                            "#313695",
                            "#4575b4",
                            "#74add1",
                            "#abd9e9",
                            "#e0f3f8",
                            "#ffffbf",
                            "#fee090",
                            "#fdae61",
                            "#f46d43",
                            "#d73027",
                            "#a50026",
                        ],
                    },
                }, //图例
                xAxis3D: {
                    name: "x",
                    nameGap: 1,
                    type: "category",
                    data: xData,
                },
                yAxis3D: {
                    name: "",
                    type: "category",
                    data: days,
                },
                zAxis3D: {
                    name: "",
                    type: "value",
                },
                grid3D: {
                    show: false,
                    environment: "#998866",
                    boxWidth: 200,
                    boxDepth: 20,
                    // light: {
                    //     main: {
                    //         intensity: 1.2,
                    //         shadow: true,
                    //     },
                    //     ambient: {
                    //         intensity: 0.3,
                    //     },
                    // },
                    viewControl: {
                        alpha: 0,
                        beta: 0,
                        rotateSensitivity: 0,
                    },
                },
                series: [
                    {
                        type: "bar3D",
                        data: data.map(function (item) {
                            return {
                                value: [item[1], item[0], item[2]],
                            };
                        }),
                        shading: "lambert", // 'color','lambert','realistic'
                        label: {
                            textStyle: {
                                fontSize: 16,
                                borderWidth: 1,
                            },
                        }, // 柱子的标签配置。
                        emphasis: {
                            label: {
                                textStyle: {
                                    fontSize: 20,
                                },
                            },
                        }, // 柱子高亮状态的标签和样式配置。
                        // bevelSmoothness: 500,
                        // bevelSize: 1,
                    },
                ],
            };
            mychart.setOption(option);
        },
    },
};
</script>
<style lang="less">
#mainChart {
    height: 500px;
    width: 800px;
    margin: 0 auto;
    background-color: #aaa;
}
</style>