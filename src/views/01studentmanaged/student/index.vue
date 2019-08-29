<template>
  <div style="padding:5px" class="stureport-class">
    <el-container>
      <el-main>
        <h3>学生管理</h3>
        <el-row type="flex">
          <CollegeSelect v-permission="['admin']" :collegeId.sync="listQuery.collegeCode" />
          <MajorSelect :majorId.sync="listQuery.majorCode" />
          <el-input v-model="listQuery.stid" placeholder="学号" style="width:150px;"></el-input>
          <el-input v-model="listQuery.name" placeholder="姓名" style="width:100px;"></el-input>
          <el-button type="info" icon="el-icon-search" size="mini" @click="getStuAsync()">搜索</el-button>
</el-row>
        <br>
        <el-table v-loading="listLoading"
          :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="学号" align="center" prop="studentId"></el-table-column>
          <el-table-column label="姓名" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="showDetails(scope.$index)">{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="性别" align="center" prop="gender"></el-table-column>
          <el-table-column label="学院" align="center">
            <template slot-scope="scope">
              {{ scope.row.college }}
            </template>
          </el-table-column>
          <el-table-column label="专业" align="center">
            <template slot-scope="scope">
              {{ scope.row.major }}
            </template>
          </el-table-column>
          <el-table-column label="电话" align="center" prop="hostelphone"></el-table-column>
          <el-table-column label="宿舍" align="center" prop="hostel"></el-table-column>
          <el-table-column align="center" width="100">
            <template slot="header">
              操作
            </template>
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onEditStudent(scope.row.id)">编辑</el-button>
</el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <div style="text-align:center">
          <el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="20"
            :total="total" align="center" />
        </div>
        <br>
      </el-main>
    </el-container>
    <el-dialog width="30%" :visible="showDialog" title="details" @close="showDialog=false">
      <el-row v-if="stuDetails" type="flex" justify="center">
        <el-col :span="8">
          {{ stuDetails.name }}
        </el-col>
      </el-row>
    </el-dialog>
    <!-- <StudentDialog :id="editId" :showDialog.sync="showDialog" :type="editType" @refresh="getStuAsync()" /> -->
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

/** 学生信息管理 */
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
export default class StuReport extends Vue {
  listLoading: boolean = false;
  listData: models.Newstudent[] = [];
  stuDetails: models.Newstudent | null = null;
  search = '';
  editId = 0;
  editType = 0;
  showDialog = false;
  showUpoad = false;
  page = 1;
  total = 0;
  listQuery = {
    page: 1,
    pageSize: 20,
    college: '',
    major: '',
    name: '',

    stid: '',
    year: null
  }

  get token() {
    return UserModule.token;
  }
  mounted() {
    this.getStuAsync();
    // this.listQuery.year = new Date().getFullYear();
  }

  @Watch('page')
  async onPageChangeASync(val: number) {
    this.getStuAsync(val);
  }

  async getStuAsync(page: number = 1) {
    this.listLoading = true;
    this.listQuery.page = page;

    const { data, total } = await api.GetStudentList(this.listQuery);
    console.log(data);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }

  onEditStudent(index: number) {
    console.log(index)
    this.stuDetails = this.listData[index];
    this.showDialog = true;
  }
  showDetails(index: number) {
    console.log(index)
    this.stuDetails = this.listData[index];
    this.showDialog = true;
  }
}
</script>

<style>
.stureport-class .el-input {
  width: 200px;
}
</style>
