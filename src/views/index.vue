<style scoped lang="less">
.index {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    text-align: center;
    h1 {
        height: 150px;
        img {
            height: 100%;
        }
    }
    h2 {
        color: #666;
        margin-bottom: 200px;
        p {
            margin: 0 0 50px;
        }
    }
    .ivu-row-flex {
        height: 100%;
    }
}
</style>
<style scoped lang="less">
.b_main {
    background: #666;
    width: 100%;
    // height: 100px;
}
</style>
<template>
    <div class="b_body">
        <div class="b_main">
            <div class="b_content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {},
};
</script>
