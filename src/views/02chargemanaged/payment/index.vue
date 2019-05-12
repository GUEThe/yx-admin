<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>缴费报道管理</h3>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="onEditPayment(0)">新增缴费</el-button>
        <el-table v-loading="listLoading" :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" prop="status"></el-table-column>
          <el-table-column label="金额" align="center" prop="amount"></el-table-column>
          <el-table-column label="时间" align="center" prop="time"></el-table-column>
          <el-table-column label="学号" align="center" prop="PaymentId"></el-table-column>
          <el-table-column label="总额" align="center" prop="total"></el-table-column>
          <el-table-column label="减免金额" align="center" prop="waiver"></el-table-column>
          <el-table-column label="标记" align="center" prop="mark"></el-table-column>
          <el-table-column label="是否申请绿色通道" align="center" prop="isGreenChannel"></el-table-column>
          <el-table-column label="操作" align="center" width="400">
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onEditPayment(scope.row.id,1)">编辑</el-button>
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
    <PaymentDialog :id="editId" :showDialog.sync="showDialog" :type="editType" @refresh="getPayAsync()" />
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import PaymentDialog from '../components/PaymentDialog.vue';

/** 缴费管理 */
@Component({
  components: {
    PaymentDialog
  }
})
export default class Payment extends Vue {
  listLoading: boolean = false;
  listData: models.Payment[] = [];
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
    const { data, total } = await api.GetPaymentList({ page, pageSize: 20 });
    console.log(data);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }

  onEditPayment(id: number = 0, type: number) {
    this.editId = id;
    this.editType = type;
    this.showDialog = true;
  }

  async onDeleteAsync(id: number) {
    this.$confirm('确定删除该缴费信息？', '提示', {
      type: 'warning'
    }).then(async () => {
      const { data } = await api.DeletePayment({ id })
      console.log('del', data);
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.listData = this.listData.filter((e: models.Payment) => e.id !== id);
    }).catch(() => {
      //
    });
  }
}
</script>

<style scoped>
</style>
