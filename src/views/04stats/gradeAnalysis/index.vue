<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>学生成绩分析</h3>
        <el-row type="flex">
        </el-row>
        <!-- 学生成绩图表 -->
        <div id="stuChart" style="width: 100%;height:800px;"></div>
        <br />
        <!-- 学生成绩table表格 -->
        <el-table ref="filterTable" :data="tableData" style="width: 100%">
          <el-table-column prop="termname" label="学期" sortable width="180" column-key="termname" :filters="termList"
            :filter-method="filterTerm">
          </el-table-column>
          <el-table-column prop="cname" label="课程名称" width="180">
          </el-table-column>
          <el-table-column prop="courseid" label="课程性质" :filters="natureList" :filter-method="filterNature"
            :formatter="formatterNature" />
          <el-table-column prop="courseno" label="课号">
          </el-table-column>
          <el-table-column prop="score" sortable label="成绩" :filters="gradeList" :filter-method="filterGrade">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import echarts from 'echarts'

import { genGradeData, getTypeConut } from '@/utils';

import grade from './grade.js';
const gradeList = grade.grade;
var chartData = [['score', 'course', 'grade']];
var chartData2 = [['score', 'course', 'grade']];
// console.log(gradeList);
for (let i = 0; i < gradeList.length; i++) {
  var str = (gradeList[i].score + ',' + gradeList[i].cname + ',' + gradeList[i].score);
  chartData.push(str.split(','));
}
// console.log(chartData);
/** 报道统计 */
@Component({
})
export default class GradeAnalysis extends Vue {
  myChart: any = null;
  tableData: any = [];
  termList: any = [];
  natureList = [
    { text: 'BT专业基础必修', value: 'BT' },
    { text: 'BJ基础必修', value: 'BJ' },
    { text: 'BG公共必修', value: 'BG' },
    { text: 'BS实践必修', value: 'BS' },
    { text: 'XZ限选', value: 'XZ' },
    { text: '其它', value: 'other' }];
  gradeList = [
    { text: '及格', value: '及格' },
    { text: '重修', value: '重修' }];
  mounted() {
    this.myChart = echarts.init(document.getElementById('stuChart') as HTMLDivElement);
    const gradeData = genGradeData(gradeList);
    const termList = Object.keys(gradeData).map(key => (gradeData[key].termName));
    const BTList = Object.keys(gradeData).map(key => getTypeConut(gradeData[key].gradeList, 'BT'));
    const BJList = Object.keys(gradeData).map(key => getTypeConut(gradeData[key].gradeList, 'BJ'));
    const BGList = Object.keys(gradeData).map(key => getTypeConut(gradeData[key].gradeList, 'BG'));
    const BSList = Object.keys(gradeData).map(key => getTypeConut(gradeData[key].gradeList, 'BS'));
    const XZList = Object.keys(gradeData).map(key => getTypeConut(gradeData[key].gradeList, 'XZ'));
    const TotalList = Object.keys(gradeData).map(key => (gradeData[key].gradeList.length));
    const OtherList = TotalList.map((item, index) => {
      return item - BTList[index] - BJList[index] - BGList[index] - BSList[index] - XZList[index];
    })
    Object.keys(gradeData).forEach(key => this.tableData = this.tableData.concat(gradeData[key].gradeList));
    Object.keys(gradeData).forEach(key => this.termList.push({
      text: gradeData[key].termName, value: gradeData[key].termName
    }));
    // 指定图表的配置项和数据
    var option = {
      dataset: {
        source: chartData
      },
      grid: { containLabel: true },
      xAxis: {
        type: 'category',
        name: '课程名',
        'axisLabel': {
          interval: 0,
          rotate: 30
        }

      },
      yAxis: {
        name: '成绩'
      },
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 1,
        max: 100,
        text: ['高分数', '低分数'],
        dimension: 0,
        inRange: {
          color: ['#D7DA8B', '#E15457']
        }
      },
      series: [
        {
          type: 'bar',
          encode: {
            x: 'course',
            y: 'grade'
          }
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    this.myChart.clear();
    this.myChart.setOption(option, true);
  }

  beforeDestroy() {
    if (!this.myChart) {
      return
    }
    this.myChart.dispose()
    this.myChart = null
  }

  // 学期的筛选
  filterTerm(value: any, row: any, column: any) {
    console.log(chartData2)

    if (row['term'] === value) {
      // console.log(row);
      var arr = [];
      arr.push(row['score'], row['cname'], row['score']);
      chartData2.push(arr);
    }
    this.refresh();
    console.log('chartdata2' + chartData2);
    // console.log(chartData2);
    return row['term'] === value;
  }

  // 课程性质的筛选
  filterNature(value: any, row: any, column: any) {
    if (row.courseid.includes(value)) {
      var arr = [];
      arr.push(row['score'], row['cname'], row['score']);
      chartData2.push(arr);
    }
    this.refresh();

    if (value === 'other') {
      return !row.courseid.includes('BJ') && !row.courseid.includes('BT') && !row.courseid.includes('BG') && !row.courseid.includes('BS') && !row.courseid.includes('XZ')
    } else {
      return row.courseid.includes(value)
    }
  }

  // 成绩的筛选
  filterGrade(value: any, row: any, column: any) {
    const property = column['property'];
    if (value === '及格') {
      return row[property] >= 60;
    } else {
      return row[property] < 60;
    }
  }

  formatterNature(row: any, column: any) {
    if (row.courseid.includes('BJ')) {
      return 'BJ基础必修'
    } else if (row.courseid.includes('BT')) {
      return 'BT专业基础必修'
    } else if (row.courseid.includes('BG')) {
      return 'BG公共必修';
    } else if (row.courseid.includes('BS')) {
      return 'BS实践必修';
    } else if (row.courseid.includes('XZ')) {
      return 'XZ限选';
    } else {
      return '其它'
    }
  }

  // 图表重绘
  refresh() {
    this.myChart = echarts.init(document.getElementById('stuChart') as HTMLDivElement);
    var option = {
      dataset: {
        source: chartData2
      },
      grid: { containLabel: true },
      xAxis: {
        type: 'category',
        name: '课程名',
        'axisLabel': {
          interval: 0,
          rotate: 30
        }

      },
      yAxis: {
        name: '成绩'
      },
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 1,
        max: 100,
        text: ['高分数', '低分数'],
        dimension: 0,
        inRange: {
          color: ['#D7DA8B', '#E15457']
        }
      },
      series: [
        {
          type: 'bar',
          encode: {
            x: 'course',
            y: 'grade'
          }
        }
      ]
    };
    this.myChart.clear();
    this.myChart.setOption(option, true);
  }
}
</script>

<style scoped>
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
</style>
