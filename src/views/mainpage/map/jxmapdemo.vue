<template>
    <div id="jxmapdemo" class="jxmapdemo" :style="pageSize"></div>
</template>
<script>
/* eslint-disable no-undef */
/*eslint-disable no-unused-vars*/
import { getMapSize, initMap, initMapopera, addFeatureLayer, createPopupDom, markerDom } from '../../../render.js';

var plugins = {
    mapx: {
        global: {
            mapCRS: {
                topTileExtent: [-180, -270, 180, 90],
                // coordtransform: 'none',
            },
            // "center": [115.95, 27.350],
            center: [115.95, 26.9],
            zoom: 7,
            pitch: 40,
            is3Dpitching: false,
            pitchWithRotate: false,
            dragRotate: false,
            default_scheme: 'img',
            // 'proxy-url': 'http://192.168.42.50:8989/ProxyServlet/proxyHandler?url=',
            // 'proxy-url': 'http://172.17.0.148:8080/proxy/ProxyHandler?url=',
            'proxy-url': 'http://192.168.100.102:8011/ProxyServlet/proxyHandler?url=',
        },
        baselayers: {
            // "vec": [{
            // 	"type": "raster",
            // 	"tiles": [
            // 		"http://t0.tianditu.com/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=0e3cbfd30acaa4fa59360cefad58d97f"
            // 	],
            // 	"tileSize": 256
            // }, {
            // 	"type": "raster",
            // 	"tiles": [
            // 		"http://t0.tianditu.com/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=0e3cbfd30acaa4fa59360cefad58d97f"
            // 	],
            // 	"tileSize": 256
            // }],
            // img: [
            //     {
            //         //背景底图
            //         type: 'raster',
            //         tiles: [
            //             'http://192.168.100.240:9010/jxzb/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=jxzb&STYLE=jxzb&TILEMATRIXSET=jxzb_Matrix_0&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/tile',
            //         ],
            //         tileSize: 256,
            //     },
            //     {
            //         // 江西服务
            //         type: 'raster',
            //         tiles: [
            //             'http://192.168.100.240:9010/dpyx/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=jxyx&STYLE=jxyx&TILEMATRIXSET=jxyx_Matrix_0&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/tile',
            //         ],
            //         tileSize: 256,
            //     },
            // ],
            img: [
                {
                    type: 'raster',
                    tiles: [
                        'http://t0.tianditu.com/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=0e3cbfd30acaa4fa59360cefad58d97f',
                    ],
                    tileSize: 256,
                },
                {
                    type: 'raster',
                    tiles: [
                        'http://t0.tianditu.com/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles&tk=0e3cbfd30acaa4fa59360cefad58d97f',
                    ],
                    tileSize: 256,
                },
            ],
            basemapsres: [
                { type: 'raster', tiles: ['http://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'], tileSize: 256 },
                {
                    type: 'raster',
                    tiles: [
                        'http://localhost:6080/arcgis/rest/directories/arcgisoutput/geoglobe/jxdp_MapServer/_ags_mapefd77cba350b45469e7a37f51a44c25c.png',
                    ],
                    tileSize: 512,
                },
            ],
        },
    },
};
// var PROXY_URL = 'http://192.168.42.50:8989/ProxyServlet/proxyHandler?url='; //代理服务地址
// var PROXY_URL = 'http://172.17.0.148:8080/proxy/ProxyHandler?url='; //代理服务地址
var PROXY_URL = 'http://192.168.100.102:8011/ProxyServlet/proxyHandler?url='; //代理服务地址

let map,
    opt,
    ctx = plugins.mapx,
    cfg = ctx.global;
