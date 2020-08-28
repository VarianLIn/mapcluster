<template>
    <div class="b-header">
        <Menu mode="horizontal" theme="dark" active-name="baidumap" @on-select="checkMenu">
            <MenuItem name="home">
                <Icon type="ios-paper" />首页
            </MenuItem>
            <Submenu name="2DView">
                <template slot="title">
                    <Icon type="ios-stats" />地图
                </template>
                <MenuGroup title="2D-View">
                    <MenuItem v-for="(item, index) in mapList" :key="index" :name="item.name">
                        <Icon :type="item.icon" />
                        {{ item.content }}
                    </MenuItem>
                </MenuGroup>
            </Submenu>
            <Submenu name="3DView">
                <template slot="title">
                    <Icon type="ios-stats" />三维地图
                </template>
                <MenuGroup title="3D-View">
                    <MenuItem v-for="(item, index) in threeMapList" :key="index" :name="item.name">
                        <Icon :type="item.icon" />
                        {{ item.content }}
                    </MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem name="other">
                <Icon type="ios-construct" />其他
            </MenuItem>
            <Button
                :type="loading?'error':'info'"
                :title="loading?'关闭GPU监测':'打开GPU监测'"
                class="Monitor"
                @click="toggleMonitor"
            >
                <Icon :type="loading?'ios-power':'ios-pulse'" />
            </Button>
        </Menu>
    </div>
</template>
<script>
import { status } from "../../render";
export default {
    data() {
        return {
            // mapList1: this.$router.options.routes[0].children,
            mapList: [
                {
                    index: 1,
                    name: "baidumap",
                    content: "百度地图",
                    icon: "md-american-football",
                },
                {
                    index: 2,
                    name: "gaodemap",
                    content: "高德地图",
                    icon: "md-albums",
                },
                {
                    index: 3,
                    name: "geoglobemap",
                    content: "GeoGlobe",
                    icon: "ios-american-football",
                },
                {
                    index: 4,
                    name: "echartsMinage",
                    content: "echarts迁徙图",
                    icon: "logo-apple",
                },
                {
                    index: 5,
                    name: "ggMinage",
                    content: "GeoGlobe迁徙图",
                    icon: "logo-apple",
                },
            ],
            threeMapList: [
                {
                    index: 1,
                    name: "3dmigrationMap",
                    content: "三维迁徙",
                    icon: "md-american-football",
                },
                {
                    index: 2,
                    name: "other",
                    content: "test",
                    icon: "md-albums",
                },
            ],
            bottomstatus: true,
            loading: true,
            stats: "",
        };
    },
    mounted() {
        this.stats = status();
    },
    methods: {
        checkMenu(name) {
            // console.log(this.mapList1);
            this.$router.push({
                path: name,
            });
            this.$router.options.routes[0].children.forEach((value) => {
                if (value.path == name) {
                    this.bottomstatus = value.meta.bottom;
                }
            });
            this.$emit("bottomStatusSet", this.bottomstatus);
            // console.log(this.bottomstatus);
        },
        toggleMonitor() {
            if (this.loading == true) {
                this.stats.dom.remove();
            } else {
                this.stats = status();
            }
            this.loading = !this.loading;
        },
    },
};
</script>
<style lang="less">
.b-header {
    width: 100%;
    position: relative;
}
.Monitor {
    position: absolute;
    right: 10px;
    top: 14px;
}

// .monitorGPU span {
//     position: absolute;
//     right: 10px;
//     top: 14px;
// }
</style>
