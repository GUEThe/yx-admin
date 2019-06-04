<template>
  <div style="padding:5px" class="stureport-class">
    <el-container>
      <el-main>
        <h3>学生报道管理</h3>
        <el-row type="flex">
          <CollegeSelect v-permission="['admin']" :collegeId.sync="listQuery.collegeCode" />
          <MajorSelect :majorId.sync="listQuery.majorCode" />
          <el-input v-model="listQuery.studentId" placeholder="学号" style="width:200px;"></el-input>
          <el-button type="info" icon="el-icon-search" size="mini" @click="getStuAsync()">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="onEditStudent(0)">新增学生</el-button>
          <el-button type="success" icon="el-icon-plus" size="mini" @click="showUpoad=true">导入录取新生</el-button>
        </el-row>
        <br>
        <el-table v-loading="listLoading" :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="学生名称" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="onEditStudent(scope.row.studentId,3)">{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="学院代码" align="center">
            <template slot-scope="scope">
              {{ scope.row.collegeCode|collegeFilter }}
            </template>
          </el-table-column>
          <el-table-column label="专业代码" align="center">
            <template slot-scope="scope">
              {{ scope.row.majorCode|majorFilter }}
            </template>
          </el-table-column>
          <el-table-column label="学号" align="center" prop="studentId"></el-table-column>
          <el-table-column label="是否来报道" align="center" prop="isCome"></el-table-column>
          <el-table-column label="报道时间" align="center" prop="time"></el-table-column>
          <el-table-column align="center" width="400">
            <template slot="header">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onEditStudent(scope.row.studentId,1)">编辑</el-button>
                <el-button type="danger" size="mini" @click="onDeleteAsync(scope.row.id)">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <div style="text-align:center">
          <el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="20" :total="total"
            align="center" />
        </div>
        <br>
      </el-main>
    </el-container>
    <el-dialog width="30%" :visible="showUpoad" title="上传文件" @close="showUpoad=false">
      <el-row type="flex" justify="center">
        <el-upload class="upload-demo" :on-success="uploadSuccess" drag action="v1/api/Student/importUploadFile"
          :headers="{Authorization: `Bearer ${token}`}" :show-file-list="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-row>
    </el-dialog>
    <StudentDialog :id="editId" :showDialog.sync="showDialog" :type="editType" @refresh="getStuAsync()" />
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

/** 学生报道管理 */
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
  listData: models.Student[] = [];
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
    collegeCode: '',
    majorCode: '',
    studentId: '',
    year: 2019
  }

  get token() {
    return UserModule.token;
  }
  mounted() {
    this.getStuAsync();
    this.listQuery.year = new Date().getFullYear();
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

  onEditStudent(id: number = 0, type: number) {
    this.editId = id;
    this.editType = type;
    this.showDialog = true;
  }

  async onDeleteAsync(id: number) {
    this.$confirm('确定删除该学生？', '提示', {
      type: 'warning'
    }).then(async () => {
      const { data } = await api.DeleteStudent({ id })
      console.log('del', data);
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.listData = this.listData.filter((e: models.Student) => e.id !== id);
    }).catch(() => {
      //
    });
  }

  uploadSuccess(resp: models.RestfulData) {
    if (resp.code === 0) {
      this.$message({
        type: 'success',
        message: resp.message
      });
    } else {
      this.$message({
        type: 'error',
        message: resp.message
      });
    }
  }
}
</script>

<style>
.stureport-class .el-input {
  width: 200px;
}
</style>
