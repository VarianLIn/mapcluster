<template>
    <baidu-map
        :center="center"
        :zoom="zoom"
        @ready="handler"
        :scroll-wheel-zoom="true"
        class="baidumapdiv"
        :style="mapsize"
    >
        <bm-marker
            :position="{ lng: 118.875089, lat: 32.016172 }"
            :dragging="true"
            @click="infoWindowOpen"
        >
            <bm-info-window
                :show="show"
                @close="infoWindowClose"
                @open="infoWindowOpen"
            >南京×××软件系统有限公司</bm-info-window>
        </bm-marker>
        <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>
        <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
    </baidu-map>
    <!-- <baidu-map :center="center" :zoom="zoom"></baidu-map> -->
</template>
<script>
import {getMapSize} from "../../../render.js"
export default {
    data() {
        return {
            center: { lng: 0, lat: 0 },
            zoom: 3,
            show: true,
            mapsize: {
                height: "",
            },
        };
    },
    created(){
        this.mapsize.height = getMapSize()
    },
    methods: {
        handler() {
            // console.log(BMap, map);
            // this.center.lng = 116.404;
            // this.center.lat = 39.915;
            this.center.lat = 32.016172;
            this.center.lng = 118.875089;
            this.zoom = 15;
        },
        infoWindowClose() {
            this.show = false;
        },
        infoWindowOpen() {
            this.show = true;
        },
    },
    // mounted() {
    //     this.lng = 116.404;
    //     this.lat = 39.915;
    //     this.zoom = 15;
    // },
};
</script>
<style lang="less">
.baidumapdiv {
    width: 100%;
    height: 600px;
}
</style>
