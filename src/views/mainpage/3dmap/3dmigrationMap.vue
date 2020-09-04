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
            //地球
            let viewer = new Cesium.Map("threedmigration", {
                infoBox: false,
                selectionIndicator: false, //选择指示器
            });
            viewer.scene.globe.depthTestAgainstTerrain = true; //设置元素真实抵靠地形地面

            // //地形
            // let terrainUrls = [
            //     "https://t8.tianditu.gov.cn/DEM/DataServer?T=ele_c&tk=e90d56e5a09d1767899ad45846b0cefd",
            //     "https://t9.tianditu.gov.cn/DEM/DataServer?T=ele_c&tk=e90d56e5a09d1767899ad45846b0cefd",
            //     "https://t10.tianditu.gov.cn/DEM/DataServer?T=ele_c&tk=e90d56e5a09d1767899ad45846b0cefd",
            //     "https://t11.tianditu.gov.cn/DEM/DataServer?T=ele_c&tk=e90d56e5a09d1767899ad45846b0cefd",
            //     "https://t12.tianditu.gov.cn/DEM/DataServer?T=ele_c&tk=e90d56e5a09d1767899ad45846b0cefd",
            // ];
            // let t_Provider = new Cesium.GeoTerrainProvider({
            //     dataType: Cesium.GeoTerrainProvider.INT,
            //     urls: terrainUrls,
            // });
            // viewer.terrainProvider = t_Provider;
            //天地图影像
            // viewer.imageryLayers.remove(viewer.imageryLayers.get(0));
            // let tdt = new Cesium.UrlTemplateImageryProvider({
            //     url:
            //         "http://{s}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
            //     subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            //     maximumLevel: 18,
            // });
            // viewer.imageryLayers.addImageryProvider(tdt);

            // mapbox地图 黑暗
            var layer = new Cesium.MapboxImageryProvider({
                mapId: "mapbox.dark",
                url:
                    "http://b.basemaps.cartocdn.com/spotify_dark/{z}/{x}/{y}.png",
                accessToken:
                    "pk.eyJ1IjoidmFyaWFubGluIiwiYSI6ImNrY3EyNzUwYTEwczAycmx1Zzc5dTlkM20ifQ.NE25cXftMqiajLsD5sqHkg",
                styleId: "ck5290o2z121u1cle7mdtfmdk",
            });
            viewer.imageryLayers.addImageryProvider(layer);

            // // 设置最大俯仰角，[-90,0]区间内，默认为-30，单位弧度
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
                [114.61416503910482, 30.86880607080668, 500],
                [114.70480224612243, 30.55888400498388, 500],
                [114.26740905765741, 30.59080761852511, 500],
            ]; //coor
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

            // 四周 动态柱体
            coor.forEach((element) => {
                var dynamicCylinder = new Cesium.GeoDynamicCylinder({
                    viewer: viewer,
                    center: element,
                    // particlesColor: Cesium.Color.GOLD,
                    cylinderColor: new Cesium.Color(10, 10, 0, 10),
                    length: 2000,
                    topRadius: 150,
                    bottomRadius: 400,
                    // particlesImageUrl: "./static/jpg/取消.png",
                });
            });
            // 四周 动态圆圈
            coor.forEach((element) => {
                var dynamicCircle = new Cesium.GeoDynamicCircle({
                    viewer: viewer,
                    center: element,
                    height: 0,
                    color: Cesium.Color.AQUA,
                    radius: 800,
                });
            });

            // 中心点 动态圆圈
            var dynamicCircle1 = new Cesium.GeoDynamicCircle({
                viewer: viewer,
                center: [114.345, 30.675, 100],
                height: 0,
                color: Cesium.Color.RED,
                radius: 1500,
            });
            // 中心点 动态柱体
            var dynamicCylinder = new Cesium.GeoDynamicCylinder({
                viewer: viewer,
                center: [114.345, 30.675, 2000],
                // particlesColor: Cesium.Color.RED,
                cylinderColor: new Cesium.Color(1, 0, 0, 10),
                length: 5000,
                topRadius: 150,
                bottomRadius: 800,
                // particlesImageUrl: "./static/jpg/取消.png",
            });

            //中心点 动态柱体图层
            // var cylinderEffectLayer = new Cesium.GeoCylinderEffectLayer({
            //     effectTypeMapField: "effectType",
            //     // dataSource: "",
            //     color: Cesium.Color.RED,
            //     colorMapField: "color",
            //     radius: 1000.0,
            //     radiusMapField: "radius",
            //     height: 0,
            //     heightMapField: "height",
            //     length: 5000,
            //     lengthMapField: "length",
            //     topRadius: 300,
            //     topRadiusMapField: "topRadius",
            //     bottomRadius: 400,
            //     bottomRadiusMapField: "bottomRadius",
            //     particlesColor: Cesium.Color.GOLD,
            //     particlesColorMapField: "particlesColor",
            //     cylinderColor: Cesium.Color.GOLD,
            //     cylinderColorMapField: "cylinderColor",
            //     // particlesImageUrl:
            //     //     "/geomap-api/JsCesuimDemo/resource/images/particles.png",
            // });
            // cylinderEffectLayer.addTo(viewer);
            // cylinderEffectLayer.setData([
            //     {
            //         type: "Feature",
            //         properties: {
            //             name: "Cylinder1",
            //             particlesColor: "rgba(0,0,255,1)",
            //             cylinderColor: "rgba(0,0,255,1)",
            //         },
            //         geometry: {
            //             type: "Point",
            //             coordinates: [114.345, 30.675, 0],
            //         },
            //     },
            // ]);//中心点 动态柱体图层

            // 动态墙
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

            // cesium实体
            // var redBox = viewer.entities.add({
            //     name: "Red box with black outline",
            //     position: Cesium.Cartesian3.fromDegrees(114.345, 30.675, 0),
            //     box: {
            //         dimensions: new Cesium.Cartesian3(400.0, 300.0, 1500.0),
            //         material: Cesium.Color.RED.withAlpha(0.5),
            //         outline: true,
            //         outlineColor: Cesium.Color.BLACK,
            //     },
            // });
            console.log(viewer.entities);
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