<template>
    <div class="d3chart" id="d3chart"></div>
</template>

<script>
/* eslint-disable no-undef */
/*eslint-disable no-unused-vars*/
import data from "../../../../public/static/json/d3data.json";
export default {
    name: "",
    data() {
        return {};
    },
    mounted() {
        this.initd3Chart();
    },
    methods: {
        initd3Chart() {
            var margin = {
                top: 20,
                right: 50,
                bottom: 50,
                left: 90,
            };

            var svgWidth = 1000;
            var svgHeight = 500;

            //创建各个面的颜色数组
            var mainColorList = [
                "#f6e242",
                "#ebec5b",
                "#d2ef5f",
                "#b1d894",
                "#97d5ad",
                "#82d1c0",
                "#70cfd2",
                "#63c8ce",
                "#50bab8",
                "#38a99d",
            ];
            var topColorList = [
                "#e9d748",
                "#d1d252",
                "#c0d75f",
                "#a2d37d",
                "#83d09e",
                "#68ccb6",
                "#5bc8cb",
                "#59c0c6",
                "#3aadab",
                "#2da094",
            ];
            var rightColorList = [
                "#dfce51",
                "#d9db59",
                "#b9d54a",
                "#9ece7c",
                "#8ac69f",
                "#70c3b1",
                "#65c5c8",
                "#57bac0",
                "#42aba9",
                "#2c9b8f",
            ];

            var svg = d3
                .select("#d3chart")
                .append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .attr("id", "svg-column");

            function addXAxis() {
                var transform = d3.geoTransform({
                    point: function (x, y) {
                        this.stream.point(x, y);
                    },
                });
                //定义几何路径
                var path = d3.geoPath().projection(transform);
                var xLinearScale = d3
                    .scaleBand()
                    .domain(
                        data.map(function (d) {
                            return d.letter;
                        })
                    )
                    .range([0, svgWidth - margin.right - margin.left], 0.1);
                var xAxis = d3.axisBottom(xLinearScale).ticks(data.length);
                //绘制X轴
                var xAxisG = svg
                    .append("g")
                    .call(xAxis)
                    .attr(
                        "transform",
                        "translate(" +
                            margin.left +
                            "," +
                            (svgHeight - margin.bottom) +
                            ")"
                    );

                //删除原X轴
                xAxisG.select("path").remove();
                xAxisG.selectAll("line").remove();
                //绘制新的立体X轴
                xAxisG
                    .append("path")
                    .datum({
                        type: "Polygon",
                        coordinates: [
                            [
                                [20, 0],
                                [0, 15],
                                [svgWidth - margin.right - margin.left, 15],
                                [svgWidth + 20 - margin.right - margin.left, 0],
                                [20, 0],
                            ],
                        ],
                    })
                    .attr("d", path)
                    .attr("fill", "rgb(187,187,187)");
                xAxisG
                    .selectAll("text")
                    .attr("font-size", "18px")
                    .attr("fill", "#646464")
                    .attr("transform", "translate(0,20)");

                dataProcessing(xLinearScale); //核心算法
            }
            var yLinearScale;
            //创建y轴的比例尺渲染y轴
            function addYScale() {
                yLinearScale = d3
                    .scaleLinear()
                    .domain([
                        0,
                        d3.max(data, function (d, i) {
                            return d.child.value * 1;
                        }) * 1.2,
                    ])
                    .range([svgHeight - margin.top - margin.bottom, 0]);

                //定义Y轴比例尺以及刻度
                var yAxis = d3.axisLeft(yLinearScale).ticks(6);

                //绘制Y轴
                var yAxisG = svg
                    .append("g")
                    .call(yAxis)
                    .attr(
                        "transform",
                        "translate(" +
                            (margin.left + 10) +
                            "," +
                            margin.top +
                            ")"
                    );
                yAxisG
                    .selectAll("text")
                    .attr("font-size", "18px")
                    .attr("fill", "#636363");
                //删除原Y轴路径和tick
                yAxisG.select("path").remove();
                yAxisG.selectAll("line").remove();
            }
            addXAxis();
            addYScale();

            function dataProcessing(xLinearScale) {
                var angle = Math.PI / 2.3;
                for (var i = 0; i < data.length; i++) {
                    var d = data[i];
                    var depth = 10;
                    d.ow = xLinearScale.bandwidth() * 0.7;
                    d.ox = xLinearScale(d.letter);
                    d.oh = 1;
                    d.p1 = {
                        x: Math.cos(angle) * d.ow,
                        y: -Math.sin(angle) - depth,
                    };
                    d.p2 = {
                        x: d.p1.x + d.ow,
                        y: d.p1.y,
                    };
                    d.p3 = {
                        x: d.p2.x,
                        y: d.p2.y + d.oh,
                    };
                }
            }
            function addColumn() {
                function clumnMouseover(d) {
                    d3.select(this)
                        .selectAll(".transparentPath")
                        .attr("opacity", 0.8);
                    // 添加 div
                    tipTimerConfig.target = this;
                    tipTimerConfig.longer = new Date().getTime();
                    tipTimerConfig.exist = false;
                    //获取坐标
                    tipTimerConfig.winEvent = {
                        x: event.clientX - 100,
                        y: event.clientY,
                    };
                    tipTimerConfig.boxHeight = 50;
                    tipTimerConfig.boxWidth = 140;

                    //hide
                    tipTimerConfig.ClearDiv();
                    //show
                    tipTimerConfig.hoverTimerFn(createTooltipTableData(d));
                }

                function clumnMouseout(d) {
                    d3.select(this)
                        .selectAll(".transparentPath")
                        .attr("opacity", 1);
                    tipTimerConfig.target = null;
                    tipTimerConfig.ClearDiv();
                }

                var g = svg
                    .selectAll(".g")
                    .data(data)
                    .enter()
                    .append("g")
                    .on("mouseover", clumnMouseover)
                    .on("mouseout", clumnMouseout)
                    .attr("transform", function (d) {
                        return (
                            "translate(" +
                            (d.ox + margin.left + 20) +
                            "," +
                            (svgHeight - margin.bottom + 15) +
                            ")"
                        );
                    });
                g.transition()
                    .duration(2500)
                    .attr("transform", function (d) {
                        return (
                            "translate(" +
                            (d.ox + margin.left + 20) +
                            ", " +
                            (yLinearScale(d.child.value) + margin.bottom - 15) +
                            ")"
                        );
                    });

                g.append("rect")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("class", "transparentPath")
                    .attr("width", function (d, i) {
                        return d.ow;
                    })
                    .attr("height", function (d) {
                        return d.oh;
                    })
                    .style("fill", function (d, i) {
                        return mainColorList[i];
                    })
                    .transition()
                    .duration(2500)
                    .attr("height", function (d, i) {
                        return (
                            svgHeight -
                            margin.bottom -
                            margin.top -
                            yLinearScale(d.child.value)
                        );
                    });

                g.append("path")
                    .attr("class", "transparentPath")
                    .attr("d", function (d) {
                        return (
                            "M0,0 L" +
                            d.p1.x +
                            "," +
                            d.p1.y +
                            " L" +
                            d.p2.x +
                            "," +
                            d.p2.y +
                            " L" +
                            d.ow +
                            ",0 L0,0"
                        );
                    })
                    .style("fill", function (d, i) {
                        return topColorList[i];
                    });

                g.append("path")
                    .attr("class", "transparentPath")
                    .attr("d", function (d) {
                        return (
                            "M" +
                            d.ow +
                            ",0 L" +
                            d.p2.x +
                            "," +
                            d.p2.y +
                            " L" +
                            d.p3.x +
                            "," +
                            d.p3.y +
                            " L" +
                            d.ow +
                            "," +
                            d.oh +
                            " L" +
                            d.ow +
                            ",0"
                        );
                    })
                    .style("fill", function (d, i) {
                        return rightColorList[i];
                    })
                    .transition()
                    .duration(2500)
                    .attr("d", function (d, i) {
                        return (
                            "M" +
                            d.ow +
                            ",0 L" +
                            d.p2.x +
                            "," +
                            d.p2.y +
                            " L" +
                            d.p3.x +
                            "," +
                            (d.p3.y +
                                svgHeight -
                                margin.top -
                                margin.bottom -
                                yLinearScale(d.child.value)) +
                            " L" +
                            d.ow +
                            "," +
                            (svgHeight -
                                margin.top -
                                margin.bottom -
                                yLinearScale(d.child.value)) +
                            " L" +
                            d.ow +
                            ",0"
                        );
                    });
            }
            //tip的创建方法(方法来自敬爱的鸣哥)
            var tipTimerConfig = {
                longer: 0,
                target: null,
                exist: false,
                winEvent: window.event,
                boxHeight: 398,
                boxWidth: 376,
                maxWidth: 376,
                maxHeight: 398,
                tooltip: null,

                showTime: 3500,
                hoverTime: 300,
                displayText: "",
                show: function (val, e) {
                    "use strict";
                    var me = this;

                    if (e != null) {
                        me.winEvent = e;
                    }

                    me.displayText = val;

                    me.calculateBoxAndShow();

                    me.createTimer();
                },
                calculateBoxAndShow: function () {
                    "use strict";
                    var me = this;
                    var _x = 0;
                    var _y = 0;
                    var _w = document.documentElement.scrollWidth;
                    var _h = document.documentElement.scrollHeight;
                    var wScrollX = window.scrollX || document.body.scrollLeft;
                    var wScrollY = window.scrollY || document.body.scrollTop;
                    var xMouse = me.winEvent.x + wScrollX;
                    if (_w - xMouse < me.boxWidth) {
                        _x = xMouse - me.boxWidth - 10;
                    } else {
                        _x = xMouse;
                    }

                    var _yMouse = me.winEvent.y + wScrollY;
                    if (_h - _yMouse < me.boxHeight + 18) {
                        _y = _yMouse - me.boxHeight - 25;
                    } else {
                        _y = _yMouse + 18;
                    }

                    me.addTooltip(_x, _y);
                },
                addTooltip: function (page_x, page_y) {
                    "use strict";
                    var me = this;

                    me.tooltip = document.createElement("div");
                    me.tooltip.style.left = page_x + "px";
                    me.tooltip.style.top = page_y + "px";
                    me.tooltip.style.position = "absolute";

                    me.tooltip.style.width = me.boxWidth + "px";
                    me.tooltip.style.height = me.boxHeight + "px";
                    me.tooltip.className = "three-tooltip";

                    var divInnerHeader = me.createInner();
                    divInnerHeader.innerHTML = me.displayText;
                    me.tooltip.appendChild(divInnerHeader);

                    document.body.appendChild(me.tooltip);
                },
                createInner: function () {
                    "use strict";
                    var me = this;
                    var divInnerHeader = document.createElement("div");
                    divInnerHeader.style.width = me.boxWidth + "px";
                    divInnerHeader.style.height = me.boxHeight + "px";
                    return divInnerHeader;
                },
                ClearDiv: function () {
                    "use strict";
                    var delDiv = document.body.getElementsByClassName(
                        "three-tooltip"
                    );
                    for (var i = delDiv.length - 1; i >= 0; i--) {
                        document.body.removeChild(delDiv[i]);
                    }
                },
                createTimer: function (delTarget) {
                    "use strict";
                    var me = this;
                    var delTip = me.tooltip;
                    delTarget = tipTimerConfig.target;
                    var removeTimer = window.setTimeout(function () {
                        try {
                            if (delTip != null) {
                                document.body.removeChild(delTip);
                                if (tipTimerConfig.target == delTarget) {
                                    me.exist = false;
                                }
                            }
                            clearTimeout(removeTimer);
                        } catch (e) {
                            clearTimeout(removeTimer);
                        }
                    }, me.showTime);
                },
                hoverTimerFn: function (showTip, showTarget) {
                    "use strict";
                    var me = this;

                    showTarget = tipTimerConfig.target;

                    var hoverTimer = window.setInterval(function () {
                        try {
                            if (tipTimerConfig.target != showTarget) {
                                clearInterval(hoverTimer);
                            } else if (
                                !tipTimerConfig.exist &&
                                new Date().getTime() - me.longer > me.hoverTime
                            ) {
                                //show
                                tipTimerConfig.show(showTip);
                                tipTimerConfig.exist = true;
                                clearInterval(hoverTimer);
                            }
                        } catch (e) {
                            clearInterval(hoverTimer);
                        }
                    }, tipTimerConfig.hoverTime);
                },
            };

            var createTooltipTableData = function (info) {
                var ary = [];
                ary.push("<div class='tip-hill-div'>");
                ary.push("<h1>品种信息:" + info.letter + "</h1>");
                ary.push("<h2>成交量: " + info.child.value);
                ary.push("</div>");
                return ary.join("");
            };
        }, //init
    },
};
</script>

<style lang="less">
#d3chart {
    height: 800px;
    width: 1200px;
    margin: 0 auto;
    background-color: #aaa;
}
</style>