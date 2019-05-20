<template>
  <div>
    <el-select v-model="selectItem" placeholder="请选择" @change="handleSelectChange">
      <el-option v-for="item in campusList" :key="item.id" :label="item.name" :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';

/** 校区列表 */
@Component({})
export default class CampusSelect extends Vue {
  @Prop() campusId!: number;

  campusList: models.Campus[] = [];
  selectItem = 2;
  mounted() {
    this.getCampusAsync();
  }

  @Watch('campusId')
  onCampusIdChange(val: number) {
    this.selectItem = val;
  }
  /** 获取所有校区 */
  async getCampusAsync() {
    const { data } = await api.GetCampusList({});
    console.log('dadada', data!);
    this.campusList = data!;
  }

  handleSelectChange(e: any) {
    this.$emit('update:campusId', this.selectItem);
  }
}
</script>

<style>
</style>
