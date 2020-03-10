<template>
  <div>
    <el-select v-model="selectItem" placeholder="请选择学期" clearable @change="handleSelectChange">
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
export default class CetTermSelect extends Vue {
  @Prop() term!: string;
  dataList: models.InfoCategory[] = [];
  selectItem = '';
  mounted() {
    this.getDataAsync();
  }

  @Watch('term')
  onSelectChange(val: string) {
    this.selectItem = val;
  }

  async getDataAsync() {
    const { data } = await api.GetInfoCategoryByType({ type: 'CET' });
    this.dataList = data!;
  }

  handleSelectChange(e: any) {
    this.$emit('update:term', this.selectItem);
  }
}
</script>

<style>
</style>
