<template>
    <div class="b-header">
        <Menu mode="horizontal" theme="dark" active-name="baidumap" @on-select="checkMenu">
            <MenuItem name="home">
                <Icon type="ios-paper" />首页
            </MenuItem>
            <Submenu name="2dmap">
                <template slot="title">
                    <Icon type="ios-stats" />地图
                </template>
                <MenuGroup title="2dmap">
                    <MenuItem v-for="(item, index) in mapList" :key="index" :name="item.name">
                        <Icon :type="item.icon" />
                        {{ item.content }}
                    </MenuItem>
                </MenuGroup>
            </Submenu>
            <Submenu name="3dmap">
                <template slot="title">
                    <Icon type="ios-stats" />三维地图
                </template>
                <MenuGroup title="3dmap">
                    <MenuItem v-for="(item, index) in threeMapList" :key="index" :name="item.name">
                        <Icon :type="item.icon" />
                        {{ item.content }}
                    </MenuItem>
                </MenuGroup>
            </Submenu>
            <MenuItem name="other">
                <Icon type="ios-construct" />其他
            </MenuItem>
        </Menu>
    </div>
</template>
<script>
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
        };
    },
    methods: {
        checkMenu(name) {
            // console.log(this.mapList1);
            this.$router.push({
                path: name,
            });
        },
    },
};
</script>
<style lang="less">
.b-header {
    width: 100%;
}
</style>
