<template>
  <div>
    <el-select v-model="selectItem" placeholder="请选择年级" clearable @change="onSelectChange">
      <el-option v-for="item in dataList" :key="item.id" :label="item.name" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';

@Component({})
export default class TermSelect extends Vue {
  dataList: models.InfoCategory[] = [];
  selectItem = '';
  mounted() {
    this.getDataAsync();
  }

  // @Watch('majorId')
  onSelectChange(val: string) {
    this.selectItem = val;
  }

  async getDataAsync() {
    const { data } = await api.GetTerms();
    this.dataList = data!;
  }

  // handleSelectChange(e: any) {
  //    this.$emit('update:majorId', this.selectItem);
  // }
}
</script>

<style>
</style>
