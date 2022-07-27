import './App.css';
import React, {Component} from 'react';
import * as echarts from 'echarts';


class App extends  Component{
    componentDidMount(){
      let lineGnodeB = echarts.init(document.getElementById("lineGnodeB"));
        console.log(lineGnodeB);

        lineGnodeB.setOption({
            title: {
                align: 'left',
                text: 'Online UE',
                textStyle: {
                    color : '#008080',
                    fontSize: 12
                },
            },
            tooltip: {
                formatter: function (params) {
                    return params.name + ', ' + params.value ;
                }
            },

            xAxis: {
                type: 'category',
                data: ['2022-07-15 15:05:43', '2022-07-15 15:06:43', '2022-07-15 15:07:43', '2022-07-15 15:08:43', '2022-07-15 15:09:43', '2022-07-15 15:10:43', '2022-07-15 15:11:43']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [8, 1, 9, 2, 12, 13, 4],
                    type: 'line',
                    smooth: true,
                    //symbol: 'none',
                    areaStyle: {}
                }
            ]
        });
    }

    render() {
      return (
          <div className="App">
            <div id = "lineGnodeB" style={{width:300,height:300}}>
            </div>
          </div>
      )
    }


}

export default App;
