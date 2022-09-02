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

    getColor(){
        return 'yellow'
    }

    getEchart(req){
        var self = this;
        $.getJSON(ROOT_PATH + '127.0.0.1:3000/render/info?ip=' + req, function (resp) {
            self.setState({req : req});
            var graph = resp.data
            self.setState({ts : graph.ts,ips : graph.ips});
            //基于准备好的DOM初始化echarts实例
            let dom1 = document.querySelector('.box1');
            let dom2 = document.querySelector('.box2');
            //创建echarts实例
            let mycharts1 = echarts.init(dom1);
            let mycharts2 = echarts.init(dom2);
            console.log("111111111111111111111111111111111111111",graph.charts1)
            //指定图表的配置项与数据
            mycharts1.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}({d}%)'
                },
                toolbox: {
                    show: false
                },
                series:graph.charts1,
              /*  series:[
                    {
                        name: 'CPU',
                        type: 'pie',
                        radius: ["50", "90"],
                        center: ['50%', '25%'],
                        roseType: 'radius',
                        data: [
                            {value: 40, name: 'free'},
                            {value: 60, name: 'used'}
                        ],
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                color:'#4c4a4a',
                                formatter: 'CPU 60%',
                                fontSize: 18
                            },
                            emphasis: {//中间文字显示
                                show: true,
                            }
                        }
                    },
                    {
                        name: 'Memory',
                        type: 'pie',
                        radius: [50, 90],
                        center: ['51%', '48%'],
                        roseType: 'radius',
                        data: [
                            {value: 51, name: 'free'},
                            {value: 23, name: 'used'}
                        ],
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                color:'#4c4a4a',
                                formatter: 'Memory 60%',
                                fontSize: 18
                            },
                            emphasis: {//中间文字显示
                                show: true,
                            }
                        }
                    },
                    {
                        name: 'Disk',
                        type: 'pie',
                        radius: [50, 90],
                        center: ['50%', '75%'],
                        roseType: 'radius',
                        data: [
                            {value: 33, name: 'free'},
                            {value: 67, name: 'used'}
                        ],
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                color:'#4c4a4a',
                                formatter: 'Disk 40%',
                                fontSize: 18
                            },
                            emphasis: {//中间文字显示
                                show: true,
                            }
                        }
                    }
                ]*/
            });
            //第二个图表的配置项
            //const colors = ['#5470C6', '#91CC75', '#EE6666'];

            mycharts2.setOption({
                //color: colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                /*                grid: {
                                    right: '20%'
                                },*/
                /*                toolbox: {
                                    show: true
                                },*/
                legend: {
                    data: ['Normal', 'Warning', 'Critical', 'Fatal', 'Online gNodeB', 'Online UE']
                },
                xAxis: {
                    type: 'time',
                    /*                        axisTick: {
                                                alignWithLabel: true
                                            },*/
                    boundaryGap: false,
                    name: 'time',
                    axisLabel:{
                        interale: 0,
                        rotate: -40,
                        formatter: function (value) {

                            var t_date = new Date(value);

                            return [t_date.getFullYear(), t_date.getMonth() + 1, t_date.getDate()].join('/') + " "

                                + [t_date.getHours(), t_date.getMinutes(), t_date.getSeconds()].join(':');

                        }
                    }
                },
                yAxis: [
                    {
                        type: 'value',
                        name: 'number',
                        position: 'left',
                        alignTicks: true,
                        axisLine: {
                            show: true,
                            /*                            lineStyle: {
                                                           // color: colors[2]
                                                        }*/
                        },
                        /*                        axisLabel: {
                                                    formatter: '{value}'
                                                }*/
                    }
                ],
                series: graph.charts2.series,
     /*           series: [
                    {
                        name: 'Normal',
                        type: 'bar',
                        //center: ['50%', '100%'],
                        data: [
                            ['2020-11-26 00:00:00',2], ['2020-11-26 00:01:00',12],['2020-11-26 00:02:00',22],['2020-11-26 00:03:00',3],['2020-11-26 00:05:00',7],['2020-11-26 00:06:00',2],['2020-11-26 00:07:00',2],['2020-11-26 00:08:00',2],['2020-11-26 00:09:00',2],['2020-11-26 00:10:00',12],['2020-11-26 00:11:00',2],['2020-11-26 00:12:00',2],['2020-11-26 00:13:00',15],
                        ]
                    },
                    {
                        name: 'Warning',
                        type: 'bar',
                        //center: ['50%', '100%'],
                        data: [
                            ['2020-11-26 00:00:00',2], ['2020-11-26 00:01:00',12],['2020-11-26 00:02:00',3],['2020-11-26 00:03:00',23],['2020-11-26 00:05:00',7],['2020-11-26 00:06:00',2],['2020-11-26 00:07:00',2],['2020-11-26 00:08:00',4],['2020-11-26 00:09:00',12],['2020-11-26 00:10:00',4],['2020-11-26 00:11:00',17],['2020-11-26 00:12:00',11],['2020-11-26 00:13:00',5],
                        ]
                    },
                    {
                        name: 'Critical',
                        type: 'bar',
                        //center: ['50%', '100%'],
                        data: [
                            ['2020-11-26 00:00:00',12], ['2020-11-26 00:01:00',3],['2020-11-26 00:02:00',11],['2020-11-26 00:03:00',3],['2020-11-26 00:05:00',7],['2020-11-26 00:06:00',2],['2020-11-26 00:07:00',2],['2020-11-26 00:08:00',3],['2020-11-26 00:09:00',2],['2020-11-26 00:10:00',12],['2020-11-26 00:11:00',3],['2020-11-26 00:12:00',4],['2020-11-26 00:13:00',5],
                        ]
                    },
                    {
                        name: 'Fatal',
                        type: 'bar',
                        //center: ['50%', '100%'],
                        data: [
                            ['2020-11-26 00:00:00',21], ['2020-11-26 00:01:00',5],['2020-11-26 00:02:00',22],['2020-11-26 00:03:00',13],['2020-11-26 00:05:00',7],['2020-11-26 00:06:00',2],['2020-11-26 00:07:00',2],['2020-11-26 00:08:00',2],['2020-11-26 00:09:00',5],['2020-11-26 00:10:00',4],['2020-11-26 00:11:00',7],['2020-11-26 00:12:00',2],['2020-11-26 00:13:00',5],
                        ]
                    },
                    {
                        name: 'Online gNodeB',
                        type: 'line',
                        //center: ['50%', '100%'],
                        data: [
                            ['2020-11-25 23:59:22',3], ['2020-11-26 00:01:00',15],['2020-11-26 00:02:00',22],['2020-11-26 00:03:00',13],['2020-11-26 00:05:00',7],['2020-11-26 00:06:00',2],['2020-11-26 00:07:00',2],['2020-11-26 00:08:00',2],['2020-11-26 00:09:00',5],['2020-11-26 00:10:00',4],['2020-11-26 00:11:00',7],['2020-11-26 00:12:00',2],['2020-11-26 00:13:00',5],
                        ]
                    },
                    {
                        name: 'Online UE',
                        type: 'line',
                        //center: ['50%', '100%'],
                        data: [
                            ['2020-11-26 00:00:11',22], ['2020-11-26 00:01:00',4],['2020-11-26 00:02:00',22],['2020-11-26 00:03:00',13],['2020-11-26 00:05:00',7],['2020-11-26 00:06:00',2],['2020-11-26 00:07:00',2],['2020-11-26 00:08:00',2],['2020-11-26 00:09:00',5],['2020-11-26 00:10:00',4],['2020-11-26 00:11:00',7],['2020-11-26 00:12:00',2],['2020-11-26 00:13:00',5],
                        ]
                    }
                ]*/
            })
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
                <div className="box1" id = "box1" style={{float:"left",width:"25%",height:1000}}></div>
                <div className="box2" id = "box2" style={{float:"left",width:"75%",height:1000}}></div>
            </div>

        )
    }


}

export default App;
