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
            // viewer.scene.screenSpaceCameraController.constrainedPitch = Cesium.Math.toRadians(
            //     -30
            // );
            // viewer.camera.flyTo({
            //     destination: Cesium.Cartesian3.fromDegrees(
            //         114.4339008730821,
            //         30.119912654673536,
            //         50000
            //     ),
            //     orientation: {
            //         heading: 0,
            //         pitch: Cesium.Math.toRadians(-35.0),
            //         roll: 0,
            //     },
            // });

            var coor = [
                [114.11085388187564, 30.86173327022155, 500],
                [114.61416503910482, 30.868806070806684, 500],
                [114.70480224612243, 30.55888400498388, 500],
                [114.2674090576574, 30.590807618525005, 500],
            ];
            var data = [
                {
                    //飞线路径：起始点，终结点
                    posititons: [
                        [114.345, 30.675, 489.1],
                        [114.11085388187564, 30.86173327022155, 500],
                    ],
                    color: new Cesium.Color(5.0, 0.0, 5.0, 1000.0),
                    width: 3.0,
                    duration: 4,
                },
                {
                    posititons: [
                        [114.345, 30.675, 489.1],
                        [114.61416503910482, 30.868806070806684, 500],
                    ],
                    color: new Cesium.Color(5.0, 5.0, 0.0, 1000.0),
                    width: 3.0,
                    duration: 4,
                },
                {
                    posititons: [
                        [114.345, 30.675, 489.1],
                        [114.70480224612243, 30.55888400498388, 500],
                    ],
                    color: new Cesium.Color(5.0, 5.0, 5.0, 1000.0),
                    width: 3.0,
                    duration: 4,
                },
                {
                    posititons: [
                        [114.345, 30.675, 489.1],
                        [114.2674090576574, 30.590807618525005, 500],
                    ],
                    color: new Cesium.Color(0.0, 5.0, 5.0, 1000.0),
                    width: 3.0,
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

            coor.forEach((element) => {
                var dynamicCylinder = new Cesium.GeoDynamicCylinder({
                    viewer: viewer,
                    center: element,
                    particlesColor: Cesium.Color.GOLD,
                    cylinderColor: Cesium.Color.GOLD,
                    length: 2000,
                    topRadius: 200,
                    bottomRadius: 400,
                    // particlesImageUrl: "./static/jpg/取消.png",
                });
            });
            // var dynamicCylinder = new Cesium.GeoDynamicCylinder({
            //     viewer: viewer,
            //     center: [114.345, 30.675, 500],
            //     particlesColor: Cesium.Color.RED,
            //     cylinderColor: Cesium.Color.RED,
            //     length: 5000,
            //     topRadius: 200,
            //     bottomRadius: 400,
            //     // particlesImageUrl: "./static/jpg/取消.png",
            // });

            //
            // var scene = viewer.scene;
            // var fireEffect = new Cesium.GeoCylinderApertureSpreadEffect({
            //     color: Cesium.Color.WHITE,
            //     radius: 2000.0,
            //     height: 1500.0,
            //     emissiveFactor: new Cesium.Cartesian3(0.6, 0.1, 0.1),
            //     center: [114.345, 30.675, -0],
            //     speed: 100,
            // });
            // scene.primitives.add(fireEffect);

            //
            var dynamicCircle1 = new Cesium.GeoDynamicCircle({
                viewer: viewer,
                center: [114.345, 30.675, 500],
                height: 0,
                color: Cesium.Color.GOLD,
                radius: 1500,
            });

            var redBox = viewer.entities.add({
                name: "Red box with black outline",
                position: Cesium.Cartesian3.fromDegrees(114.345, 30.675, 0),
                box: {
                    dimensions: new Cesium.Cartesian3(400.0, 300.0, 1500.0),
                    material: Cesium.Color.RED.withAlpha(0.5),
                    outline: true,
                    outlineColor: Cesium.Color.BLACK,
                },
            });

            viewer.zoomTo(viewer.entities);
        }, // init
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