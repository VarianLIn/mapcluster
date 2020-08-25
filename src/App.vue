
<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    created: function () {
        this.$router.push("/view");
    },
    mounted() {},
    beforeDestroy() {},
    methods: {},
};
</script>
