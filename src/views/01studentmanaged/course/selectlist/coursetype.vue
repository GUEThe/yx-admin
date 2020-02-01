<template>
  <div>
    <el-select v-model="selectItem" placeholder="请选择课程性质" clearable @change="handleSelectChange">
      <el-option v-for="item in coursetypeList" :key="item.id" :label="item.name" :value="item.name">
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import * as api from '@/api'
import * as models from '@/api/models'

/** 课程性质列表 */
@Component({})
export default class coursetypeSelect extends Vue {
  @Prop() name!: string

  coursetypeList: models.Course[] = []
  selectItem = ''
  mounted() {
    this.getcoursetypeAsync()
  }

  @Watch('name')
  onMajorChange(val: string) {
    this.selectItem = val
  }
  /** 获取所有专业 */
  async getcoursetypeAsync() {
    const { data } = await api.GetCourseType();
    this.coursetypeList = data!
    console.log('coursetypelist', this.coursetypeList);
  }

  handleSelectChange(e: any) {
    this.$emit('update:name', this.selectItem)
  }
}
</script>

<style></style>
