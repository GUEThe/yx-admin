<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>学院管理</h3>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="onEditCollege(0)">新增学院</el-button>
        <el-table v-loading="listLoading" :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="学院名称" align="center" prop="name"></el-table-column>
          <el-table-column label="学院代码" align="center" prop="code"></el-table-column>
          <el-table-column label="所属校区代码" align="center" prop="campus"></el-table-column>
          <el-table-column align="center" width="400">
            <template slot="header">
              操作
            </template>
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onEditCollege(scope.row.id,1)">编辑</el-button>
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
    <CollegeDialog :id="editId" :showDialog.sync="showDialog" :type="editType" @refresh="getCollegeAsync()" />
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import CollegeDialog from '../components/CollegeDialog.vue';

/** 学院管理 */
@Component({
  components: {
    CollegeDialog
  }
})
export default class College extends Vue {
  listLoading: boolean = false;
  listData: models.College[] = [];
  search = '';
  editId = 0;
  editType = 0;
  showDialog = false;
  page = 1;
  total = 0;

  mounted() {
    this.getCollegeAsync();
  }

  @Watch('page')
  async onPageChangeASync(val: number) {
    this.getCollegeAsync(val);
  }

  async getCollegeAsync(page: number = 1) {
    this.listLoading = true;
    const { data, total } = await api.GetCollegeList({ page, pageSize: 20 });
    console.log(data);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }

  onEditCollege(id: number = 0, type: number) {
    this.editId = id;
    this.editType = type;
    this.showDialog = true;
  }

  async onDeleteAsync(id: number) {
    this.$confirm('确定删除该学院？', '提示', {
      type: 'warning'
    }).then(async () => {
      const { data } = await api.DeleteCollege({ id })
      console.log('del', data);
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.listData = this.listData.filter((e: models.College) => e.id !== id);
    }).catch(() => {
      //
    });
  }
}
</script>

<style scoped>
</style>
