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
                subtext: 'CPU:',
                left: '25%',
                top: '75%',
                textAlign: 'center'
            }, {
                subtext: 'Memory:',
                left: '50%',
                top: '75%',
                textAlign: 'center'
            }, {
                subtext: 'Disk:',
                left: '75%',
                top: '75%',
                textAlign: 'center'
            }],
            dataset: [
                {
                    source: [
                        ['percent', 'percent', 'Price', 'Year', 'Selected'],
                        ['used', 42, 2, 2020, true],
                        ['free', 58, 1, 2020, false],

                        ['used', 50, 2, 2021, true],
                        ['free', 50, 1, 2021, false],

                        ['used', 26, 2, 2022, true],
                        ['free', 74, 1, 2022, false],
                    ]
                },
                {
                    transform: {
                        type: 'filter',
                        config: { dimension: 'Year', value: 2020}
                    }
                },
                {
                    transform: {
                        type: 'filter',
                        config: { dimension: 'Year', value: 2021}
                    }
                },
                {
                    transform: {
                        type: 'filter',
                        config: { dimension: 'Year', value: 2022}
                    }
                }
            ],
            series: [
                {
                    text: 'Alarm',
                    type: 'pie',
                    radius: ['15%', '30%'],
                    datasetIndex: 1,
                    selected : 'used'
                },
                {
                    type: 'pie',
                    radius: ['15%', '30%'],
                    datasetIndex: 2,
                    selected : 'used'
                },
                {
                    type: 'pie',
                    radius: ['15%', '30%'],
                    datasetIndex: 3,
                    selected : 'used'
                }
            ],
            // Optional. Only for responsive layout:
            media: [
                {
                    query: { minAspectRatio: 1 },
                    option: {
                        series: [
                            { center: ['25%', '50%'] },
                            { center: ['50%', '50%'] },
                            { center: ['75%', '50%'] }
                        ]
                    }
                },
                {
                    option: {
                        series: [
                            { center: ['50%', '25%'] },
                            { center: ['50%', '50%'] },
                            { center: ['50%', '75%'] }
                        ]
                    }
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
