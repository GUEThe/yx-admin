<template>
  <div style="padding:5px" class="stureport-class">
    <el-container>
      <el-main>
        <h3>课程列表</h3>
        <el-row type="flex">
          <CollegeSelect :collegeId.sync="queryOptions.collegeno" />
          <MajorSelect :name.sync="queryOptions.spname" />
          <el-input v-model="queryOptions.grade" placeholder="年级" style="width:150px;"></el-input>
          <el-input v-model="queryOptions.courseno" placeholder="课号" style="width:150px;"></el-input>
          <el-input v-model="queryOptions.cname" placeholder="名称" style="width:150px;"></el-input>
          <el-input v-model="queryOptions.teachername" placeholder="教师姓名" style="width:150px;"></el-input>
          <el-button type="info" icon="el-icon-search" size="mini" @click="requestData()">查询</el-button>
        </el-row>
        <br>
        <el-table v-loading="loading" :data="data" element-loading-text="正在加载..." border sortable fit
          highlight-current-row :default-sort="{prop: 'courseno', order: 'descending'}">
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="开课编号" align="center" prop="courseno"></el-table-column>
          <el-table-column label="课号" align="center" prop="courseid"></el-table-column>
          <el-table-column label="名称" align="center" prop="cname"></el-table-column>
          <el-table-column label="学期" align="center" prop="term"></el-table-column>
          <el-table-column label="教师号" align="center" prop="teacherno"></el-table-column>
          <el-table-column label="教师姓名" align="center" prop="teachername"></el-table-column>
          <el-table-column label="开课学院" align="center" prop="collegename"></el-table-column>
          <el-table-column label="课程类型" align="center" prop="courseyype"></el-table-column>
          <el-table-column label="学分" align="center" prop="credithour"></el-table-column>
        </el-table>
        <br>
        <div style="text-align:center">
          <el-pagination background layout="total,sizes,prev, pager, next" :current-page.sync="queryOptions.page"
            :page-sizes="[20, 50, 100, 200]" :page-size.sync="queryOptions.pageSize" :total="total" align="center"
            @size-change="handleFilter" @current-change="requestData" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import CollegeSelect from '@/components/CollegeSelect/index.vue';
import MajorSelect from '@/components/MajorSelect/index.vue';
import { UserModule } from '@/store/modules/user'
import { permission } from '@/directives/permission'

@Component({
  components: {
    CollegeSelect,
    MajorSelect
  },
  directives: {
    permission
  }
})
export default class StuReport extends Vue {
  loading: boolean = false;
  data: models.Course[] = [];

  page = 1;
  total = 0;
  queryOptions = {
    courseno: '',
    teachername: '',
    grade: '',
    collegeno: '',
    spname: '',
    cname: '',
    page: 1,
    pageSize: 20
  }

  get token() {
    return UserModule.token;
  }

  mounted() {
    this.init()
  }

  async init() {
    this.requestData()
  }

  handleFilter() {
    this.queryOptions.page = 1;
    this.requestData()
  }
  async requestData() {
    this.loading = true
    const resp = await api.GetCourseList(this.queryOptions)
    if (resp.code === 0) {
      this.data = resp.data!
      this.total = resp.total
    }
    this.loading = false
  }
}
</script>

<style>
.stureport-class .el-input {
  width: 200px;
}
</style>
