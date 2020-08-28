<template>
    <div id="ggMinage" class="ggMinage" :style="mapSize"></div>
</template>
<script>
/* eslint-disable no-undef */
/*eslint-disable no-unused-vars*/
import { getMapSize, initMap } from "../../../render";
let map = null;
let custom = null;
export default {
    name: "",
    data() {
        return {
            mapSize: {
                height: "",
            },
            mapCfg: {
                isTDT: false,
                host: window.location.host,
                projectName: window.location.pathname.split("/")[1],
                style: {
                    version: 8,
                    sources: {
                        cartodb: {
                            type: "raster",
                            tiles: [
                                "http://b.basemaps.cartocdn.com/spotify_dark/{z}/{x}/{y}.png",
                                // "http://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
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
                lnglatlv: { lng: 114.345, lat: 30.675, lv: 4 },
            },
        };
    },
    created() {
        this.mapSize.height = getMapSize();
    },
    mounted() {
        map = initMap("ggMinage", this.mapCfg);
        this.initMinage();
    },
    methods: {
        initMinage() {
            //构造可视化定制图层
            var custom = new GeoGlobe.Visuals.Custom();
            //绑定鼠标移动事件
            custom.on("overlayerhover", function (e) {
                console.info(e);
            });
            custom.addTo(map);
            console.log(custom);

            var result = require("../../../../public/static/json/ggMinage.json");
            var data = [];
            var mectorData = [];
            for (var i = 0; i < result.features.length; i++) {
                mectorData.push(result.features[i].attributes["经度"]);
                mectorData.push(result.features[i].attributes["纬度"]);
                var featrue = {
                    type: "Feature",
                    properties: {
                        name: result.features[i].attributes["省"],
                        value: parseInt(
                            result.features[i].attributes["统计数"]
                        ),
                    },
                    geometry: {
                        type: "Point",
                        coordinates: GeoGlobe.Util.transferToLonLat(mectorData),
                    },
                    itemStyle: null,
                    label: null,
                    emphasis: null,
                };
                data.push(featrue);
                mectorData = [];
            }
            var migration = new GeoGlobe.Visuals.Custom.Migration({
                id: "migration_1",
                visibility: true,
                direction: "out",
                location: {
                    name: "香港特别行政区",
                    lonLat: [114.12694391453464, 22.380716926328258],
                },
                data: data,
                rendererOptions: {
                    markLine: {
                        hoverable: true,
                        curveness: 0.6,
                        effect: {
                            color: "#fff",
                            scaleSize: 3,
                            period: 25,
                        },
                        itemStyle: {
                            color: null,
                            width: 1,
                            dash: [5, 5],
                        },
                    },
                    markPoint: {
                        nameField: "name",
                        valueField: "value",
                        hoverable: true,
                        symbol: "emptyCircle",
                        symbolMinSize: 20,
                        symbolMaxSize: 40,
                        effect: {
                            scaleSize: 3,
                            period: 20,
                        },
                        itemStyle: {
                            color: {
                                "0": "rgba(58, 200, 0, 0.5)",
                                "0.5": "rgba(243, 255, 0, 0.5)",
                                "1": "rgba(255, 20, 0, 0.5)",
                            }, //"rgba(255,0,0,0.5)",
                            shadowColor: "#000000",
                            shadowBlur: 0,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                        },
                        label: {
                            show: true,
                            color: "#fff",
                            align: "center",
                            baseline: "middle",
                            fontFamily: "serif",
                            fontSize: 12,
                            fontStyle: "normal",
                            fontWeight: "normal",
                        },
                    },
                    tooltip: {
                        show: true,
                        backgroundColor: "rgba(0,0,0,0.7)",
                        borderColor: "#333",
                        borderRadius: 0,
                        borderWidth: 0,
                        padding: 5,
                        textStyle: {
                            color: "#fff",
                            fontFamily: "serif",
                            fontSize: 12,
                            fontStyle: "normal",
                            fontWeight: "normal",
                        },
                    },
                },
            });
            //添加到可视化定制图层
            migration.addTo(custom);
            //绘制
            custom.render();
        }, // minageMap
    },
};
</script>
<style lang="less">
#ggMinage {
    width: 100%;
    background: #eee;
}
</style>