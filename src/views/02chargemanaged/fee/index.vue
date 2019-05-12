<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>费用项管理</h3>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="onEditFee(0)">新增费用</el-button>
        <el-table v-loading="listLoading" :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="学生类型" align="center" prop="studentType"></el-table-column>
          <el-table-column label="费用项名称" align="center" prop="name"></el-table-column>
          <el-table-column label="金额" align="center" prop="amount"></el-table-column>
          <el-table-column label="操作" align="center" width="400">
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onEditFee(scope.row.id,1)">编辑</el-button>
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
    <FeeDialog :id="editId" :showDialog.sync="showDialog" :type="editType" @refresh="getPayAsync()" />
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import FeeDialog from '../components/FeeDialog.vue';

/** 费用管理 */
@Component({
  components: {
    FeeDialog
  }
})
export default class Fee extends Vue {
  listLoading: boolean = false;
  listData: models.Fee[] = [];
  search = '';
  editId = 0;
  editType = 0;
  showDialog = false;
  page = 1;
  total = 0;

  mounted() {
    this.getPayAsync();
  }

  @Watch('page')
  async onPageChangeASync(val: number) {
    this.getPayAsync(val);
  }

  async getPayAsync(page: number = 1) {
    this.listLoading = true;
    const { data, total } = await api.GetFeeList({ page, pageSize: 20, keyword: '' });
    console.log(data);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }

  onEditFee(id: number = 0, type: number) {
    this.editId = id;
    this.editType = type;
    this.showDialog = true;
  }

  async onDeleteAsync(id: number) {
    this.$confirm('确定删除该费用信息？', '提示', {
      type: 'warning'
    }).then(async () => {
      const { data } = await api.DeleteFee({ id })
      console.log('del', data);
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.listData = this.listData.filter((e: models.Fee) => e.id !== id);
    }).catch(() => {
      //
    });
  }
}
</script>

<style scoped>
</style>
