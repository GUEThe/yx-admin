<template>
  <div>
    <el-select v-model="selectItem" placeholder="请选择学院" clearable @change="handleSelectChange">
      <el-option v-for="item in collegeList" :key="item.id" :label="item.name" :value="item.code">
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';

/** 学院列表 */
@Component({})
export default class CollegeCodeSelect extends Vue {
  @Prop() collegeId!: number;

  collegeList: models.College[] = [];
  selectItem = '';
  mounted() {
    this.getCollegeAsync();
  }

  @Watch('collegeId')
  onCollegeIdChange(val: string) {
    this.selectItem = val;
  }
  /** 获取所有学院 */
  async getCollegeAsync() {
    const { data } = await api.GetCollegeList();
    console.log('学院选择输出数据：', data!);
    this.collegeList = data!;
  }

  handleSelectChange(e: any) {
    this.$emit('update:collegeId', this.selectItem);
  }
}
</script>

<style>
</style>
