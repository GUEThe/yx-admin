<template>
  <div id="ChartDisplay">
    <el-container>
      <el-main>
        <h4>平均分统计报表</h4>
        <div id="averageChart"></div>
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
  name: 'ChartDisplay',
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      let averageChart = this.$echarts.init(document.getElementById('averageChart'));
      this.$ajax.get('static\\grade.json').then((res) => {
        // 定义数据
        let term = ['2015-2016_1', '2015-2016_2', '2016-2017_1', '2016-2017_2', '2017-2018_1', '2017-2018_2', '2018-2019_1', '2018-2019_2'];
        let nature = ['BJ基础必修', 'BG公共必修', 'BS实践必修', 'BT专业基础必修', 'XZ限选'];
        let totalScore = 0; let totalCount = 0;
        let BJlist = []; let BGlist = []; let BSlist = []; let BTlist = []; let XZlist = []; let creditScore = [];
        // BJlist
        for (let i = 0; i < term.length; i++) {
          for (let j = 0; j < res.data.length; j++) {
            if (res.data[j].term == term[i] && res.data[j].courseid.includes('BJ')) {
              totalScore += res.data[j].score;
              totalCount++;
            }
          }
          if (isNaN(totalScore / totalCount)) {
            BJlist.push(null);
          } else {
            BJlist.push((totalScore / totalCount).toFixed(2));
          }
          totalScore = 0;
          totalCount = 0;
        }

        // BGlist
        for (let i = 0; i < term.length; i++) {
          for (let j = 0; j < res.data.length; j++) {
            if (res.data[j].term == term[i] && res.data[j].courseid.includes('BG')) {
              totalScore += res.data[j].score;
              totalCount++;
            }
          }
          if (isNaN(totalScore / totalCount)) {
            BGlist.push(null);
          } else {
            BGlist.push((totalScore / totalCount).toFixed(2));
          }
          totalScore = 0;
          totalCount = 0;
        }

        // BSlist
        for (let i = 0; i < term.length; i++) {
          for (let j = 0; j < res.data.length; j++) {
            if (res.data[j].term == term[i] && res.data[j].courseid.includes('BS')) {
              totalScore += res.data[j].score;
              totalCount++;
            }
          }
          if (isNaN(totalScore / totalCount)) {
            BSlist.push(null);
          } else {
            BSlist.push((totalScore / totalCount).toFixed(2));
          }
          totalScore = 0;
          totalCount = 0;
        }

        // BTlist
        for (let i = 0; i < term.length; i++) {
          for (let j = 0; j < res.data.length; j++) {
            if (res.data[j].term == term[i] && res.data[j].courseid.includes('BT')) {
              totalScore += res.data[j].score;
              totalCount++;
            }
          }
          if (isNaN(totalScore / totalCount)) {
            BTlist.push(null);
          } else {
            BTlist.push((totalScore / totalCount).toFixed(2));
          }
          totalScore = 0;
          totalCount = 0;
        }

        // XZlist
        for (let i = 0; i < term.length; i++) {
          for (let j = 0; j < res.data.length; j++) {
            if (res.data[j].term == term[i] && res.data[j].courseid.includes('XZ')) {
              totalScore += res.data[j].score;
              totalCount++;
            }
          }
          if (isNaN(totalScore / totalCount)) {
            XZlist.push(null);
          } else {
            XZlist.push((totalScore / totalCount).toFixed(2));
          }
          totalScore = 0;
          totalCount = 0;
        }

        // grade学分绩
        for (let i = 0; i < term.length; i++) {
          for (let j = 0; j < res.data.length; j++) {
            if (res.data[j].term == term[i] && (
              res.data[j].courseid.includes('BJ') ||
              res.data[j].courseid.includes('BG') ||
              res.data[j].courseid.includes('BS') ||
              res.data[j].courseid.includes('BT') ||
              res.data[j].courseid.includes('XZ')) && res.data[j].cname != '生产实习'
            ) {
              totalScore += (res.data[j].score * res.data[j].credithour);
              totalCount += res.data[j].credithour;
            }
          }
          if (isNaN(totalScore / totalCount)) {
            creditScore.push(null);
          } else {
            creditScore.push((totalScore / totalCount).toFixed(2));
          }
          // totalScore = 0;
          // totalCount = 0;
        }

        averageChart.setOption({
          title: {
            text: '各科各学期平均分'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['BJ基础必修', 'BG公共必修', 'BS实践必修', 'BT专业基础必修', 'XZ限选', '学分绩']
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: { readOnly: false },
              magicType: { type: ['line', 'bar'] },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: term
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} 分'
            }
          },
          series: [
            {
              name: nature[0],
              type: 'line',
              data: BJlist,
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            },
            {
              name: nature[1],
              type: 'line',
              data: BGlist,
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            },
            {
              name: nature[2],
              type: 'line',
              data: BSlist,
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            },
            {
              name: nature[3],
              type: 'line',
              data: BTlist,
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            },
            {
              name: nature[4],
              type: 'line',
              data: XZlist,
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            },
            {
              name: '学分绩',
              type: 'line',
              data: creditScore,
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            }
          ]
        }, true);
      });
    }
  }
}
</script>

<style scoped>
#averageChart {
  width: 1000px;
  height: 600px;
}
</style>
