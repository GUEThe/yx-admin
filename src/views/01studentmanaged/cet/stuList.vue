<template>
  <div style="padding:5px" class="stureport-class">
    <el-container>
      <el-main>
        <h3>学生CET成绩查询</h3>
        <el-row type="flex">
          <el-input v-model="queryOptions.grade" placeholder="年级" style="width:150px;"></el-input>
          <CollegeSelect :collegeId.sync="queryOptions.college" />
          <MajorSelect :majorId.sync="queryOptions.major" />
          <el-input v-model="queryOptions.bj" placeholder="班级" style="width:100px;"></el-input>
          <el-input v-model="queryOptions.stid" placeholder="学号" style="width:150px;"></el-input>
          <el-input v-model="queryOptions.name" placeholder="姓名" style="width:100px;"></el-input>

          <el-select v-model="queryOptions.type" placeholder="CET类型">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryOptions.isPass" placeholder="通过情况">
            <el-option v-for="item in passList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="info" icon="el-icon-search" size="mini" @click="handleFilter()">搜索</el-button>
        </el-row>
        <br>
        <el-table v-loading="loading" :data="data" element-loading-text="正在加载..." border sortable fit
          highlight-current-row>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="年级" align="center" prop="grade"></el-table-column>
          <el-table-column label="学号" align="center" prop="stid"></el-table-column>
          <el-table-column label="姓名" align="center" prop="name"></el-table-column>
          <el-table-column label="专业" align="center" prop="major"></el-table-column>
          <el-table-column label="班级" align="center" prop="bj"></el-table-column>
          <el-table-column label="考试类型" align="center" prop="type"></el-table-column>
          <el-table-column label="分数" align="center" prop="score"></el-table-column>
        </el-table>
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
import CollegeSelect from '@/components/CollegeSelect/index.vue';
import MajorSelect from '@/components/MajorSelect/index.vue';
@Component({
  components: {
    CollegeSelect,
    MajorSelect
  },
  directives: {
    permission
  }
})
export default class stuList extends Vue {
  loading: boolean = false;
  data: models.StuCET[] = [];
  total = 0;
  queryOptions = {
    grade: new Date().getFullYear() - 1,
    bj: '',
    college: '',
    major: '',
    stid: '',
    name: '',
    type: 4,
    isPass: undefined
  }
  typeList: object = [
    { value: 4, label: '四级' },
    { value: 6, label: '六级' }
  ];
  passList: object = [
    { value: undefined, label: '不限' },
    { value: 1, label: '通过425以上' },
    { value: 0, label: '未通过' }
  ];

  get token() {
    return UserModule.token;
  }
  mounted() {

  }

  async handleFilter() {
    this.loading = true;
    const resp = await api.GetStudentCetScore(this.queryOptions)
    if (resp.code === 0) {
      this.data = resp.data!
      this.total = resp.total
    }
    this.loading = false;
  }
}
</script>

<style>
</style>
