import './App.css';
import React, {Component} from 'react';
import * as echarts from 'echarts';


class App extends  Component{
    componentDidMount(){
      //ajax fetch axios
      //原生js
      let myEcharts = echarts.init(document.getElementById("mycharts"));
      console.log(myEcharts);

      myEcharts.setOption({
          title: {
              align: 'left',
              text: 'Alarm',
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

          xAxis: {
              type: 'category',
              data: ['Normal', 'Warning', 'Critical', 'Fatal']
          },
          yAxis: {
              type: 'value'
          },
          series: [
              {
                  data: [
                      {
                          value: 2,
                          itemStyle: {
                              color: '#a90000'
                          }
                      },
                      {
                          value: 1,
                          itemStyle: {
                              color: '#a9a900'
                          }
                      },
                      {
                          value: 2,
                          itemStyle: {
                              color: '#0038a9'
                          }
                      },
                      {
                          value: 3,
                          itemStyle: {
                              color: '#808000'
                          }
                      },
                  ],
                  type: 'bar'
              }
          ]
      })
    }

    render() {
      return (
          <div className="App">
            <div id = "mycharts" style={{width:300,height:300}}>
            </div>
          </div>
      )
    }


}

export default App;
