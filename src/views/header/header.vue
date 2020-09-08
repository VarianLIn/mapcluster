<template>
    <div class="b-header">
        <Menu mode="horizontal" theme="dark" active-name="baidumap" @on-select="checkMenu">
            <MenuItem name="home">
                <Icon custom="iconfont icon-shouye"></Icon>首页
            </MenuItem>
            <Submenu name="2DView">
                <template slot="title">
                    <Icon custom="iconfont icon-ditu1"></Icon>地图
                </template>
                <MenuGroup title="2D-View">
                    <MenuItem v-for="(item, index) in mapList[0]" :key="index" :name="item.name">
                        <Icon :custom="item.icon"></Icon>
                        {{ item.content }}
                    </MenuItem>
                </MenuGroup>
            </Submenu>
            <Submenu name="3DView">
                <template slot="title">
                    <Icon custom="iconfont icon-dditu"></Icon>三维地图
                </template>
                <MenuGroup title="3D-View">
                    <MenuItem v-for="(item, index) in mapList[1]" :key="index" :name="item.name">
                        <Icon :custom="item.icon"></Icon>
                        {{ item.content }}
                    </MenuItem>
                </MenuGroup>
            </Submenu>
            <Submenu name="Charts">
                <template slot="title">
                    <Icon custom="iconfont icon-qita"></Icon>图表
                </template>
                <MenuGroup title="Charts">
                    <MenuItem name="echarts">
                        <Icon custom="iconfont icon-qita"></Icon>echart3d柱形图
                    </MenuItem>
                    <MenuItem name="d3chart">
                        <Icon custom="iconfont icon-qita"></Icon>d3图表
                    </MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem name="other">
                <Icon custom="iconfont icon-qita"></Icon>其他
            </MenuItem>
            <Button
                :type="loading?'error':'info'"
                :title="loading?'关闭GPU监测':'打开GPU监测'"
                class="Monitor"
                @click="toggleMonitor"
            >
                <Icon :type="loading?'ios-power':'ios-pulse'"></Icon>
            </Button>
        </Menu>
        <!--  -->
        <Breadcrumb class="mainBC">
            <BreadcrumbItem to="/view/home">
                <Icon custom="iconfont icon-shouye" size="12" />&nbsp; 首页
            </BreadcrumbItem>
            <BreadcrumbItem>
                <Icon custom="iconfont icon-shouye" size="12" ref="bcIcon" />
                <span ref="bcText">首页</span>
            </BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>
<script>
/* eslint-disable no-undef */
/*eslint-disable no-unused-vars*/
import { status } from "../../render";
export default {
    data() {
        return {
            // mapList1: this.$router.options.routes[0].children,
            mapList: [
                [
                    {
                        index: 6,
                        name: "jxmapdemo",
                        content: "江西地图demo",
                        icon: "iconfont icon-ditu",
                    },
                    {
                        index: 1,
                        name: "baidumap",
                        content: "百度地图",
                        icon: "iconfont icon-baiduditu",
                    },
                    {
                        index: 2,
                        name: "gaodemap",
                        content: "高德地图",
                        icon: "iconfont icon-gaode",
                    },
                    {
                        index: 3,
                        name: "geoglobemap",
                        content: "GeoGlobe",
                        icon: "iconfont icon-mapbox",
                    },
                    {
                        index: 4,
                        name: "echartsMinage",
                        content: "echarts迁徙图",
                        icon: "iconfont icon-chengshiqianxitu",
                    },
                    {
                        index: 5,
                        name: "ggMinage",
                        content: "GeoGlobe迁徙图",
                        icon: "iconfont icon-qianxitu",
                    },
                ], // 2d_map
                [
                    {
                        index: 6,
                        name: "3dGlobe",
                        content: "三维地球",
                        icon: "iconfont icon-Dqianxitu",
                    },
                    {
                        index: 7,
                        name: "3dmigrationMap",
                        content: "三维迁徙",
                        icon: "iconfont icon-Dqianxitu",
                    },
                ], // 3d_map
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
            this.$router.push({
                path: name,
            });
            this.$router.options.routes[0].children.forEach((value) => {
                if (value.path == name) {
                    this.bottomstatus = value.meta.bottom;
                    this.$refs.bcIcon.$el.className = value.meta.icon;
                    this.$refs.bcText.innerText = value.meta.title;
                }
            });
            this.$emit("bottomStatusSet", this.bottomstatus);
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

.mainBC {
    height: 20px;
    margin: 5px 0 5px 15px;
    i {
        vertical-align: middle;
    }
}

// .monitorGPU span {
//     position: absolute;
//     right: 10px;
//     top: 14px;
// }
</style>