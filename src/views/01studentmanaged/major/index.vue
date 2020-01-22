<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>专业管理</h3>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="onEditMajor(0)">
          新增专业
        </el-button>
        <el-table v-loading="listLoading" :data="
            listData.filter(
              data =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
            )
          " element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="专业名称" align="center" prop="name"></el-table-column>
          <el-table-column label="专业代码" align="center" prop="code"></el-table-column>
          <el-table-column label="学制" align="center" prop="years"></el-table-column>
          <el-table-column label="所属学院代码" align="center" prop="collegeCode"></el-table-column>
          <el-table-column label="学校" align="center" prop="type"></el-table-column>
          <el-table-column align="center" width="400">
            <template slot="header">
              操作
            </template>
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onEditMajor(scope.row.id, 1)">
                  编辑
                </el-button>
                <el-button type="danger" size="mini" @click="onDeleteAsync(scope.row.id)">
                  删除
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <div style="text-align:center">
          <el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="20"
            :total="total" align="center" />
        </div>
        <br />
      </el-main>
    </el-container>
    <MajorDialog :id="editId" :showDialog.sync="showDialog" :type="editType" @refresh="getMajorAsync()" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import * as api from '@/api'
import * as models from '@/api/models'
import MajorDialog from '../components/MajorDialog.vue'

/** 专业管理 */
@Component({
  components: {
    MajorDialog
  }
})
export default class Major extends Vue {
  listLoading: boolean = false
  listData: models.Major[] = []
  search = ''
  editId = 0
  editType = 0
  showDialog = false
  page = 1
  total = 0

  mounted() {
    this.getMajorAsync()
  }

  @Watch('page')
  async onPageChangeASync(val: number) {
    this.getMajorAsync(val)
  }

  async getMajorAsync(page: number = 1) {
    this.listLoading = true
    const { data, total } = await api.GetMajorList({ page, pageSize: 20 })
    console.log(data)
    this.listData = data!
    this.total = total!
    this.listLoading = false
  }

  onEditMajor(id: number = 0, type: number) {
    this.editId = id
    this.editType = type
    this.showDialog = true
  }

  async onDeleteAsync(id: number) {
    this.$confirm('确定删除该专业？', '提示', {
      type: 'warning'
    })
      .then(async () => {
        const { data } = await api.DeleteMajor({ id })
        console.log('del', data)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.listData = this.listData.filter((e: models.Major) => e.id !== id)
      })
      .catch(() => {
        //
      })
  }
}
</script>

<style scoped></style>
