<template>
  <div>
    <el-select v-model="selectItem" placeholder="请专业选择" clearable @change="handleSelectChange">
      <el-option v-for="item in majorList" :key="item.id" :label="item.name+item.code" :value="item.name">
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';

/** 专业列表 */
@Component({})
export default class MajorSelect extends Vue {
  @Prop() majorId!: number;

  majorList: models.Major[] = [];
  selectItem = '';
  mounted() {
    this.getMajorAsync();
  }

  @Watch('majorId')
  onMajorIdChange(val: string) {
    this.selectItem = val;
  }
  /** 获取所有专业 */
  async getMajorAsync() {
    const { data } = await api.GetMajorList({ pageSize: 100 });
    console.log('dadada', data!);
    this.majorList = data!;
  }

  handleSelectChange(e: any) {
    this.$emit('update:majorId', this.selectItem);
  }
}
</script>

<style>
</style>
