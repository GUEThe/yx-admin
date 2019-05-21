<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>学生报道管理</h3>
        <el-button-group>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="onEditStudent(0)">新增学生</el-button>
          <el-button type="success" icon="el-icon-plus" size="mini" @click="showUpoad=true">导入录取新生</el-button>
        </el-button-group>

        <el-table v-loading="listLoading" :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="学生名称" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="onEditStudent(scope.row.id,3)">{{ scope.row.name }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="学院代码" align="center" prop="collegeCode"></el-table-column>
          <el-table-column label="专业代码" align="center" prop="majorCode"></el-table-column>
          <el-table-column label="是否来报道" align="center" prop="isCome"></el-table-column>
          <el-table-column label="报道时间" align="center" prop="time"></el-table-column>
          <el-table-column align="center" width="400">
            <template slot="header">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onEditStudent(scope.row.id,1)">编辑</el-button>
                <el-button type="danger" size="mini" @click="onDeleteAsync(scope.row.id)">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <br>
        <div style="text-align:center">
          <el-pagination background layout="prev, pager, next" :current-page.sync="page" :page-size="20" :total="total"
            align="center" />
        </div>
        <br>
      </el-main>
    </el-container>
    <el-dialog :visible="showUpoad" title="上传文件" @close="showUpoad=false">
      <el-upload class="upload-demo" drag action="http://localhost:9527/v1//api/Student/importUploadFile" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-dialog>
    <StudentDialog :id="editId" :showDialog.sync="showDialog" :type="editType" @refresh="getStuAsync()" />
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import StudentDialog from '../components/StudentDialog.vue';

/** 学生报道管理 */
@Component({
  components: {
    StudentDialog
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

  mounted() {
    this.getStuAsync();
  }

  @Watch('page')
  async onPageChangeASync(val: number) {
    this.getStuAsync(val);
  }

  async getStuAsync(page: number = 1) {
    this.listLoading = true;
    const { data, total } = await api.GetStudentList({ page, pageSize: 20 });
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
}
</script>

<style scoped>
</style>