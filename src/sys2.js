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
        this.getEchartServer(this.state.req);
    }

    getColor(){
        return 'yellow'
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
                    data: ['Normal', 'Warning', 'Critical', 'Fatal', 'Online gNodeB', 'Online UE']
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        // prettier-ignore
                        data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
                    }
                ],
                yAxis: [
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
                        barGap: 0
                    },
                    {
                        name: 'Normal',
                        type: 'bar',
                        center: ['50%', '100%'],
                        data: [
                            2, 4, 7, 23, 25, 28, 35, 62, 32, 20, 6, 3
                        ]
                    },
                    {
                        name: 'Warning',
                        type: 'bar',
                        center: ['50%', '100%'],
                        data: [
                            62, 11, 21, 6, 13, 2, 4, 7, 11, 25, 22, 1
                        ]
                    },
                    {
                        name: 'Critical',
                        type: 'bar',
                        center: ['50%', '100%'],
                        data: [
                            13, 1, 22, 11, 13, 2, 4, 7, 44, 25, 66, 1
                        ]
                    },
                    {
                        name: 'Fatal',
                        type: 'bar',
                        center: ['50%', '100%'],
                        data: [
                            23, 11, 20, 6, 13, 12, 4, 44, 33, 11, 22, 1
                        ]
                    },
                    {
                        name: 'Online gNodeB',
                        type: 'line',
                        center: ['50%', '100%'],
                        data: [
                            12, 59, 90, 26, 28, 70, 75, 82, 48, 18, 6, 23
                        ]
                    },
                    {
                        name: 'Online UE',
                        type: 'line',
                        center: ['50%', '100%'],
                        data: [
                            22, 12, 33, 45, 63, 10, 20, 23, 23, 16, 12, 6]
                    }
                    /*,
                    {
                        type: 'pie',
                        center: ['89%', '25%'],
                        radius: ['15%', '22%'],
                        name: 'cpu',
                        data: [{
                            value: 22,
                            name: 'cpu',
                            label: {
                                position: 'center',
                                formatter: + '22%\n' + 'cpu',
                                textStyle: {
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: 12
                                }
                            },
                            itemStyle: {
                                color: 'black'
                            }
                        }, {
                            value: 33,
                            name: 'free',
                            label: {
                                show: true,
                                textStyle: {
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: 12
                                }
                            },
                            itemStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        }]
                    }, {
                        type: 'pie',
                        center: ['75%', '25%'],
                        radius: ['15%', '22%'],
                        data: [{
                            value: 22,
                            name: '硬盘',
                            label: {
                                position: 'center',
                                formatter: + '22%\n' + '硬盘',
                                textStyle: {
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: 12
                                }
                            },
                            itemStyle: {
                                color: 'yellow'
                            }
                        }, {
                            value: 22,
                            name: '',
                            label: {
                                show: false
                            },
                            itemStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        }]
                    }, {
                        type: 'pie',
                        center: ['62.5%', '50%'],
                        radius: ['75%', '90%'],
                        data: [{
                            value: 22,
                            name: '内存',
                            label: {
                                position: 'center',
                                formatter: '33%\n' + '内存',
                                textStyle: {
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: 12
                                }
                            },
                            itemStyle: {
                                color: 'yellow'
                            }
                        }, {
                            value: 22,
                            name: '',
                            label: {
                                show: false
                            },
                            itemStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        }]
                    }, {
                        type: 'pie',
                        center: ['87.5%', '50%'],
                        radius: ['75%', '90%'],
                        data: [{
                            value: 22,
                            name: '网口',
                            label: {
                                position: 'center',
                                formatter: "33% " + '网口',
                                textStyle: {
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: 12
                                }
                            },
                            itemStyle: {
                                color: 'yellow'
                            }
                        }, {
                            value: 22,
                            name: '',
                            label: {
                                show: false
                            },
                            itemStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        }]
                    }*/
                ]//'CPU', 'DISK', 'RAM', 'Pods'
            };
            myChart.setOption(option);
        });
    }

    getEchartServer(req){
        var self = this;
        $.getJSON(ROOT_PATH + '127.0.0.1:3000/display/topo?ip=' + req, function (resp) {
            var graph = resp.data
            self.setState({req : req});
            self.setState({ts : graph.ts,ips : graph.ips});

            var serverDom = document.getElementById('ServerDom');
            var serverChart = echarts.init(serverDom);
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
                    data: ['Normal', 'Warning', 'Critical', 'Fatal', 'Online gNodeB', 'Online UE']
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
                        center: ['50%', '100%'],
                        data: [
                            2, 4, 7, 23, 25, 28, 35, 62, 32, 20, 6, 3
                        ]
                    },
                    {
                        name: 'Warning',
                        type: 'bar',
                        center: ['50%', '100%'],
                        data: [
                            62, 11, 21, 6, 13, 2, 4, 7, 11, 25, 22, 1
                        ]
                    },
                    {
                        name: 'Critical',
                        type: 'bar',
                        center: ['50%', '100%'],
                        data: [
                            13, 1, 22, 11, 13, 2, 4, 7, 44, 25, 66, 1
                        ]
                    },
                    {
                        name: 'Fatal',
                        type: 'bar',
                        center: ['50%', '100%'],
                        data: [
                            23, 11, 20, 6, 13, 12, 4, 44, 33, 11, 22, 1
                        ]
                    },
                    {
                        name: 'Online gNodeB',
                        type: 'line',
                        center: ['50%', '100%'],
                        data: [
                            12, 59, 90, 26, 28, 70, 75, 82, 48, 18, 6, 23
                        ]
                    },
                    {
                        name: 'Online UE',
                        type: 'line',
                        center: ['50%', '100%'],
                        data: [
                            22, 12, 33, 45, 63, 10, 20, 23, 23, 16, 12, 6]
                    }/*,
                    {
                        type: 'pie',
                        center: ['89%', '25%'],
                        radius: ['15%', '22%'],
                        name: 'cpu',
                        data: [{
                            value: 22,
                            name: 'cpu',
                            label: {
                                position: 'center',
                                formatter: + '22%\n' + 'cpu',
                                textStyle: {
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: 12
                                }
                            },
                            itemStyle: {
                                color: 'black'
                            }
                        }, {
                            value: 33,
                            name: 'free',
                            label: {
                                show: true,
                                textStyle: {
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: 12
                                }
                            },
                            itemStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        }]
                    }, {
                        type: 'pie',
                        center: ['75%', '25%'],
                        radius: ['15%', '22%'],
                        data: [{
                            value: 22,
                            name: '硬盘',
                            label: {
                                position: 'center',
                                formatter: + '22%\n' + '硬盘',
                                textStyle: {
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: 12
                                }
                            },
                            itemStyle: {
                                color: 'yellow'
                            }
                        }, {
                            value: 22,
                            name: '',
                            label: {
                                show: false
                            },
                            itemStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        }]
                    }, {
                        type: 'pie',
                        center: ['62.5%', '50%'],
                        radius: ['75%', '90%'],
                        data: [{
                            value: 22,
                            name: '内存',
                            label: {
                                position: 'center',
                                formatter: '33%\n' + '内存',
                                textStyle: {
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: 12
                                }
                            },
                            itemStyle: {
                                color: 'yellow'
                            }
                        }, {
                            value: 22,
                            name: '',
                            label: {
                                show: false
                            },
                            itemStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        }]
                    }, {
                        type: 'pie',
                        center: ['87.5%', '50%'],
                        radius: ['75%', '90%'],
                        data: [{
                            value: 22,
                            name: '网口',
                            label: {
                                position: 'center',
                                formatter: "33% " + '网口',
                                textStyle: {
                                    color: 'rgba(255,255,255,0.7)',
                                    fontSize: 12
                                }
                            },
                            itemStyle: {
                                color: 'yellow'
                            }
                        }, {
                            value: 22,
                            name: '',
                            label: {
                                show: false
                            },
                            itemStyle: {
                                color: 'rgba(255,255,255,.2)'
                            }
                        }]
                    }*/
                ]//'CPU', 'DISK', 'RAM', 'Pods'
            };
            serverChart.setOption(option);
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
                    <div style={{width:3000,height:1000}}>
                        <span id = "ServerDom" style={{width:1000,height:1000}}></span>
                        <span id = "chartDom" style={{width:1000,height:1000}}></span>
                    </div>
            </div>

        )
    }


}

export default App;
