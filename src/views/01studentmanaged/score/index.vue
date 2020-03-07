<template>
  <div style="padding:5px" class="stureport-class">
    <el-container>
      <el-main>
        <h3>学生成绩查询</h3>
        <el-row type="flex">
          <el-input v-model="listQuery.stid" placeholder="学号" style="width:150px;"></el-input>
          <el-input v-model="listQuery.name" placeholder="姓名" style="width:100px;"></el-input>
          <el-button type="info" icon="el-icon-search" size="mini" @click="getStuAsync()">搜索</el-button>
        </el-row>
        <br>

        <StuGradeAnalysis v-if="ShowAnalysis" :stugradelist="gradelist" style="float:left"></StuGradeAnalysis>
        <GradeDendrogram v-if="ShowAnalysis" :stugradelist="gradelist"></GradeDendrogram>

        <el-row v-if="ShowAnalysis">
          <h4>成绩筛选</h4>
          <el-select v-model="termselect" placeholder="请选择学期" clearable @change="FilterTerm">
            <el-option v-for="item of termList" :key="item" :value="item"></el-option>
          </el-select>
          <el-select v-model="courseselect" placeholder="请选择课程性质" clearable @change="FilterCourse">
            <el-option v-for="item of courseList" :key="item.value" :value="item.value" :label="item.name"></el-option>
          </el-select>
          <el-select v-model="gradeselect" placeholder="请选择成绩区间" clearable @change="FilterGrade">
            <el-option v-for="item of gradeList" :key="item" :value="item"></el-option>
          </el-select>
        </el-row>

        <el-table v-loading="listLoading" :data="a===1?listData:selectlist" element-loading-text="正在加载..." border
          sortable fit highlight-current-row :default-sort="{prop: 'courseno', order: 'descending'}">
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="学号" align="center" prop="stid"></el-table-column>
          <el-table-column label="姓名" align="center" prop="name"></el-table-column>
          <el-table-column label="学期" align="center" prop="term"></el-table-column>
          <el-table-column label="课号" align="center" prop="courseno"></el-table-column>
          <el-table-column label="课程代码" align="center" prop="courseid"></el-table-column>
          <el-table-column label="课程名称" align="center" prop="cname"></el-table-column>
          <el-table-column label="成绩" align="center" prop="score"></el-table-column>
          <el-table-column label="考试类型" align="center" prop="ttype"></el-table-column>
        </el-table>

        <AverageGradeChart v-if="ShowAnalysis" :stugradelist="gradelist"></AverageGradeChart>
      </el-main>
    </el-container>
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import { UserModule } from '@/store/modules/user'
import { permission } from '@/directives/permission'
import StuGradeAnalysis from './components/gradeAnalysis.vue'
import GradeDendrogram from './components/GradeDendrogram.vue'
import AverageGradeChart from './components/averageGradeChart.vue'
@Component({
  components: {
    StuGradeAnalysis,
    GradeDendrogram,
    AverageGradeChart
  },
  directives: {
    permission
  }
})
export default class StuReport extends Vue {
  a = 0
  listLoading: boolean = false;
  listData: models.GDscore[] = [];
  gradelist: models.GDscore[] = [];
  search = '';
  total = 0;
  listQuery = {
    stid: '1700301329',
    name: ''
  };
  ShowAnalysis = false;
  termList: any = []
  courseList: any = [
    { name: 'BJ基础必修', value: 'BJ' },
    { name: 'BG公共必修', value: 'BG' },
    { name: 'BS实践必修', value: 'BS' },
    { name: 'BT专业基础必修', value: 'BT' },
    { name: 'XZ限选', value: 'XZ' }
  ]
  gradeList: any = ['优秀', '良好', '中等', '及格', '不及格']
  selectlist: any = []
  termselect = ''
  courseselect = ''
  gradeselect = ''
  get token() {
    return UserModule.token;
  }
  mounted() {

  }

  @Watch('listData')
  change(val: any, old: any) {
    this.termList = []
    this.GetTermList()
  }

  async getStuAsync() {
    this.a = 1
    if (this.listQuery.stid === '' && this.listQuery.name === '') {
      this.$message.error('请输入学号或姓名')
      return
    }
    this.listLoading = true;
    const { data, total } = await api.GetGuetStudentScore(this.listQuery);
    this.listData = data!;
    if (this.listData.length !== 0) {
      this.ShowAnalysis = true
      this.gradelist = this.listData
    } else {
      this.ShowAnalysis = false
    }
    this.total = total!;
    this.listLoading = false;
    this.GetTermList()
  }

  GetTermList() {
    for (let i of this.listData) {
      this.termList.push(i.term)
    }
    this.termList = Array.from(new Set(this.termList))
  }

  FilterTerm(value: any) {
    this.courseselect = ''
    this.gradeselect = ''
    this.a = 0
    this.selectlist = this.listData.filter((item) => {
      if (item.term === value) {
        return item
      }
    })
  }

  FilterCourse(value: any) {
    this.termselect = ''
    this.gradeselect = ''
    this.a = 0;
    this.selectlist = this.listData.filter((item) => {
      if (item.courseid.includes(value)) {
        return item
      }
    })
  }

  FilterGradeFunction(a: any, b: any) {
    this.selectlist = this.listData.filter((item) => {
      if (item.score >= a && item.score <= b) {
        return item
      }
    })
  }

  FilterGrade(value: any) {
    this.courseselect = ''
    this.termselect = ''
    this.a = 0;
    switch (value) {
      case '优秀':
        this.FilterGradeFunction(90, 100)
        break;
      case '良好':
        this.FilterGradeFunction(80, 89)
        break;
      case '中等':
        this.FilterGradeFunction(70, 79)
        break;
      case '及格':
        this.FilterGradeFunction(60, 69)
        break;
      case '不及格':
        this.FilterGradeFunction(0, 59)
        break;
    }
  }
}
</script>

<style>
.el-select {
  width: 250px;
}
</style>
