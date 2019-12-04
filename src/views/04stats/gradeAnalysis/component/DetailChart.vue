<template>
  <div id="DetailChart" style="padding:5px;">
    <el-container>
      <el-main>
        <div id="termChart"></div>
        <div id="natureChart"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'
import Vue from 'vue'
import { Avatar } from 'element-ui'
Vue.prototype.$ajax = axios
Vue.prototype.$echarts = echarts
export default {
  name: 'DetailChart',
  mounted() {
    this.createTermChart();
  },
  methods: {
    createTermChart() {
      let termChart = this.$echarts.init(document.getElementById('termChart'));
      let natureChart = this.$echarts.init(document.getElementById('natureChart'));
      this.$ajax.get('static\\grade.json').then((res) => {
        let term = ['2015-2016_1', '2015-2016_2', '2016-2017_1', '2016-2017_2', '2017-2018_1', '2017-2018_2', '2018-2019_1', '2018-2019_2'];
        let nature = ['BJ', 'BG', 'BS', 'BT', 'XZ'];
        let termList = []; let natureList = [];
        let totalScore = 0; let totalCount = 0;
        // termList
        for (var i = 0; i < term.length; i++) {
          for (var j = 0; j < res.data.length; j++) {
            if (res.data[j].term == term[i] && (res.data[j].courseid.includes('BJ') ||
              res.data[j].courseid.includes('BG') ||
              res.data[j].courseid.includes('BS') ||
              res.data[j].courseid.includes('BT') ||
              res.data[j].courseid.includes('XZ'))) {
              totalScore += res.data[j].score;
              totalCount++;
            }
          }
          let TermOBJ = {};
          TermOBJ.name = term[i];
          TermOBJ.value = (totalScore / totalCount).toFixed(2);
          termList.push(TermOBJ);
          totalScore = 0;
          totalCount = 0;
        }
        // natureList
        for (var i = 0; i < nature.length; i++) {
          for (var j = 0; j < res.data.length; j++) {
            if (res.data[j].courseid.includes(nature[i])) {
              totalScore += res.data[j].score;
              totalCount++;
            }
          }
          let natureOBJ = {};
          natureOBJ.name = nature[i];
          natureOBJ.value = (totalScore / totalCount).toFixed(2);
          natureList.push(natureOBJ);
          totalScore = 0;
          totalCount = 0;
        }
        // 学期平均分报表
        termChart.setOption({
          title: {
            text: '学期平均分报表',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: term
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: termList,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }, true);

        var scale = 1;
        var echartData = natureList;
        let rich = {
          yellow: {
            color: '#ffc72b',
            fontSize: 30 * scale,
            padding: [5, 4],
            align: 'center'
          },
          total: {
            color: '#ffc72b',
            fontSize: 40 * scale,
            align: 'center'
          },
          white: {
            color: 'black',
            align: 'center',
            fontSize: 14 * scale,
            padding: [21, 0]
          },
          blue: {
            color: '#49dff0',
            fontSize: 16 * scale,
            align: 'center'
          },
          hr: {
            borderColor: '#0b5263',
            width: '100%',
            borderWidth: 1,
            height: 0
          }
        }
        // 性质平均分报表
        natureChart.setOption({
          title: {
            text: '性质平均分报表',
            left: 'center',
            top: '53%',
            padding: [24, 0],
            textStyle: {
              color: 'black',
              fontSize: 18 * scale,
              align: 'center'
            }
          },
          legend: {
            selectedMode: false,
            data: [],
            left: 'center',
            top: 'center',
            icon: 'none',
            align: 'center',
            textStyle: {
              color: 'black',
              fontSize: 16 * scale,
              rich: rich
            }
          },
          series: [{
            name: '',
            type: 'pie',
            radius: ['42%', '50%'],
            hoverAnimation: true,
            color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
            label: {
              normal: {
                formatter: function (params, ticket, callback) {
                  var total = 0;
                  var percent = 0;
                  echartData.forEach(function (value, index, array) {
                    total += value.value;
                  });
                  percent = ((params.value / total) * 100).toFixed(1);
                  return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n';
                },
                rich: rich
              }
            },
            labelLine: {
              normal: {
                length: 55 * scale,
                length2: 0,
                lineStyle: {
                  color: '#0b5263'
                }
              }
            },
            data: echartData
          }]
        }, true);
      });
    }
  }
}
</script>

<style scoped>
#termChart {
  width: 40%;
  height: 400px;
  float: left;
}

#natureChart {
  width: 60%;
  height: 400px;
  float: left;
}
</style>