window.mapx_store = {
    map: null,
    sequnse: 0,
};
export default {
    name: '',
    data() {
        return {
            // magfg: {
            //     isTDT: true,
            //     // host: window.location.host,
            //     // projectName: window.location.pathname.split('/')[1],
            //     style: {
            //         version: 8,
            //         sources: {},
            //         layers: [],
            //     },
            //     lnglatlv: { lng: 115.8573, lat: 28.681, lv: 8 }, // 江西南昌
            // },
            pageSize: {
                height: '',
            },
            marker: '',
            map_type: '',
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
        // init() {
        //     var proxyHostUrl = 'http://' + this.magfg.host + '/' + this.magfg.projectName + '/proxy?url=';
        //     var map = new GeoGlobe.Map({
        //         mapCRS: {
        //             topTileExtent: [-180, -270, 180, 90],
        //             // coordtransform: 'none',
        //         },
        //         container: 'jxmapdemo',
        //         zoom: 8,
        //         center: [115.8573, 28.681],
        //     });
        //     map.on('load', function() {
        //         /**
        //          * 使用工具类创建wmts图层
        //          * var wms = new GeoGlobe.Format.WMSUtil();
        //          * 指定图层
        //          * var layer = wms.createLayer("http://192.168.100.231:8889/WMS_Util/wms", {layer:'layerName'});
        //          * 不指定图层
        //          * var layers = wms.createLayer("http://192.168.100.231:8889/WMS_Util/wms");
        //          */
        //         var clayer = wmtsUtil.createLayer('http://t0.tianditu.com/cva_w/wmts', { layer: 'cva' });
        //         map.addlayer(clayer);
        //         console.log(map);
        //     });
        // },
        init() {
            opt = {
                container: 'jxmapdemo',
                style: {
                    version: 8,
                    glyphs: 'lib/resource/pbf/{fontstack}/{range}.pbf',
                    sources: {
                        // cartodb: {
                        //     type: 'raster',
                        //     tiles: ['http://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'],
                        //     tileSize: 256,
                        // },
                    },
                    layers: [
                        // {
                        //     id: '1',
                        //     type: 'raster',
                        //     source: 'cartodb',
                        // },
                    ],
                },
                zoom: cfg.zoom,
                center: cfg.center,
                pitch: cfg.pitch,
                // is3Dpitching: cfg.is3Dpitching,
                // pitchWithRotate: cfg.pitchWithRotate,
                // dragRotate: cfg.dragRotate,
                is3Dpitching: true,
                pitchWithRotate: true,
                dragRotate: true,
            };
            opt.mapCRS = cfg.mapCRS;
            //console.log(opt);
            // GeoGlobe.Request.setProxyHost(cfg['proxy-url']);
            map = new GeoGlobe.Map(opt);
            console.log(map);
            map.on('load', () => {
                // 模拟一个空图层用于底图切换定位·~
                let id = 'static-layer';
                map.addSource(id, {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [],
                    },
                });
                map.addLayer({
                    id: id,
                    type: 'circle',
                    source: id,
                    paint: {},
                });

                this.addBackgroundMap();
                var wmsUtil = new GeoGlobe.Format.WMS();
                var wlayer = wmsUtil.createLayer('http://localhost:6080/arcgis/services/geoglobe/jxdp1/MapServer');
                map.addLayer(wlayer);
                // 默认加vec底图·~
                // this._change_maptype(cfg.default_scheme);
                // this._change_maptype('vector');

                // 添加江西省市界
                // this.addPolygonXZQH();
            });

            // window.mapx_store.map = map;

            //构造THREE可视化图层
            var threebox = new GeoGlobe.Visuals.Three();
            // //绑定鼠标点击事件
            // threebox.on('overlayerclick', function(e) {
            //     var xyz = threebox.unprojectFromWorld(e.param.pickedInfos[0].point);
            //     alert(e.param.info.userData.attributes.OriginalData.properties.name + '\n经纬度及高程:' + xyz);
            // });
            // //绑定鼠标移动事件
            // threebox.on('overlayerhover', function(e) {
            //     console.info(e);
            // });
            //添加到地图中
            threebox.addTo(map);
            //构造三维弧线图层
            var curveLayer = new GeoGlobe.Visuals.Three.CurveLayer({
                id: '3D curve',
                data: [
                    {
                        type: 'Feature',
                        properties: {
                            name: '武汉->莫斯科',
                            width: 10,
                            curveness: 0.2,
                            color: 'red',
                        },
                        geometry: {
                            type: 'LineString',
                            coordinates: [
                                [115.94608910031837, 28.683022564539485],
                                [114.5547371342521, 28.208067624617172],
                            ],
                        },
                    },
                    {
                        type: 'Feature',
                        properties: {
                            name: '开普敦->莫斯科',
                            width: 5,
                            curveness: 0.2,
                            color: 'green',
                        },
                        geometry: {
                            type: 'LineString',
                            coordinates: [
                                [18.45703125, -33.925129700071984],
                                [37.6171875, 55.751849391735284],
                            ],
                        },
                    },
                    {
                        type: 'Feature',
                        properties: {
                            name: '洛杉矶->纽约->巴黎->莫斯科',
                            width: 3,
                            curveness: 0.3,
                            color: 'yellow',
                        },
                        geometry: {
                            type: 'LineString',
                            coordinates: [
                                [-118.21289062499999, 34.05265942137599],
                                [-74.00390625, 40.730608477796636],
                                [2.373046875, 48.86471476180277],
                                [37.6171875, 55.751849391735284],
                            ],
                        },
                    },
                ],
                texture: '',
                // PROXY_URL + 'http://192.168.42.50:8888/geomap-api/JsCodeDemo_new/images/lensflare.png',
                // 'http://172.17.0.148:8080/proxy/ProxyHandler?url=http://192.168.42.50:8888/geomap-api/JsCodeDemo_new/images/lensflare.png',
                visible: true,
            });
            //添加到THREE图层
            curveLayer.addTo(threebox);
            //绘制
            threebox.render();
            console.log(map._visuals);
        },

        // 添加底图
        addBackgroundMap() {
            let id = 'ol-1';
            var layer = map.getLayer(id);

            if (layer) {
                map.removeLayerAndSource(id);
            }
            var o = ctx.baselayers['basemapsres'];
            console.log(o);

            map.addSource(id, o[0]);
            let layer_opt = {
                id: id,
                type: 'raster',
                source: id,
                paint: {
                    'raster-opacity': 1,
                },
            };
            map.addLayer(layer_opt, 'static-layer');

            // var jxdp_url = 'http://localhost:6080/arcgis/rest/services/geoglobe/jxdp/MapServer/0';
        },

        _change_maptype(type) {
            // let map = window.mapx_store.map,
            //     ctx = app_context.plugins.mapx,
            let sequnse = 0;
            // // 同类型不切换·~
            // if (this.map_type == type) {
            //     return;
            // }
            this.map_type = type;

            for (let i = 0; i < sequnse; i++) {
                map.removeLayerAndSource('ol-' + i);
            }
            sequnse = 0;
            let layers = ctx.baselayers[type];
            for (let j in layers) {
                let id = 'ol-' + sequnse;
                let o = $.extend({}, layers[j]);
                o['tiles'][0] = ctx['global']['proxy-url'] + o['tiles'][0];
                map.addSource(id, o);
                let layer_opt = {
                    id: id,
                    type: 'raster',
                    source: id,
                    paint: {
                        'raster-opacity': 1,
                    },
                };
                if (typeof layers[j].minzoom != 'undefined' || typeof layers[j].maxzoom != 'undefined') {
                    layer_opt = $.extend(layer_opt, {
                        minzoom: layers[j].minzoom,
                        maxzoom: layers[j].maxzoom,
                    });
                }
                map.addLayer(layer_opt, 'static-layer');
                sequnse++;
            }
            console.log('>>>', map.style, '\n>>>', ctx, '\n>>>', sequnse);
        },

        addPolygonXZQH() {
            var xzqh_url = 'http://192.168.100.240:9010/jx_shijie/wfs', // 江西市界的wfs服务
                xzqh_featureType = 'SHIJIE';
            let that = this;
            let map = window.mapx_store.map;
            let url = PROXY_URL + xzqh_url;
            let featureTypeName = xzqh_featureType;
            let shiyeQueryVersion = '1.0.0';
            //构造wfs查询对象
            var wfsQueryObj = new GeoGlobe.Query.WFSQuery(
                url, //服务地址
                featureTypeName, //要素分类名称即图层名称
                {
                    geometryName: 'GEOMETRY',
                    format:
                        shiyeQueryVersion === '1.1.0'
                            ? new GeoGlobe.Format.GML.v3({
                                  xy: true,
                              })
                            : new GeoGlobe.Format.GML.v2({
                                  xy: true,
                              }),
                    version: shiyeQueryVersion,
                    //限制查询的结果数
                    maxFeatures: 9999,
                }
            );
            wfsQueryObj.query('', function(data) {
                if (data) {
                    map.addSource('reliefArea', {
                        type: 'geojson',
                        data: data.geojson,
                    });
                    that.to_point_for_polygon(data.geojson.features);
                    //添加文字
                    for (let i in that.cp_data.features) {
                        let cp = that.cp_data.features[i];
                        let name = cp.properties.NAME;
                        let m = new mapboxgl.Marker({
                            offset: [-30, -15],
                        });
                        if (name == '上饶市') {
                            m.setLngLat([117.98217773437499, 28.44937385955666]);
                        } else {
                            m.setLngLat(cp.geometry.coordinates);
                        }
                        m._element.innerHTML =
                            "<div class='marker'>" + "<div class='boundary-view-marker'><span>" + name + '</span></div></div>';
                        m.addTo(map);
                    }
                }
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
