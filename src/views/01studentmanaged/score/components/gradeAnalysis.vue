<template>
  <el-dialog width="700px" title="成绩分析统计" :visible="showDialog" destroy-on-close :modal-append-to-body="false"
    @close="$emit('update:showDialog',false)">
    <div id="main" style="width:500px;height:500px;margin-left:80px"></div>
    <el-row type="flex" justify="center">
      <el-button type="button" @click="$emit('update:showDialog',false)">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import echarts from 'echarts';
@Component({
  components: {
  }
})
export default class gradeAnalysisDialog extends Vue {
  @Prop() showDialog!: boolean;
  @Prop() Courseno!: string;
  listQuery = {
    courseno: this.Courseno
  }
  scoreanalysis = {
    excellent: 0,
    good: 0,
    middle: 0,
    pass: 0,
    failed: 0
  };
  @Watch('showDialog')
  async showDialogChange(val: boolean, old: boolean) {
    if (val) {
      this.createChart()
    }
  }

  async createChart() {
    this.listQuery.courseno = this.Courseno;
    let grade = ['优', '良', '中', '及格', '不及格'];
    const { data } = await api.GetScoreByCno(this.listQuery);
    let copydata: any = {};
    copydata = data;
    for (let i of copydata.stuScore) {
      if (i.score >= 90 && i.score <= 100) {
        this.scoreanalysis.excellent++
      } else if (i.score >= 80 && i.score < 90) {
        this.scoreanalysis.good++;
      } else if (i.score >= 70 && i.score < 80) {
        this.scoreanalysis.middle++
      } else if (i.score >= 60 && i.score < 70) {
        this.scoreanalysis.pass++
      } else {
        this.scoreanalysis.failed++;
      }
    }
    const chartdata = [{
      value: this.scoreanalysis.excellent,
      name: '优'
    }, {
      value: this.scoreanalysis.good,
      name: '良'
    }, {
      value: this.scoreanalysis.middle,
      name: '中'
    }, {
      value: this.scoreanalysis.pass,
      name: '及格'
    }, {
      value: this.scoreanalysis.failed,
      name: '不及格'
    }];
    const echart = echarts as any;
    var obj = document.getElementById('main')
    var myChart = echart.init(obj);
    var option = {
      backgroundColor: '#fff',
      title: {
        text: '成绩分析',
        x: 'center',
        y: 'center',
        textStyle: {
          fontWeight: 'normal',
          fontSize: 16
        }
      },
      tooltip: {
        show: true,
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'horizontal',
        bottom: '0%',
        data: ['优', '良', '中', '及格', '不及格']
      },
      series: [{
        type: 'pie',
        selectedMode: 'single',
        radius: ['25%', '58%'],
        color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FF0000'],

        label: {
          normal: {
            position: 'inner',
            formatter: '{d}%',

            textStyle: {
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 14
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: chartdata
      }, {
        type: 'pie',
        radius: ['58%', '83%'],
        itemStyle: {
          normal: {
            color: '#F2F2F2'
          },
          emphasis: {
            color: '#ADADAD'
          }
        },
        label: {
          normal: {
            position: 'inner',
            formatter: '{c}人',
            textStyle: {
              color: '#777777',
              fontWeight: 'bold',
              fontSize: 14
            }
          }
        },
        data: chartdata
      }]
    };
    myChart.setOption(option);
  }
}
</script>

<style scoped>
</style>
