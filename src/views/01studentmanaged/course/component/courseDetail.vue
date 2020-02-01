<template>
  <el-dialog width="900px" :title="dialogTitle" :visible="showDialog" destroy-on-close
    @close="$emit('update:showDialog',false)">
    <el-form :model="courseDetail" label-width="80px" :disabled="loading">
      <el-row>
        <el-col :span="8">
          <el-form-item label="课程编号">
            <el-input v-model="courseDetail.courseid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年级">
            <el-input v-model="courseDetail.grade"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开课编号">
            <el-input v-model="courseDetail.courseno" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="课程名称">
            <el-input v-model="courseDetail.cname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学院名称">
            <CollegeSelect :collegeId.sync="courseDetail.collegename" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专业名称">
            <MajorSelect :name.sync="courseDetail.spname" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学期">
            <el-input v-model="courseDetail.term"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="教师号">
            <el-input v-model="courseDetail.teacherno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="教师名称">
            <el-input v-model="courseDetail.teachername"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专业编号">
            <el-input v-model="courseDetail.spno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学分">
            <el-input v-model="courseDetail.credithour"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学院编号">
            <el-input v-model="courseDetail.collegeno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="课程性质">
            <CourseTypeSelect :name.sync="courseDetail.courseType"></CourseTypeSelect>
            <!-- <el-input v-model="courseDetail.courseType"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="测试类型">
            <el-input v-model="courseDetail.examtype"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button type="button" @click="$emit('update:showDialog',false)">
          取消
        </el-button>
        <el-button :loading="saving" type="primary" @click="handlesave()">{{ okText }}</el-button>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import CollegeSelect from '@/components/CollegeSelect/index.vue';
import MajorSelect from '@/components/MajorSelect/index.vue';
import CourseTypeSelect from '../selectlist/coursetype.vue';
@Component({
  components: {
    CollegeSelect,
    MajorSelect,
    CourseTypeSelect
  }
})
export default class CourseDialog extends Vue {
  @Prop() showDialog!: boolean;
  @Prop() courseno!: string;
  dialogTitle: string = '新增课程';
  okText: string = '新增';
  loading = false;
  saving: boolean = false;
  courseDetail: models.Course | Object = {};
  closeValue: number = 1;
  @Watch('showDialog')
  async showDialogChange(val: boolean, old: boolean) {
    if (val) {
      this.init()
    }
  }

  init() {
    if (this.courseno != null) {
      this.getCourseInfo(this.courseno)
      this.dialogTitle = '编辑课程信息'
      this.okText = '保存'
    } else if (this.courseno == null) {
      this.courseDetail = {};
      this.dialogTitle = '新建课程信息'
      this.okText = '新建'
    }
  }

  async getCourseInfo(courseno: string) {
    this.loading = true
    const resp = await api.GetCourse({ courseno: courseno })
    if (resp.code === 0) {
      this.courseDetail = resp.data as models.Course
    }
    this.loading = false
  }

  async handlesave() {
    this.saving = true
    if (this.courseno != null) {
      const resp = await api.PutCourse({ value: this.courseDetail as models.Course })
      if (resp.code === 0) {
        this.$message.success('修改成功');
        this.showDialog = false;
        this.$emit('closeDetail', this.closeValue);
      }
    } else if (this.courseno == null) {
      const resp = await api.PostCourse({ course: this.courseDetail as models.Course })
      if (resp.code === 0) {
        this.$message.success('添加成功');
        this.showDialog = false;
        this.$emit('closeDetail', this.closeValue);
      }
    }
    this.saving = false
  }

}
</script>

<style scoped>
</style>
