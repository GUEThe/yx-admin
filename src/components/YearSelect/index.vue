<template>
  <div>
    <el-select v-model="selectItem" placeholder="请选择年份" @change="handleSelectChange">
      <el-option v-for="item in yearList" :key="item" :label="item+'年'" :value="item">
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import { YearModule } from '@/store/modules/year';

/** 年份 */
@Component({})
export default class YearSelect extends Vue {
  yearList: number[] = [];
  selectItem = 0;
  mounted() {
    this.getYear();
  }

  async getYear() {
    const year = new Date().getFullYear();
    this.selectItem = year;
    this.yearList = [year - 2, year - 1, year, year + 1];
  }

  handleSelectChange(e: number) {
    YearModule.ChangeYear(this.selectItem);
    console.log(YearModule.year);
  }
}
</script>

<style>
</style>
