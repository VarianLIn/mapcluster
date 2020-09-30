/**
 *
 *
 *
 *
 *
 *
 */
/* eslint-disable no-undef */
/*eslint-disable no-unused-vars*/
/* eslint-disable no-debugger*/
import $ from 'jquery';
// 测试
export function getMapSize() {
    var contentH = 60 + 30; // 头部or底部的高度
    var h = window.innerHeight - contentH + 'px';
    return h;
}

// GPU帧数监测
export function status() {
    var stats = new Stats();
    //设置统计模式
    stats.setMode(0); // 0: fps, 1: ms
    //统计信息显示在左上角
    // stats.domElement.style.position = 'absolute';
    // stats.domElement.style.left = '0px';
    // stats.domElement.style.top = '0px';
    document.body.appendChild(stats.dom);
    function animate() {
        stats.update();
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
    return stats;
}

// 地图初始化
export function initMap(containerID, mapfg) {
    let basemap = null;
    mapboxgl.accessToken = 'pk.eyJ1IjoidmFyaWFubGluIiwiYSI6ImNrY3EyNzUwYTEwczAycmx1Zzc5dTlkM20ifQ.NE25cXftMqiajLsD5sqHkg';

    basemap = new GeoGlobe.Map({
        style: mapfg.style,
        container: containerID,
        center: [mapfg.lnglatlv.lng, mapfg.lnglatlv.lat],
        zoom: mapfg.lnglatlv.lv,
        maxZoom: 16,
        minZoom: 2,
    });
    var isTDT = eval(mapfg.isTDT);
    //判断是否添加天地图 -墨卡托数据的天地图
    if (isTDT && isTDT === true) {
        basemap.on('load', function() {
            var token = 'e90d56e5a09d1767899ad45846b0cefd';
            var layer_vtc = new GeoGlobe.TDTLayer('vec_w', token);
            var layer_cva = new GeoGlobe.TDTLayer('cva_w', token);
            basemap.addLayer(layer_vtc);
            basemap.addLayer(layer_cva);
        });
    }

    //设置地图边界
    var bounds = new GeoGlobe.LngLatBounds(new GeoGlobe.LngLat(-180, -90), new GeoGlobe.LngLat(180, 90));
    basemap.setMaxBounds(bounds);
    //添加导航控件
    var Na_control = new GeoGlobe.Control.Navigation();
    basemap.addControl(Na_control, 'top-left');
    //定义鼠标平移拖拽对象
    var dragpan = new GeoGlobe.Handler.DragPanHandler(basemap);
    //开启平移拖拽
    dragpan.enable();
    //定义鼠标旋转拖拽对象
    var dragrotat = new GeoGlobe.Handler.DragRotateHandler(basemap);
    //禁用旋转拖拽
    dragrotat.disable();
    //定义比例尺控件容器
    var Sca_control;
    Sca_control = new GeoGlobe.Control.Scale({
        position: 'bottom-left',
        maxWidth: 100,
        unit: 'imperial',
    });
    basemap.addControl(Sca_control);
    // //画图控件
    // var Draw = new MapboxDraw();
    // basemap.addControl(Draw, 'top-left');

    // var custom = new GeoGlobe.Visuals.Custom();
    // //添加到地图中
    // custom.addTo(basemap);

    // custom.on('overlayerclick', function(e) {
    //     console.info(e);
    //     $('.mapboxgl-marker').remove();
    //     let info =
    //         '<div class="popup">' +
    //         '<div class="_title"><i></i><span class="name">' +
    //         e.feature.name +
    //         '</span><i></i><span class="close" title="关闭">X</span></div>' +
    //         '<div class="_content"><ul>' +
    //         '<li><span class="_t">NOx</span><span class="_num">2天</span></li>' +
    //         '<li><span class="_t">SO2</span><span class="_num">5天</span></li>' +
    //         '<li><span class="_t">vocs</span><span class="_num">3天</span></li>' +
    //         '<li><span class="_t">氨氮</span><span class="_num">2.5倍</span></li>' +
    //         '<li><span class="_t">总氮</span><span class="_num">2.5倍</span></li>' +
    //         '<li><span class="_t">总磷</span><span class="_num">2.5倍</span></li>' +
    //         '</ul></div>' +
    //         '</div>' +
    //         '<div class="popup_bottom"></div>';
    //     //直接显示信息框
    //     let m = new mapboxgl.Marker();
    //     m.setLngLat([e.event.lngLat.lng, e.event.lngLat.lat]);
    //     m._element.innerHTML = info;
    //     m.addTo(basemap);
    //     $('.popup .close').click(function() {
    //         $('.mapboxgl-marker').remove();
    //     });
    // });
    // // //绑定鼠标点击事件
    // // custom.on('overlayerclick', function(e) {
    // //     console.info(e);
    // // });
    // // //绑定鼠标移动事件
    // // custom.on('overlayerhover', function(e) {
    // //     console.info(e);
    // // });
    // //构造气泡图层
    // var bubble = new GeoGlobe.Visuals.Custom.Bubble({
    //     id: 'bubble_1',
    //     visibility: true,
    //     dragdrawing: true,
    //     data: [
    //         {
    //             type: 'Feature',
    //             properties: { name: '湖北省', value: 666 },
    //             geometry: { type: 'Point', coordinates: [114.28364837577942, 30.63281125337673] },
    //         },
    //     ],
    //     rendererOptions: {
    //         markPoint: {
    //             hoverable: true,
    //             clickable: true,
    //             symbol: 'bubble',
    //             itemStyle: {
    //                 color: 'rgba(255,0,0,0.7)',
    //             },
    //         },
    //     },
    // });
    // //添加到可视化定制图层
    // bubble.addTo(custom);
    // //绘制
    // custom.render();
    return basemap;
}

// 地图拖拽点击缩放功能
export function initMapopera(basemap, lnglatlv) {
    // console.log(lnglatlv);
    basemap.on('click', function(e) {
        console.log(e);
        console.log('x lng ', e.lngLat.lng);
        console.log('y lat', e.lngLat.lat);
    });
    basemap.on('dragend', function(e) {
        lnglatlv.lng = e.target.transform.center.lng;
        lnglatlv.lat = e.target.transform.center.lat;
        // console.log('draglng', e.target.transform.center.lng);
        // console.log('draglat', e.target.transform.center.lat);
    });
    basemap.on('zoomend', function(e) {
        lnglatlv.lv = e.target.transform.tileZoom;
        // console.log('zoome', e.target.transform.tileZoom);
        // console.log('zoom2', basemap.transform.tileZoom);
    });
    return lnglatlv;
}

// 添加图层
export function addFeatureLayer(basemap, dataObj, Paint) {
    var dataObjID = dataObj.properties.layerID;
    var dataObjType = dataObj.properties.featureType;
    var dataSour = { type: 'geojson', data: dataObj };
    var dataPaint = Paint ? Paint : dataObj.properties.paint;
    var dataLayerObj = {
        id: dataObjID,
        type: dataObjType,
        source: dataSour,
        paint: dataPaint,
    };
    if (basemap.getLayer(dataObjID)) {
        alert('Layer already exists');
    } else {
        basemap.addLayer(dataLayerObj);
    }
}

// popup图层
export function createPopupDom(dataObj) {
    var popbody = document.createElement('div');
    var popMainDiv = document.createElement('div');
    // popMainDiv.setAttribute('id', 'popmain');
    popMainDiv.id = 'popmain';

    var popTitleDiv = document.createElement('div');
    popTitleDiv.setAttribute('class', 'popupTitle');
    popMainDiv.appendChild(popTitleDiv);

    var popTitleName = document.createElement('h3');
    popTitleName.innerText = dataObj.properties.name;
    // popTitleName.innerText = '13';
    popTitleDiv.appendChild(popTitleName);

    var popCon = document.createElement('div');
    popCon.setAttribute('class', 'popupContent');
    popMainDiv.appendChild(popCon);

    let prop = Object.keys(dataObj.properties);
    var propLen = prop.length;

    var propTd = document.createElement('table');
    propTd.setAttribute('class', 'popPropTable');

    popMainDiv.appendChild(propTd);

    // var poptips = document.createElement('div');
    // poptips.setAttribute('class', 'poptips');

    // var poptips2 = document.createElement('div');
    // poptips2.setAttribute('class', 'poptips2');
    // popMainDiv.appendChild(poptips);
    // popMainDiv.appendChild(poptips2);

    for (var i = 0; i < propLen; i++) {
        var tr = document.createElement('tr');
        propTd.appendChild(tr);
        var td1 = document.createElement('td');
        td1.innerHTML = prop[i];
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.innerHTML = dataObj.properties[prop[i]];
        tr.appendChild(td2);
    }

    // prop.forEach(function create(item, index) {
    //     console.log(dataObj.properties[item]);

    //     var a = document.createElement('p');
    // });

    // var popCancel = document.createElement('button');
    // popCancel.type = 'button';
    // popCancel.id = 'popupCancel';
    // popCancel.ref = 'popupCancel';
    // popCancel.setAttribute('class', 'popupCancel');
    // popMainDiv.appendChild(popCancel);

    popbody.appendChild(popMainDiv);

    let pophtml = popbody.innerHTML;
    // console.log(a);
    return pophtml;
}

// marker标记图层
export function markerDom(url) {
    var marker;
    if (url) {
        marker = document.createElement('div');
        marker.setAttribute('class', 'markerclass');
        var markerimg = document.createElement('img');
        markerimg.setAttribute('src', url);
        marker.appendChild(markerimg);
        // console.log(url);
    } else {
        marker = null;
    }
    return marker;
}

export function removeAllLayers() {}

// 地图插件
// export function initPlugin(basemap) {
//     //设置地图边界
//     var bounds = new GeoGlobe.LngLatBounds(new GeoGlobe.LngLat(-180, -90), new GeoGlobe.LngLat(180, 90));
//     basemap.setMaxBounds(bounds);
//     //添加导航控件
//     var Na_control = new GeoGlobe.Control.Navigation();
//     basemap.addControl(Na_control, 'top-left');
//     //定义鼠标平移拖拽对象
//     var dragpan = new GeoGlobe.Handler.DragPanHandler(basemap);
//     //开启平移拖拽
//     dragpan.enable();
//     //定义鼠标旋转拖拽对象
//     var dragrotat = new GeoGlobe.Handler.DragRotateHandler(basemap);
//     //禁用旋转拖拽
//     dragrotat.disable();
//     //定义比例尺控件容器
//     var Sca_control;
//     Sca_control = new GeoGlobe.Control.Scale({
//         position: 'bottom-left',
//         maxWidth: 100,
//         unit: 'imperial',
//     });
//     basemap.addControl(Sca_control);
//     // //画图控件
//     var Draw = new MapboxDraw();
//     basemap.addControl(Draw, 'top-left');
// }
