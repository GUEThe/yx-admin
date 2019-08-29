<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>信息类别管理</h3>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="onEditInfoCategory(0)">新增信息类别</el-button>
        <el-table v-loading="listLoading"
          :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index+1 }}
            </template>
          </el-table-column>
          <el-table-column label="名称" align="center" prop="name"></el-table-column>
          <el-table-column label="值" align="center" prop="value"></el-table-column>
          <el-table-column label="类型" align="center" prop="type"></el-table-column>
          <el-table-column label="是否启用" align="center" prop="enable">
            <template slot-scope="scope">
              {{ scope.row.enable===1?'是':'否' }}
            </template>
          </el-table-column>
          <el-table-column label="是否是默认值" align="center" prop="isDefault">
            <template slot-scope="scope">
              {{ scope.row.isDefault===1?'是':'否' }}
            </template>
          </el-table-column>
          <el-table-column align="center" width="400">
            <template slot="header">
              操作
            </template>
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onEditInfoCategory(scope.row.id,1)">编辑</el-button>
                <el-button type="danger" size="mini" @click="onDeleteAsync(scope.row.id)">删除</el-button>
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
    <InfoCategoryDialog :id="editId" :showDialog.sync="showDialog" :type="editType" @refresh="getPayAsync()" />
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import InfoCategoryDialog from '../components/InfoCategoryDialog.vue';

/** 信息类别管理 */
@Component({
  components: {
    InfoCategoryDialog
  }
})
export default class InfoCategory extends Vue {
  listLoading: boolean = false;
  listData: models.InfoCategory[] = [];
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
    const { data, total } = await api.GetInfoCategoryList({ page, pageSize: 20, keyword: '' });
    console.log(data);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }

  onEditInfoCategory(id: number = 0, type: number) {
    this.editId = id;
    this.editType = type;
    this.showDialog = true;
  }

  async onDeleteAsync(id: number) {
    this.$confirm('确定删除该信息类别？', '提示', {
      type: 'warning'
    }).then(async () => {
      const { data } = await api.DeleteInfoCategory({ id })
      console.log('del', data);
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.listData = this.listData.filter((e: models.InfoCategory) => e.id !== id);
    }).catch(() => {
      //
    });
  }
}
</script>

<style scoped>
</style>
