import './App.css';
import React, {Component} from 'react';
import * as echarts from 'echarts';
import $ from  'jquery'

var ROOT_PATH = 'http://';


class App extends  Component{
    componentDidMount(){
        var chartDom = document.getElementById('chartDom');
        var myChart = echarts.init(chartDom);
        var option;

        myChart.showLoading();
        $.getJSON(ROOT_PATH + '127.0.0.1:8080/xxxxx', function (graph) {
            console.log("graph",graph.links)
            myChart.hideLoading();
            option = {
                title: {
                    align: 'left',
                    text: 'Topo'
                },
                tooltip: {
                    formatter: (value) => {
                        var str = ""
                        if (value.value != null) {
                            var optStatus =
                                value.name === null
                                    ? "-"
                                    : value.name
                            var adminStatus =
                                value.name === null
                                    ? "-"
                                    : value.name
                            str =
                                "<b>" +
                                value.name +
                                "</b><br/>" +
                                "运行状态：" +
                                optStatus +
                                "<br/>" +
                                "管理状态：" +
                                adminStatus +
                                "<br/>"
                            if (value.value != null) {
                                str +=
                                    "告警信息：" +
                                    "<br/>" +
                                    "<div style='width:15px;height:15px;border-radius:50%;background:" +
                                    "#F56C6C" +
                                    "'><span style='left: 40px;position: absolute'>严重告警:" + value.value + "<span></div>" +
                                    "<div style='width:15px;height:15px;border-radius:50%;background:" +
                                    "#E6A23C" +
                                    "'><span style='left: 40px;position: absolute'>主要告警:" + value.value + "<span></div>" +
                                    "<div style='width:15px;height:15px;border-radius:50%;background:" +
                                    "#f4ea2a"+
                                    "'><span style='left: 40px;position: absolute'>次要告警:" + value.value + "<span></div>" +
                                    "<div style='width:15px;height:15px;border-radius:50%;background:" +
                                    "#409EFF" +
                                    "'><span style='left: 40px;position: absolute'>普通告警:" + value.value + "<span></div>"
                            }
                        }
                        return str
                    }
                },
                legend: [
                    {
                        data: graph.categories.map(function (a) {
                            return a.name;
                        })
                    }
                ],
                series: [
                    {
                        name: 'Topo',
                        type: 'graph',
                        edgeSymbol: ['','arrow'],
                        edgeSymbolSize: 10,  /*边两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定*/
                        layout: 'none',  /* 图的布局, 'none' 不采用任何布局接口xy指定位置, 'circular' 采用环形布局,'force' 采用力引导布局*/
                        data: graph.nodes,
                        links: graph.links,
                        categories: graph.categories, /*节点分类的类目*/
                        roam: true, /*是否开启鼠标缩放和平移漫游*/
                        draggable: true, /*是否支持拖拽   只有layout 为 force 的时候才可以用*/
                        focusNodeAdjacency: true,  //鼠标放置上去 显示当前的连接
                        animation: true, //是否需要加载
                        animationDurationUpdate: 2000,//加载动画时间
                        label: {
                            show: true
                        },
                        edgeLabel: {
                            fontSize: 20
                        },
                        /*labelLayout: {
                            hideOverlap: true /!*是否隐藏重叠的标签*!/
                        },*/
                        scaleLimit: {
                            min: 0.4,
                            max: 2
                        },
                        lineStyle: {
                            color: 'source',
                            curveness: 0.3
                        }
                    }
                ],
                force: {
                    layoutAnimation: false
                }
            };
            myChart.setOption(option);
            myChart.on('mouseup', function (params) {
                var option = myChart.getOption();
                console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",option.series[0].data[params.dataIndex].x,option.series[0].data[params.dataIndex].y)
                option.series[0].data[params.dataIndex].x = option.series[0].data[params.dataIndex].x - params.event.offsetX/200;
                option.series[0].data[params.dataIndex].y = option.series[0].data[params.dataIndex].y - params.event.offsetY/200;
                console.log(option.series[0].data[params.dataIndex].x, option.series[0].data[params.dataIndex].y)
                console.log("xxxxxxxxxxxxxxxxxxxxxxx",params.event.offsetX/100,params.event.offsetY/100)
                option.series[0].data[params.dataIndex].fixed = true;
                myChart.setOption(option);
                console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",params.event.offsetX,params.event.offsetY)
                console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",params.event.pinchX,params.event.pinchY)
                console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",option.series[0].data[params.dataIndex].x,option.series[0].data[params.dataIndex].y)
            });
            myChart.on("click", params => {
                var option = myChart.getOption();
                const { properties, dataIndex, nodeType } = params.event.target
                option.prevIndex = dataIndex
                option.highlight(dataIndex, myChart)
                const entityProperties = {
                    ...properties,
                    type: nodeType
                }
                this.$store.commit("jobInstance/SET_HIGHLIGHTENTITY", entityProperties);
            })
        });
    }

    render() {
        return (
            <div className="App">
                <div id = "chartDom" style={{width:2000,height:1000}}>
                </div>
            </div>
        )
    }


}

export default App;
