<template>
    <div id="jxmapdemo" class="jxmapdemo" :style="pageSize"></div>
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
} from "../../../render.js";

let map = null;

export default {
    name: "",
    data() {
        return {
            magfg: {
                isTDT: true,
                host: window.location.host,
                projectName: window.location.pathname.split("/")[1],
                style: {
                    version: 8,
                    sources: {},
                    layers: [],
                },
                lnglatlv: { lng: 115.8573, lat: 28.681, lv: 8 }, // 江西南昌
            },
            pageSize: {
                height: "",
            },
            marker: "",
        };
    },
    computed: {},
    created() {
        this.pageSize.height = getMapSize();
    },
    mounted() {
        // map = initMap("jxmapdemo", this.magfg);
        // initMapopera(map, this.magfg.lnglatlv);
        this.init();
    },
    methods: {
        init() {
            var proxyHostUrl =
                "http://" +
                this.magfg.host +
                "/" +
                this.magfg.projectName +
                "/proxy?url=";
            var map = new GeoGlobe.Map({
                mapCRS: {
                    topTileExtent: [-180, -270, 180, 90],
                    coordtransform: "none",
                },
                container: "jxmapdemo",
                zoom: 8,
                center: [115.8573, 28.681],
            });
            map.on("load", function () {
                /**
                 * 使用工具类创建wmts图层
                 * var wms = new GeoGlobe.Format.WMSUtil();
                 * 指定图层
                 * var layer = wms.createLayer("http://192.168.100.231:8889/WMS_Util/wms", {layer:'layerName'});
                 * 不指定图层
                 * var layers = wms.createLayer("http://192.168.100.231:8889/WMS_Util/wms");
                 */
                var clayer = wmtsUtil.createLayer(
                    "http://t0.tianditu.com/cva_w/wmts",
                    { layer: "cva" }
                );
                map.addlayer(clayer);
                console.log(map);
            });
        },
    }, //methods
};
</script>
<style lang="less">
#jxmapdemo {
    width: 100%;
    background: cornsilk;
    margin: 0 auto;
    position: relative;
}

.mapboxgl-popup-content {
    padding: 0;
    background: none;
}
.mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
    -webkit-align-self: center;
    align-self: center;
    border-top: none;
    border-bottom-color: #008fef;
}
.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip {
    -webkit-align-self: flex-start;
    align-self: flex-start;
    border-top: none;
    border-left: none;
    border-bottom-color: #008fef;
}
.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {
    -webkit-align-self: flex-end;
    align-self: flex-end;
    border-top: none;
    border-right: none;
    border-bottom-color: #008fef;
}
.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
    -webkit-align-self: center;
    align-self: center;
    border-bottom: none;
    border-top-color: #008fef;
}
.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip {
    -webkit-align-self: flex-start;
    align-self: flex-start;
    border-bottom: none;
    border-left: none;
    border-top-color: #008fef;
}
.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip {
    -webkit-align-self: flex-end;
    align-self: flex-end;
    border-bottom: none;
    border-right: none;
    border-top-color: #008fef;
}
.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
    -webkit-align-self: center;
    align-self: center;
    border-left: none;
    border-right-color: #008fef;
}
.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
    -webkit-align-self: center;
    align-self: center;
    border-right: none;
    border-left-color: #008fef;
}
</style>

<style>
#popmain {
    height: 200px;
    width: 300px;
    /* background-color: #eee; */
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    border: 4px solid #008fef;
    box-shadow: 10px 10px 5px #888888;
    position: relative;
    color: #fff;
    opacity: 0.8;
}
.popupTitle h3 {
    margin: 10px auto;
    font-size: 22px;
    text-align: center;
}
.popupContent {
    margin: 0 10px;
    text-align: center;
    background-color: blue;
}

.mapboxgl-popup-close-button {
    z-index: 2;
    position: absolute;
    right: 3px;
    top: 1px;
    height: 25px;
    width: 25px;
    /* background: url('../../static/jpg/取消3.png') no-repeat; */
    background-size: 50% 50%;
    background-position: center;
    background-color: #008fef;
    border: none;
    border-radius: 0 6px 0 6px;
    display: inline-block;
    font-size: 22px;
    cursor: pointer;
    text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    color: white;
}
.mapboxgl-popup-close-button:active {
    text-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
    box-shadow: 1px 0 8px rgba(0, 0, 0, 0.5) inset;
    top: 2px;
}
.mapboxgl-popup-close-button:focus {
    outline: 0;
}
.mapboxgl-popup-close-button:hover {
    background: #037ccc;
}
.popPropTable {
    border: 1px solid #aaa;
    width: 90%;
    text-align: center;
    margin: 0 auto;
    font-size: 16px;
}
.markerclass img {
    height: 40px;
    width: 40px;
}

.poptips {
    z-index: 5;
    position: absolute;
    bottom: -25px;
    left: 50%;
    width: 0;
    height: 0;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-top: 25px solid #008fef;
}
.poptips2 {
    position: absolute;
    bottom: -30px;
    left: 48%;
    width: 0;
    height: 0;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    border-top: 30px solid rgba(0, 0, 0, 0.3);
    z-index: -1;
    filter: blur(2px);
}
</style>

