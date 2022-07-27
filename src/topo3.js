import './App.css';
import React, {Component} from 'react';
import * as echarts from 'echarts';
import $ from  'jquery'
import Axios from "axios";

var ROOT_PATH = 'http://';


class App extends  Component{
    constructor() {
        super();
        this.state = {ips : null, reload:false};
    }

    handleResize =() => {
        this.setState({
            reload:true,
        },() => {
            this.setState({reload: true});
        });
    }

    getData(){
        Axios.get(ROOT_PATH + '127.0.0.1:8080/xxxxx').then((res) => {
            console.log("zzzzzzzzzzzzzzz",res.data.nodes);
            this.setState({ips : res.data.nodes});
            console.log("wwwwwwwwwwwwwwwwwwwww",this.state.ips);
        });
    }

    componentDidMount(){
        this.timer = setInterval(() => this.handleResize(), 5000);
        this.getData();
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
                                    "'><span style='left: 30px;position: absolute'>严重告警:" + value.value + "<span></div>" +
                                    "<div style='width:15px;height:15px;border-radius:50%;background:" +
                                    "#E6A23C" +
                                    "'><span style='left: 30px;position: absolute'>主要告警:" + value.value + "<span></div>" +
                                    "<div style='width:15px;height:15px;border-radius:50%;background:" +
                                    "#f4ea2a"+
                                    "'><span style='left: 30px;position: absolute'>次要告警:" + value.value + "<span></div>" +
                                    "<div style='width:15px;height:15px;border-radius:50%;background:" +
                                    "#409EFF" +
                                    "'><span style='left: 30px;position: absolute'>普通告警:" + value.value + "<span></div>"
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
/*            myChart.on("click", params => {
                var option = myChart.getOption();
                const { properties, dataIndex, nodeType } = params.event.target
                option.prevIndex = dataIndex
                option.highlight(dataIndex, myChart)
                const entityProperties = {
                    ...properties,
                    type: nodeType
                }
                this.$store.commit("jobInstance/SET_HIGHLIGHTENTITY", entityProperties);
            });
            myChart.on('mouseover', e => {
                let op = myChart.getOption()
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: e.dataIndex,
                    color: e.color
                })
                myChart.setOption(op, true)
            })*/
            myChart.on("mouseover", _ => {
                myChart.dispatchAction({
                    type: 'downplay'
                });
            })
        });
    }
    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    showIp(){
        let arr = []
        arr.push(<option value="0" className="active">全部</option>);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",this.state.ips)
        if (this.state.ips){
            this.state.ips.forEach((item,index)=>{
                arr.push(<option value={item.value} className="active"  onClick={() => this.getData(item.value)}>{item.name}</option>);
            });
        }
        return arr;
    }

    render() {
        return (
            <div className="App">
                <div>
                    <select id="ip_data">
                        {this.showIp()}
                    </select>
                </div>
                <div id = "chartDom" style={{width:2000,height:1000}}>
                </div>
            </div>
        )
    }


}

export default App;
