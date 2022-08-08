import './App.css';
import React, {Component} from 'react';
import * as echarts from 'echarts';
import $ from  'jquery'

var ROOT_PATH = 'http://';


class App extends  Component{
    constructor() {
        super();
        this.state = {ips : null, reload:false, req : "", ts : 0};
        this.selectChange = this.handleSelectChange.bind(this);
    }

    handleResize =() => {
        this.getEchart(this.state.req);
    }

    handleSelectChange (e) {
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", e.target.value);
        this.getEchart(e.target.value);
    }


/*    getData(){
        Axios.get(ROOT_PATH + '127.0.0.1:3000/display/topo',{params:{ip:this.state.ips}}).then((res) => {
            console.log("zzzzzzzzzzzzzzz",res.data.data.ips);
            this.setState({ips : res.data.data.ips});
            console.log("wwwwwwwwwwwwwwwwwwwww",this.state.ips);
        });
    }*/

    componentDidMount() {
        this.timer = setInterval(() => this.handleResize(), 5000);
        this.getEchart(this.state.req);
    }

    getEchart(req){
        var self = this;
        $.getJSON(ROOT_PATH + '127.0.0.1:3000/display/topo?ip=' + req, function (resp) {
            var graph = resp.data
            self.setState({req : req});
            self.setState({ts : graph.ts,ips : graph.ips});

            var chartDom = document.getElementById('chartDom');
            var myChart = echarts.init(chartDom);
            var option;
            const colors = ['#5470C6', '#91CC75', '#EE6666'];
            option = {
                color: colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {
                    right: '20%'
                },
                toolbox: {
                    feature: {
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ['Normal', 'Warning', 'Critical', 'Fatal', 'Online gNodeB', 'Online UE', 'CPU', 'DISK', 'RAM', 'Pods']
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        // prettier-ignore
                        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'resources %',
                        position: 'right',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    },
                    {
                        type: 'value',
                        name: 'number',
                        position: 'left',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[2]
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name: 'Normal',
                        type: 'bar',
                        data: [
                            2, 4, 7, 23, 25, 28, 35, 62, 32, 20, 6, 3
                        ]
                    },
                    {
                        name: 'Warning',
                        type: 'bar',
                        data: [
                            62, 11, 21, 6, 13, 2, 4, 7, 11, 25, 22, 1
                        ]
                    },
                    {
                        name: 'Critical',
                        type: 'bar',
                        data: [
                            13, 1, 22, 11, 13, 2, 4, 7, 44, 25, 66, 1
                        ]
                    },
                    {
                        name: 'Fatal',
                        type: 'bar',
                        data: [
                            23, 11, 20, 6, 13, 12, 4, 44, 33, 11, 22, 1
                        ]
                    },
                    {
                        name: 'Online gNodeB',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [
                            12, 59, 90, 26, 28, 70, 75, 82, 48, 18, 6, 23
                        ]
                    },
                    {
                        name: 'Online UE',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [
                            22, 12, 33, 45, 63, 10, 20, 23, 23, 16, 12, 6]
                    },
                    {
                        name: 'CPU',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [33, 22, 33, 45, 63, 10, 33, 33, 33, 33, 33, 34]
                    },
                    {
                        name: 'DISK',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [44, 33, 44, 51, 63, 77, 44, 44, 33, 44, 55, 54]
                    },
                    {
                        name: 'RAM',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [55, 22, 55, 55, 44, 33, 55, 55, 66, 66, 61, 36]
                    },
                    {
                        name: 'Pods',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [155, 122, 155, 155, 144, 133, 155, 155, 166, 166, 161, 136]
                    }
                ]//'CPU', 'DISK', 'RAM', 'Pods'
            };
            myChart.setOption(option);
        });
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    // 每次UI更新时被调用
    componentDidUpdate() {
        console.log("Clock did update");
    }

    showIp(){
        let arr = []
        arr.push(<option value="" className="active">全部</option>);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",this.state.ips)
        if (this.state.ips){
            this.state.ips.forEach((item,index)=>{
                arr.push(<option value={item.value} className="active" >{item.name}</option>);
            });
        }
        return arr;
    }

    render() {
        return (
            <div className="App">
                <div>
                    <select id="ip_data" onChange={this.selectChange}>
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
