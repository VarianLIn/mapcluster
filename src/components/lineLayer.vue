<!--
 * @Author: LIn bowen
 * @Date: 2021-04-20 14:50:32
 * @LastEditors: LIn bowen
 * @LastEditTime: 2021-04-25 14:16:05
 * @Descripttion: 
-->
<template>
    <div class="line"></div>
</template>
<script>
export default {
    props: {
        map: {
            type: Object,
            default: null
        },
        lineData: {
            type: Object,
            defalut: null
        }
    },
    data() {
        return {};
    },
    watch: {
        // lineData(newval) {
        //     debugger;
        //     console.log(newval);
        //     this.addLine();
        // }
    },
    mounted() {
        this.addLine();
    },
    methods: {
        addLine() {
            this.map.addSource('test', this.lineData);

            this.map.addLayer({
                id: 'test',
                type: 'line',
                source: 'test',
                paint: {
                    'line-width': 4,
                    'line-color': '#0ff'
                }
            });
            this.map.moveLayer('test');
            console.log(this.map);
        },
        removeLineLayer() {
            this.map.getLayer('test') && this.map.removeLayer('test') && this.map.removeSource('test');
        }
    },
    beforeDestroy() {
        console.log(1)
        this.removeLineLayer();
    },
    destroyed(){
        console.log(1)
    }
};
</script>
