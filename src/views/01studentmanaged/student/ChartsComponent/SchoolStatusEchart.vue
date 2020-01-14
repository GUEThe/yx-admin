<template>
  <el-dialog width="39%" title="在校状态图表" :visible="showinnerDialog" destroy-on-close
    @close="$emit('update:showinnerDialog',false)">
    <div id="main2" style="width:500px;height:500px"></div>
  </el-dialog>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import { deepClone } from '@/utils/index'
import echarts from 'echarts';
@Component({
  components: {
  }
})
export default class SchoolStatusEchart extends Vue {
  @Prop() showinnerDialog!: boolean;
  @Prop() sendSchoolStatusData!: Array<number>
  queryOptions: models.IQueryStuOptions = {
    year: undefined,
    bj: '',
    stid: '',
    name: '',
    college: '',
    major: '',
    type: '',
    counselor: '',
    stustatus: '',
    page: 1,
    pageSize: 20,
  }
  SchoolStatusList: number[] = [];
  @Watch('showinnerDialog')
  async showinnerDialogChange(val: boolean, old: boolean) {
    if (val) {
      this.createChart()
    }
  }

  async createChart() {
    let schoolstatus = ['在校', '离校']
    for (let i in schoolstatus) {
      this.queryOptions.type = schoolstatus[i]
      const resp = await api.GetStudentList(this.queryOptions)
      this.SchoolStatusList.push(resp.total);
    }
    if (this.SchoolStatusList.length > 2) {
      this.SchoolStatusList.splice(2, this.SchoolStatusList.length - 2);
    }
    var data = [{
      value: this.SchoolStatusList[1],
      name: '离校'
    }, {
      value: this.SchoolStatusList[0],
      name: '在校'
    }];
    const echart = echarts as any;
    var obj = document.getElementById('main2')
    var myChart = echart.init(obj);
    var option = {
      backgroundColor: '#fff',
      title: {
        text: '在校状态',
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
        data: ['离校', '在校']
      },
      series: [{
        type: 'pie',
        selectedMode: 'single',
        radius: ['25%', '58%'],
        color: ['#86D560', '#AF89D6'],

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
        data: data
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
        data: data
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
}
</script>

<style scoped>
</style>