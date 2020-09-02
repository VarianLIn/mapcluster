<template>
    <div class="3dmigration" id="threedmigration" :style="mapsize"></div>
</template>

<script>
/* eslint-disable no-undef */
/*eslint-disable no-unused-vars*/
import { getMapSize } from "../../../render.js";
export default {
    name: "",
    data() {
        return {
            mapsize: {
                height: "",
            },
        };
    },
    created() {
        this.mapsize.height = getMapSize();
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            var viewer = new Cesium.Map("threedmigration");

            var layer = new Cesium.MapboxImageryProvider({
                // mapId: "mapbox.dark",
                // accessToken:
                //     "pk.eyJ1IjoidmFyaWFubGluIiwiYSI6ImNrY3EyNzUwYTEwczAycmx1Zzc5dTlkM20ifQ.NE25cXftMqiajLsD5sqHkg",
                url:
                    "http://b.basemaps.cartocdn.com/spotify_dark/{z}/{x}/{y}.png",
                accessToken:
                    "pk.eyJ1IjoidmFyaWFubGluIiwiYSI6ImNrY3EyNzUwYTEwczAycmx1Zzc5dTlkM20ifQ.NE25cXftMqiajLsD5sqHkg",
                styleId: "ck5290o2z121u1cle7mdtfmdk",
            });

            viewer.imageryLayers.addImageryProvider(layer);

            //设置最大俯仰角，[-90,0]区间内，默认为-30，单位弧度
            viewer.scene.screenSpaceCameraController.constrainedPitch = Cesium.Math.toRadians(
                -30
            );
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(
                    114.345,
                    30.675,
                    1000000
                ),
            });

            var data = [
                {
                    //飞线路径：起始点，终结点
                    posititons: [
                        [114.345, 30.675, 489.1],
                        [108.96087018650488, 34.219774276548435, 424.7],
                    ],
                    color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
                    width: 2.0,
                    duration: 4,
                },
            ]; // data

            var odLine = new Cesium.GeoODLine({
                viewer: viewer,
                data: data,
                playing: true,
                sampleMaxHeight: 30000, //抛物线的采样最大高程，越大，抛物线越高
                sampleMaxPoint: 50, //抛物线的采样最多点数据量
                isParabola: true,
            }); // odline
        },
    },
};
</script>

<style lang="less">
#threedmigration {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>