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
                    formatter: function (params) {
                        return '<p>网元：' + params.name + '</p>' +
                        '<p>数量：' + params.value + '</p>' +
                        '<p>alarm：' + params.value + '</p>' +
                        '<p>time：' + params.value + '</p>'
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
                ]
            };
            myChart.setOption(option);
        });
    }

    render() {
        return (
            <div className="App">
                <div id = "chartDom" style={{width:2000,height:800}}>
                </div>
            </div>
        )
    }


}

export default App;
