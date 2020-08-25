<template>
    <div class="minage" id="minage" :style="pageSize"></div>
</template>
<script>
/* eslint-disable no-undef */
/*eslint-disable no-unused-vars*/
import {
    initMap,
    initMapopera,
    addFeatureLayer,
    createPopupDom,
    markerDom,
    convertData,
} from "../../../render.js";

let map = null;

export default {
    name: "",
    data() {
        return {
            magfg: {
                isTDT: false,
                host: window.location.host,
                projectName: window.location.pathname.split("/")[1],
                style: {
                    version: 8,
                    sources: {
                        cartodb: {
                            type: "raster",
                            tiles: [
                                "http://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
                            ],
                            tileSize: 256,
                        },
                    },
                    layers: [
                        {
                            id: "1",
                            type: "raster",
                            source: "cartodb",
                        },
                    ],
                },
                lnglatlv: { lng: 114.345, lat: 30.675, lv: 9 },
            },
            pageSize: {
                height: "",
            },
        };
    },
    computed: {},
    created() {
        this.getSize();
    },
    mounted() {
        // map = null;
        map = initMap("minage", this.magfg);
        initMapopera(map, this.magfg.lnglatlv);
        this.minagtion();
    },
    methods: {
        getSize() {
            this.pageSize.height = window.innerHeight + "px";
        },

        minagtion() {
            this.$http({
                url: "static/json/minage.json",
                method: "get",
            }).then(({ data }) => {
                let migData = data[1].data;
                let geoData = data[0].data;

                var convertData = function (cdata) {
                    var res = [];
                    for (var i = 0; i < cdata.length; i++) {
                        var dataItem = cdata[i];
                        var fromCoord = geoData[dataItem[0].name];
                        var toCoord = geoData[dataItem[1].name];
                        if (fromCoord && toCoord) {
                            // res.push([
                            //     {
                            //         coord: fromCoord,
                            //     },
                            //     {
                            //         coord: toCoord,
                            //     },
                            // ]);
                            res.push({
                                fromName: dataItem[0].name,
                                toName: dataItem[1].name,
                                coords: [fromCoord, toCoord],
                            });
                        }
                    }
                    return res;
                }; //converdata

                var series = [];
                var planePath = "";
                series.push(
                    {
                        name: "t1",
                        coordinateSystem: "GLMap",
                        type: "lines",
                        zlevel: 1,
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0.7,
                            color: "#fff",
                            symbolSize: 3,
                        },
                        lineStyle: {
                            normal: {
                                color: "#a6c84c",
                                width: 0,
                                curveness: 0.2,
                            },
                        },
                        data: convertData(migData),
                    },
                    {
                        name: "t1",
                        coordinateSystem: "GLMap",
                        type: "lines",
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0,
                            symbol: planePath,
                            symbolSize: 15,
                        },
                        lineStyle: {
                            normal: {
                                color: "#a6c84c",
                                width: 1,
                                opacity: 0.4,
                                curveness: 0.2,
                            },
                        },
                        data: convertData(migData),
                    },
                    {
                        name: "t1",
                        type: "effectScatter",
                        coordinateSystem: "GLMap",
                        zlevel: 2,
                        rippleEffect: {
                            brushType: "stroke",
                        },
                        label: {
                            normal: {
                                show: true,
                                position: "right",
                                formatter: "{b}",
                            },
                        },
                        symbolSize: function (val) {
                            return val[2] / 8;
                        },
                        itemStyle: {
                            normal: {
                                color: "#a6c84c",
                            },
                        },
                        data: migData.map(function (dataItem) {
                            return {
                                name: dataItem[1].name,
                                value: geoData[dataItem[1].name].concat([
                                    dataItem[1].value,
                                ]),
                            };
                        }),
                    }
                ); // series
                // console.log(series);

                let option = {
                    GLMap: {
                        roam: true,
                    },
                    coordinateSystem: "GLMap",
                    title: {},
                    tooltip: {
                        trigger: "item",
                    },
                    legend: {},
                    geo: {
                        map: "GLMap",
                        label: {
                            emphasis: {
                                show: false,
                            },
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: "#323c48",
                                borderColor: "#404a59",
                            },
                            emphasis: {
                                areaColor: "#2a333d",
                            },
                        },
                    },
                    series: series,
                };

                var echartslayer = new EchartsLayer(map);
                echartslayer.chart.setOption(option);
            }); // $http
        },
    }, //methods
};
</script>
<style lang="less">
#minage {
    /* height: 900px; */
    width: 100%;
    background: cornsilk;
    margin: 0 auto;
    position: relative;
}
