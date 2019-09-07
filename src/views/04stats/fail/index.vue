<template>
  <div style="padding:5px" class="stureport-class">
    <el-container>
      <el-main>
        <h3>挂科学生成绩统计</h3>
        <el-row type="flex">
          <el-input v-model="listQuery.grade" placeholder="年级" style="width:150px;"></el-input>
          <CollegeSelect v-permission="['admin']" :collegeId.sync="listQuery.college" />
          <TermSelect :term.sync="listQuery.term" />
          <!-- <MajorSelect :majorId.sync="listQuery.major" /> -->
          <el-button type="info" icon="el-icon-search" size="mini" @click="getData()">查询</el-button>
        </el-row>

        <br>

        <el-table v-loading="listLoading" :data="listData" element-loading-text="正在加载..." border sortable fit
          highlight-current-row>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="年级" align="center" prop="grade"></el-table-column>
          <el-table-column label="学院" align="center" prop="college"></el-table-column>
          <el-table-column label="专业" align="center" prop="major"></el-table-column>
          <el-table-column label="学号" align="center" prop="stid"></el-table-column>
          <el-table-column label="姓名" align="center" prop="name"></el-table-column>
          <el-table-column label="挂科数量" align="center" prop="failCourseCount"></el-table-column>
          <el-table-column label="课程明细" align="center" width="300">
            <template slot-scope="scope">
              <p v-for="item in scope.row.failCourse" :key="item.courseno"> {{ item.cname }}</p>
              <!-- {{ scope.row.failCourse }} -->
            </template>
          </el-table-column>
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
import TermSelect from '@/components/TermSelect/index.vue';
import { UserModule } from '@/store/modules/user'
import { permission } from '@/directives/permission'

@Component({
  components: {
    TermSelect,
    CollegeSelect,
    MajorSelect
  },
  directives: {
    permission
  }
})
export default class StuReport extends Vue {
  listLoading: boolean = false;

  listData: models.FailStatisc[] = [];
  search = '';
  editId = 0;
  editType = 0;
  showDialog = false;
  showUpoad = false;
  page = 1;
  total = 0;
  listQuery = {
    major: '',
    college: '',
    term: '',
    grade: ''
  }

  get token() {
    return UserModule.token;
  }
  mounted() {

  }

  async getData() {
    this.listLoading = true;
    const { data } = await api.GetFailList(this.listQuery);
    this.listData = data!;
    this.listLoading = false;
  }
}
</script>

<style>
.stureport-class .el-input {
  width: 200px;
}
</style>
