<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>新闻管理</h3>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="onEditNews(0)">新增新闻</el-button>
        <el-table v-loading="listLoading" :data="listData.filter(data => !search || data.newsname.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column label="序号" width="55" align="center">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column>
          <el-table-column label="标题" align="center" prop="title"></el-table-column>
          <el-table-column label="类型" align="center" prop="type">
            <template slot-scope="scope">
              {{ scope.row.type===1&&"入学教育"||scope.row.type===2&&"报道须知"||scope.row.type===3&&"通知公告" }}
            </template>
          </el-table-column>
          <el-table-column label="内容" align="center" prop="content"></el-table-column>
          <el-table-column label="发布时间" align="center" prop="publishTime"></el-table-column>
          <el-table-column label="年份" align="center" prop="year"></el-table-column>
          <el-table-column align="center" width="400">
            <template slot="header">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="mini" @click="onEditNews(scope.row.id,1)">编辑</el-button>
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
    <NewsDialog :id="editId" :showDialog.sync="showDialog" :type="editType" @refresh="getNewsAsync()" />
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import NewsDialog from '../components/NewsDialog.vue';

/** 新闻管理 */
@Component({
  components: {
    NewsDialog
  }
})
export default class News extends Vue {
  listLoading: boolean = false;
  listData: models.News[] = [];
  search = '';
  editId = 0;
  editType = 0;
  showDialog = false;
  page = 1;
  total = 0;

  mounted() {
    this.getNewsAsync();
  }

  @Watch('page')
  async onPageChangeASync(val: number) {
    this.getNewsAsync(val);
  }

  async getNewsAsync(page: number = 1) {
    this.listLoading = true;
    const { data, total } = await api.GetNewsList({ page, pageSize: 20 });
    console.log(data);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }

  onEditNews(id: number = 0, type: number) {
    this.editId = id;
    this.editType = type;
    this.showDialog = true;
  }

  async onDeleteAsync(id: number) {
    this.$confirm('确定删除该新闻？', '提示', {
      type: 'warning'
    }).then(async () => {
      const { data } = await api.DeleteNews({ id })
      console.log('del', data);
      this.$message({
        type: 'success',
        message: '删除成功!'
      });
      this.listData = this.listData.filter((e: models.News) => e.id !== id);
    }).catch(() => {
      //
    });
  }
}
</script>

<style scoped>
</style>
