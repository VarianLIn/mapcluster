<template>
    <div class="main">
        <div class="md" id="md" :style="pageSize"></div>
        <!-- <div class="testLineLayer"></div> -->
        <lineLayer v-if="lineShow" :map="map" :lineData="lineData" />
        <button class="btn" @click="addLineLayer">添加线图层</button>
        <button class="btn1" @click="remove">移除线图层</button>
    </div>
</template>
<script>
/* eslint-disable no-undef */
/*eslint-disable no-unused-vars*/
import { getMapSize, initMap, initMapopera, addFeatureLayer, createPopupDom, markerDom } from '../../../render.js';
import lineLayer from '../../../components/lineLayer';
// let map = null;

export default {
    name: '',
    components: {
        lineLayer
    },
    data() {
        return {
            map: null,
            mapfg: {
                isTDT: true,
                host: window.location.host,
                projectName: window.location.pathname.split('/')[1],
                style: {
                    version: 8,
                    sources: {},
                    layers: []
                },
                lnglatlv: { lng: 114.345, lat: 30.675, lv: 10 }
            },
            pageSize: {
                height: ''
            },
            toggleStatus: true,
            controlStatus: true,
            marker: '',
            lineData: null,
            lineShow: false,
            lineMap: null
        };
    },
    computed: {},
    created() {
        this.pageSize.height = getMapSize();
    },
    mounted() {
        // map = initMap('md', this.magfg);
        // initMapopera(map, this.magfg.lnglatlv);
        this.init();
    },
    methods: {
        addLineLayer() {
            debugger;
            // this.lineMap = this.map;

            var linedata = {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: [
                            [113.96871826170354, 30.7169211257597],
                            [114.11154052733059, 30.6791338777755],
                            [114.23307678221272, 30.6608253616984],
                            [114.34155914943562, 30.6460644608508],
                            [114.45004913967261, 30.6324764072989],
                            [114.54411957424264, 30.6289313837776],
                            [114.62033722560136, 30.6289313837776],
                            [114.68076203029216, 30.6425199352542]
                        ]
                    }
                }
            };
            this.lineData = linedata;

            this.lineShow = true;
        },
        remove(){
            this.lineShow = false
        },
        init() {
            this.map = new GeoGlobe.Map({
                style: this.mapfg.style,
                container: 'md',
                center: [this.mapfg.lnglatlv.lng, this.mapfg.lnglatlv.lat],
                zoom: this.mapfg.lnglatlv.lv,
                maxZoom: 16,
                minZoom: 2
            });
            this.map.on('load', () => {
                var token = 'e90d56e5a09d1767899ad45846b0cefd';
                var layer_vtc = new GeoGlobe.TDTLayer('vec_w', token);
                var layer_cva = new GeoGlobe.TDTLayer('cva_w', token);
                this.map.addLayer(layer_vtc);
                this.map.addLayer(layer_cva);
            });
            this.map.on('zoomend', (e) => {
                console.log(e);
            });
            this.map.on('click', function(e) {
                console.log(e);
            });
            this.map.on('mousedown', function(e) {
                // console.log('A click event has occurred at ' + e.lngLat.toArray());
                console.log(e.lngLat.toArray());
            });
        }
        // init() {
        //     document.getElementsByClassName('mapboxgl-missing-css')[0].remove();
        //     document.getElementsByClassName('mapboxgl-canvas-container')[0].remove();
        //     document.getElementsByClassName('mapboxgl-control-container')[0].remove();
        //     map = initMap('md', this.lnglatlv);
        //     initMapopera(map, this.lnglatlv);
        //     // console.log(map);
        // },
        // zoomTo() {
        //     // this.map.flyTo(new GeoGlobe.LngLat(114.3, 30.6), 10);
        //     // this.map.zoomTo(10);
        //     // this.zoomLng = document.getElementById('zoomLng').innerHTML();
        //     // this.zoomLat = document.getElementById('zoomLat').innerHTML();
        //     // this.zoomLv = document.getElementById('zoomLv').innerHTML();
        //     // this.zoomLngVal = this.$refs.zoomLng.value;
        //     // this.zoomLatVal = this.$refs.zoomLat.value;
        //     // this.zoomLvVal = this.$refs.zoomLv.value;
        //     var flyObj = {
        //         center: [this.lnglatlv.lng, this.lnglatlv.lat],
        //         zoom: this.lnglatlv.lv,
        //     };
        //     map.flyTo(flyObj);
        // },
    } //methods
};
</script>
<style lang="css">
#md {
    /* height: 900px; */
    width: 100%;
    background: cornsilk;
    margin: 0 auto;
    position: relative;
}
.controlCon {
    padding: 5px;
}
.control {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 10%;
    background: #0082ff;
    z-index: 9;
    color: #fff;
    border-radius: 10px;
    transition: all 0.3s;
}
.controlClose {
    position: absolute;
    right: -10%;
    top: 0;
    height: 100%;
    width: 10%;
    background: #0082ff;
    z-index: 9;
    color: #fff;
    border-radius: 10px;
    transition: all 0.3s;
}
.ctrl_btn {
    margin: 5px 0;
    width: 100%;
}
.toggleBase {
    position: absolute;
    top: 2%;
    height: 40px;
    width: 40px;
    height: 40px;
    width: 40px;
    z-index: 9;
    font-size: 30px;
    background: #0082ff;
    border-radius: 10px 0 0 10px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    cursor: pointer;
}
.toggleOpen {
    right: 10%;
    transition: all 0.3s;
}
.toggleClose {
    right: 0;
    transition: all 0.3s;
}

.toggleOpen i {
    cursor: pointer;
    transform: rotate(0);
    transition: all 1s;
}
.toggleClose i {
    cursor: pointer;
    transform: rotate(180deg);
    transition: all 1s;
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

<style lang="less">
.popup {
    background-color: #808fef;
    height: 200px;
    width: 200px;
}
</style>

<style scoped>
.main {
    position: relative;
}
.btn {
    position: absolute;
    top: 200px;
    right: 300px;
}
.btn1 {
    position: absolute;
    top: 220px;
    right: 300px;
}
</style>
