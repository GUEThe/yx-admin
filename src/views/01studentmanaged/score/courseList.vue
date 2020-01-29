<template>
  <div style="padding:5px" class="stureport-class">
    <el-container>
      <el-main>
        <h3>课程成绩查询</h3>
        <el-row type="flex">
          <el-input v-model="listQuery.courseno" placeholder="课号" style="width:150px;"></el-input>
          <el-button type="info" icon="el-icon-search" size="mini" @click="getData()">查询</el-button>
        </el-row>
        <br>
        <el-row v-if="data">
          <el-col :span="4">
            <div class="grid-content bg-purple">{{ data.term }}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">{{ data.courseno }} {{ data.cname }}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{ data.courseType }}({{ data.credithour }}学分)</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">{{ data.courseid }}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{ data.courseType }}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple-light">{{ data.teacherno }}{{ data.teachername }}</div>
          </el-col>
        </el-row>
        <br>
        <el-table v-loading="listLoading" :data="listData" element-loading-text="正在加载..." border sortable fit
          :default-sort="{prop: 'stid'}">
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="学号" align="center" prop="stid"></el-table-column>
          <el-table-column label="姓名" align="center" prop="name"></el-table-column>
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
import StudentDialog from '../components/StudentDialog.vue';
import CollegeSelect from '@/components/CollegeSelect/index.vue';
import MajorSelect from '@/components/MajorSelect/index.vue';
import { UserModule } from '@/store/modules/user'
import { permission } from '@/directives/permission'

@Component({
  components: {
    StudentDialog,
    CollegeSelect,
    MajorSelect
  },
  directives: {
    permission
  }
})
export default class courseList extends Vue {
  listLoading: boolean = false;
  data: models.ScoreByCourse | null = null;
  listData: models.StudentScore[] = [];
  search = '';
  listQuery = {
    courseno: ''
  }

  mounted() {

  }

  async getData() {
    this.listLoading = true;
    const { data } = await api.GetScoreByCno(this.listQuery);
    this.data = data!;
    this.listData = this.data.stuScore;
    this.listLoading = false;
  }
}
</script>

<style>
.stureport-class .el-input {
  width: 200px;
}
</style>
