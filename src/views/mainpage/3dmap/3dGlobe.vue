<template>
    <div class="main3d">
        <div class="3dGlobe" id="globeContainer" :style="mapsize"></div>

        <!-- <div class="controlCon">
            <i-button class="ctrl_btn" @click="addgui()">gui</i-button>
        </div>-->
    </div>
</template>

<script>
/* eslint-disable no-undef */
/*eslint-disable no-unused-vars*/
import { getMapSize } from "../../../render.js";
import { add1 } from "../../../render3d.js";
let gui = null;
export default {
    name: "",
    data() {
        return {
            mapsize: {
                height: "",
            },
            gui: "",
        };
    },
    created() {
        this.mapsize.height = getMapSize();
    },
    mounted() {
        this.init3dGlobe();
    },
    methods: {
        init3dGlobe() {
            var Cfg = {};
            //系统主机IP地址
            Cfg.host = window.location.host;
            //项目名称
            Cfg.projectName = window.location.pathname.split("/")[1];
            //代理服务地址
            Cfg.proxyHostUrl =
                "http://" + Cfg.host + "/" + Cfg.projectName + "/proxy?url=";
            var viewer = new Cesium.Map("globeContainer");

            //加载天地图web墨卡托的全球影像
            // var tdt = new Cesium.UrlTemplateImageryProvider({
            //     url:
            //         "http://{s}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
            //     subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            // });
            //加载天地图经纬度的全球影像
            // var tdt = new Cesium.UrlTemplateImageryProvider({
            // 	url: "http://{s}.tianditu.com/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd",
            // 	subdomains: ['t0','t1','t2','t3','t4','t5','t6','t7'],
            // 	tilingScheme: new Cesium.GeoGeographicTilingScheme()
            // });
            // viewer.imageryLayers.addImageryProvider(tdt);

            // mapbox底图
            var layer = new Cesium.MapboxImageryProvider({
                // mapId: "mapbox.dark",
                // accessToken:
                //     "pk.eyJ1IjoidmFyaWFubGluIiwiYSI6ImNrY3EyNzUwYTEwczAycmx1Zzc5dTlkM20ifQ.NE25cXftMqiajLsD5sqHkg",
                url: "http://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
                accessToken:
                    "pk.eyJ1IjoidmFyaWFubGluIiwiYSI6ImNrY3EyNzUwYTEwczAycmx1Zzc5dTlkM20ifQ.NE25cXftMqiajLsD5sqHkg",
                styleId: "ck5290o2z121u1cle7mdtfmdk",
            });
            viewer.imageryLayers.addImageryProvider(layer);

            // //开启天地图卫星影像的色差特殊处理， 如非必须请关闭该功能！
            // viewer.camera.isTDT = true;
            // //设置最大俯仰角，[-90,0]区间内，默认为-30，单位弧度
            // viewer.scene.screenSpaceCameraController.constrainedPitch = Cesium.Math.toRadians(
            //     -30
            // );

            // var viewModel = {
            //     x: 0,
            // };
            // gui = new dat.GUI({});
            // var f = gui.addFolder("视图控制");

            // gui.domElement.id = "gui";

            // f.add(viewModel, "x", 0, 10, 0.001).onChange(function (value) {
            //     // console.log(value);
            // });
            // f.open();
            var dynamicCylinder = new Cesium.GeoDynamicCylinder({
                viewer: viewer,
                center: [108.9587516378286, 34.21978169947116, 0],
                particlesColor: Cesium.Color.GOLD,
                cylinderColor: Cesium.Color.GOLD,
                length: 100,
                topRadius: 8,
                bottomRadius: 10,
                particlesImageUrl: "./static/jpg/取消.png",
            });
            // viewer.camera.flyTo({
            //     destination: Cesium.Cartesian3.fromDegrees(
            //         108.9587516378286,
            //         34.21978169947116,
            //         450
            //     ),
            //     orientation: {
            //         heading: 0,
            //         pitch: -1,
            //         roll: 0.0008812885117928104,
            //     },
            // });
            viewer.zoomTo([108.9587516378286, 34.21978169947116, 450]);
            // //得到当前三维场景
            // var scene = viewer.scene;
            // //得到当前三维场景的椭球体
            // var ellipsoid = scene.globe.ellipsoid;
            // var longitudeString = null;
            // var latitudeString = null;
            // var height = null;
            // var cartesian = null;

            // var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
            // console.log(handler);
            // //获取鼠标点击时的坐标
            // getPosition(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            // function getPosition(actionType) {
            //     //移除所有事件
            //     handler.removeInputAction(
            //         Cesium.ScreenSpaceEventType.LEFT_CLICK
            //     );
            //     handler.removeInputAction(
            //         Cesium.ScreenSpaceEventType.MIDDLE_CLICK
            //     );
            //     handler.removeInputAction(
            //         Cesium.ScreenSpaceEventType.RIGHT_CLICK
            //     );
            //     handler.removeInputAction(Cesium.ScreenSpaceEventType.WHEEL);
            //     if (actionType !== Cesium.ScreenSpaceEventType.WHEEL) {
            //         //设置鼠标点击事件的处理函数，这里负责监听x,y坐标值变化
            //         handler.setInputAction(function (click) {
            //             //通过指定的椭球或者地图对应的坐标系，将鼠标的二维坐标转换为对应椭球体三维坐标
            //             cartesian = viewer.camera.pickEllipsoid(
            //                 click.position,
            //                 ellipsoid
            //             );
            //             //将笛卡尔坐标转换为地理坐标
            //             var cartographic = ellipsoid.cartesianToCartographic(
            //                 cartesian
            //             );
            //             //将弧度转为度的十进制度表示
            //             longitudeString = Cesium.Math.toDegrees(
            //                 cartographic.longitude
            //             );
            //             latitudeString = Cesium.Math.toDegrees(
            //                 cartographic.latitude
            //             );
            //             //获取相机高度
            //             height = Math.ceil(
            //                 viewer.camera.positionCartographic.height
            //             );
            //             positionInfo.setValue(
            //                 longitudeString.toFixed(3) +
            //                     "," +
            //                     latitudeString.toFixed(3) +
            //                     "," +
            //                     height.toFixed(3)
            //             );
            //         }, actionType);
            //     } else {
            //         //设置鼠标滚动事件的处理函数，这里负责监听高度值变化
            //         handler.setInputAction(function (wheelment) {
            //             height = Math.ceil(
            //                 viewer.camera.positionCartographic.height
            //             );
            //             positionInfo.setValue(
            //                 "事件触发时相机高度：" + height.toFixed(3) + "m"
            //             );
            //         }, actionType);
            //     }
            // } //getposition
        }, // init

        // addgui() {
        //     if (gui) {
        //         console.log("if", gui);
        //         gui.remove();
        //     } else {
        //         console.log("else", gui);

        //         var viewModel = {
        //             x: 0,
        //         };
        //         gui = new dat.GUI({});
        //         var f = gui.addFolder("视图控制");

        //         gui.domElement.id = "gui";

        //         f.add(viewModel, "x", 0, 10);
        //         f.open();
        //     }
        //     // Cesium.knockout.track(viewModel);
        // },
    },
};
</script>

<style lang="less">
.main3d {
    position: relative;
}
.controlCon {
    position: absolute;
    width: 10%;
    height: 30px;
    right: 2%;
    bottom: 15%;
    z-index: 99;
    background-color: rgba(rgb(255, 255, 255), 0.5);
}
#gui {
    position: fixed;
    bottom: 5%;
    left: 2px;
    z-index: 99;
}
</style>