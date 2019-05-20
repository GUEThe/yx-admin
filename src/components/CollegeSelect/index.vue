<template>
  <div>
    <el-select v-model="selectItem" placeholder="请选择院校" @change="handleSelectChange">
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
export default class CollegeSelect extends Vue {
  @Prop() collegeId!: number;

  collegeList: models.College[] = [];
  selectItem = '003';
  mounted() {
    this.getCollegeAsync();
  }

  @Watch('collegeId')
  onCollegeIdChange(val: string) {
    this.selectItem = val;
  }
  /** 获取所有校区 */
  async getCollegeAsync() {
    const { data } = await api.GetCollegeList({});
    console.log('dadada', data!);
    this.collegeList = data!;
  }

  handleSelectChange(e: any) {
    this.$emit('update:collegeId', this.selectItem);
  }
}
</script>

<style>
</style>
