<template>
    <div class="minage" id="minage" :style="mapHeight"></div>
</template>
<script>
/* eslint-disable no-undef */
/*eslint-disable no-unused-vars*/
import {
    getMapSize,
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
            mapHeight: {
                height: "",
            },
        };
    },
    computed: {},
    created() {
        this.mapHeight.height = getMapSize();
    },
    mounted() {
        map = initMap("minage", this.magfg);
        initMapopera(map, this.magfg.lnglatlv);
        this.minagtion();
        this.minagtion_25d();
    },
    methods: {
        minagtion() {
            // axios 网络请求
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
                var planePath = "image://static/jpg/虫.png";
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
        minagtion_25d(){
            // debugger
            var threebox = new GeoGlobe.Visuals.Three();
            //添加到地图中
            threebox.addTo(map);
            // //绑定鼠标点击事件
            // threebox.on('overlayerclick', function(e) {
            //     var xyz = threebox.unprojectFromWorld(
            //         e.param.pickedInfos[0].point
            //     );
            //     alert(
            //         e.param.info.userData.attributes.OriginalData.properties
            //             .name +
            //             '\n经纬度及高程:' +
            //             xyz
            //     );
            //     console.info(e);
            // });
            // //绑定鼠标移动事件
            // threebox.on('overlayerhover', function(e) {
            //     console.info(e);
            // });
            //构造三维弧线图层
            var curveLayer = new GeoGlobe.Visuals.Three.CurveLayer({
                id: "3D curve",
                data: [
                    {
                        type: "Feature",
                        properties: {
                            name: "1->2",
                            width: 30,
                            curveness: 0.5,
                            color: "yellow",
                        },
                        geometry: {
                            type: "LineString",
                            coordinates: [
                                [116.72290857865096, 28.61584435027592],
                                [119.99930055779294, 28.639465368802078],
                            ],
                        },
                    },
                ],
                // texture:
                // "http://172.17.0.148:8080/proxy/ProxyHandler?url=http://192.168.42.50:8888/geomap-api/JsCodeDemo_new/images/lensflare.png",
                visible: true,
            });
            //添加到THREE图层
            curveLayer.addTo(threebox);
            //绘制
            threebox.render();
            console.log(map._visuals)
        }

    
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
