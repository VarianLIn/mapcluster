<style scoped lang="less">
.b_main {
    background: #fff;
    width: 100%;
    // height: 100px;
}
</style>
<template>
    <div class="b_body">
        <div class="b_main">
            <b-header @bottomStatusSet="bottomStatus"></b-header>
            <div class="b_content">
                <router-view></router-view>
            </div>
            <!-- <b-bottom :status="bottomShow"></b-bottom> -->
            <b-bottom v-show="bottomShow"></b-bottom>
        </div>
    </div>
</template>
<script>
import bHeader from "../header/header.vue";
import bBottom from "../bottom/bottom.vue";

export default {
    components: {
        bHeader,
        bBottom,
    },
    data() {
        return {
            bottomShow: true,
        };
    },
    mounted() {},
    methods: {
        bottomStatus(data) {
            this.bottomShow = data;
        },
    },
};
</script>
