import './App.css';
import React, {Component} from 'react';
import * as echarts from 'echarts';


class App extends  Component{
    componentDidMount(){
      let chartPie = echarts.init(document.getElementById("chartPie"));
        console.log(chartPie);

        chartPie.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}({d}%)'
            },
            title: [{
                text: 'System Information'
            }, {
                subtext: 'CPU',
                left: '20%',
                top: '75%',
                textAlign: 'center'
            }, {
                subtext: 'Memory',
                left: '50%',
                top: '75%',
                textAlign: 'center'
            }, {
                subtext: 'Disk',
                left: '80%',
                top: '75%',
                textAlign: 'center'
            }],
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel']
                    },
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            series: [
                {
                    name: 'CPU',
                    type: 'pie',
                    radius: [20, 50],
                    center: ['20%', '50%'],
                    roseType: 'area',
                    data: [
                        {value: 40, name: 'free'},
                        {value: 60, name: 'used'}
                    ]
                },
                {
                    name: 'Memory',
                    type: 'pie',
                    radius: [20, 50],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    data: [
                        {value: 50, name: 'free'},
                        {value: 50, name: 'used'}
                    ]
                },
                {
                    name: 'Memory',
                    type: 'pie',
                    radius: [20, 50],
                    center: ['80%', '50%'],
                    roseType: 'area',
                    data: [
                        {value: 33, name: 'free'},
                        {value: 67, name: 'used'}
                    ]
                }
            ]
        });
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
