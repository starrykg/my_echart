import './App.css';
import React, {Component} from 'react';
import * as echarts from 'echarts';
var ROOT_PATH = 'https://echarts.apache.org/examples';


class App extends  Component{
    componentDidMount(){
        let myChart = echarts.init(document.getElementById("chartPie"));
        console.log(myChart);

        myChart.showLoading();
        $.getJSON(ROOT_PATH + '/data/asset/data/les-miserables.json', function (graph) {
            myChart.hideLoading();
            option = {
                title: {
                    align: 'left',
                    text: 'Topo',
                    textStyle: {
                        color : '#008080',
                        fontSize: 12
                    },
                    subtext : 12,
                    subtextStyle: {
                        color : '#000000',
                        fontSize: 22
                    }
                },
                tooltip: {
                    formatter: '<p>{name}</p> <p>{value}</p>'
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
                        name: 'Les Miserables',
                        type: 'graph',
                        layout: 'none',
                        data: graph.nodes,
                        links: graph.links,
                        categories: graph.categories,
                        roam: true,
                        label: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        },
                        labelLayout: {
                            hideOverlap: true
                        },
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
        }););
    }

    render() {
        return (
            <div className="App">
                <div id = "chartPie" style={{width:800,height:300}}>
                </div>
            </div>
        )
    }


}

export default App;
