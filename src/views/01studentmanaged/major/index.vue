<template>
  <div style="padding:5px" class="stureport-class">
    <el-container>
      <el-main>
        <h3>专业管理</h3>
        <el-row type="flex">
          <CollegeSelect :collegeId.sync="queryOptions.collegeCode" />
          <el-button type="info" icon="el-icon-search" size="mini" @click="handleFilter()">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="onEditMajor(0)">
            新增专业
          </el-button>
        </el-row>
        <br />
        <el-table v-loading="listLoading" :data="data" t-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ (queryOptions.page-1)*queryOptions.pageSize+scope.$index+1 }}
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
          <el-pagination background layout="total,sizes,prev, pager, next" :current-page.sync="queryOptions.page"
            :page-sizes="[20, 50, 100, 200]" :page-size.sync="queryOptions.pageSize" :total="total" align="center"
            @size-change="handleFilter" @current-change="requestData" />
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
import CollegeSelect from '@/components/CollegeSelect/index.vue';
/** 专业管理 */
@Component({
  components: {
    MajorDialog,
    CollegeSelect
  }
})
export default class Major extends Vue {
  loading: boolean = false
  data: models.Major[] = []
  search = ''
  editId = 0
  editType = 0
  showDialog = false
  page = 1
  total = 0
  queryOptions = {
    collegeCode: '',
    page: 1,
    pageSize: 10
  }
  mounted() {
    this.init()
  }

  async init() {
    this.requestData()
  }

  handleFilter() {
    this.queryOptions.page = 1;
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const { data, total } = await api.GetMajorList(this.queryOptions)
    this.data = data!
    this.total = total!
    this.loading = false
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
        this.data = this.data.filter((e: models.Major) => e.id !== id)
      })
      .catch(() => {
        //
      })
  }
}
</script>

<style scoped></style>
