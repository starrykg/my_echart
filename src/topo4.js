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
            self.setState({req : req});
            var graph = resp.data
            console.log("llllllllllllllllllllllllllllllllllll",graph.ts)
             if (graph.ts > self.state.ts) {
                 self.setState({ts : graph.ts,ips : graph.ips});
                console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",req);
                var chartDom = document.getElementById('chartDom');
                var myChart = echarts.init(chartDom);
                var option;

                myChart.showLoading();
                //self.getData()
                console.log("graph==================================",graph)
                myChart.hideLoading();
                option = {
                    title: {
                        align: 'left',
                        text: 'Topo'
                    },
                    tooltip: {
                        formatter: (value) => {
                            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",value)
                            var str = ""
                            if (value.data.val != null){

                                str =  '<div><span>value.data.label.formatter</span>'+value.val+'</div>' +
                                    '<div><span>port???</span>'+value.data.val+'</div>' +
                                    '<div><span>ps???</span>'+value.data.val+'</div>';
                            }
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
                                    "???????????????" +
                                    optStatus +
                                    "<br/>" +
                                    "???????????????" +
                                    adminStatus +
                                    "<br/>"
                                if (value.value != null) {
                                    str +=
                                        "???????????????" +
                                        "<br/>" +
                                        "<div style='width:15px;height:15px;border-radius:50%;background:" +
                                        "#F56C6C" +
                                        "'><span style='left: 30px;position: absolute'>????????????:" + value.value + "<span></div>" +
                                        "<div style='width:15px;height:15px;border-radius:50%;background:" +
                                        "#E6A23C" +
                                        "'><span style='left: 30px;position: absolute'>????????????:" + value.value + "<span></div>" +
                                        "<div style='width:15px;height:15px;border-radius:50%;background:" +
                                        "#f4ea2a"+
                                        "'><span style='left: 30px;position: absolute'>????????????:" + value.value + "<span></div>" +
                                        "<div style='width:15px;height:15px;border-radius:50%;background:" +
                                        "#409EFF" +
                                        "'><span style='left: 30px;position: absolute'>????????????:" + value.value + "<span></div>"
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
                            markPoint:'roundRect',
                            edgeSymbol: ['','arrow'],
                            edgeSymbolSize: 10,  /*???????????????????????????????????????????????????????????????????????????????????????????????????*/
                            layout: 'none',  /* ????????????, 'none' ???????????????????????????xy????????????, 'circular' ??????????????????,'force' ?????????????????????*/
                            data: graph.nodes,
                            links: graph.links,
                            categories: graph.categories, /*?????????????????????*/
                            roam: true, /*???????????????????????????????????????*/
                            draggable: true, /*??????????????????   ??????layout ??? force ?????????????????????*/
                            focusNodeAdjacency: true,  //?????????????????? ?????????????????????
                            animation: true, //??????????????????
                            animationDurationUpdate: 2000,//??????????????????
                            label: {
                                show: true
                            },
                            edgeLabel: {
                                fontSize: 20
                            },
                            /*labelLayout: {
                                hideOverlap: true /!*???????????????????????????*!/
                            },*/
                            scaleLimit: {
                                min: 0.4,
                                max: 2
                            },
                            lineStyle: {
                                color: 'source',
                                curveness: 0.3
                            },
                        }
                    ],
                    force: {
                        layoutAnimation: false
                    },
                    left:'center',
                    top : 'middle'
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
            }
        });
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
    }

    // ??????UI??????????????????
    componentDidUpdate() {
        console.log("Clock did update");
    }

    showIp(){
        let arr = []
        arr.push(<option value="" className="active">??????</option>);
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
