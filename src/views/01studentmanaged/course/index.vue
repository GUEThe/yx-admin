<template>
  <div style="padding:5px" class="stureport-class">
    <el-container>
      <el-main>
        <h3>课程成绩查询</h3>
        <el-row type="flex">
          <!-- <CollegeSelect v-permission="['admin']" :collegeId.sync="listQuery.collegeCode" />
          <MajorSelect :majorId.sync="listQuery.majorCode" /> -->
          <el-input v-model="listQuery.courseno" placeholder="课号" style="width:150px;"></el-input>

          <el-button type="info" icon="el-icon-search" size="mini" @click="getData()">查询</el-button>
        </el-row>
        <br>
        <!-- {{ this.data.name }} -->
        <br>

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
  data: models.ScoreByCourse | null = null;
  listData: models.StudentScore[] = [];
  search = '';
  editId = 0;
  editType = 0;
  showDialog = false;
  showUpoad = false;
  page = 1;
  total = 0;
  listQuery = {
    courseno: ''
  }

  get token() {
    return UserModule.token;
  }
  mounted() {

  }

  async getData() {
    this.listLoading = true;

    const { data } = await api.GetScoreByCno(this.listQuery);
    this.data = data!;
    this.listData = this.data.stuScore;
    this.listLoading = false;
  }
}
</script>

<style>
.stureport-class .el-input {
  width: 200px;
}
</style>
