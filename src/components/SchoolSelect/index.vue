<template>
  <div>
    <el-select
      v-model="selectItem"
      placeholder="请选择学校"
      clearable
      @change="handleSelectChange"
    >
      <el-option
        v-for="item in dataList"
        :key="item.id"
        :label="item.name + item.value"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import * as api from '@/api'
import * as models from '@/api/models'

@Component({})
export default class SchooolSelect extends Vue {
  @Prop() Id!: number

  dataList: models.InfoCategory[] = []
  selectItem = ''
  mounted() {
    this.getListAsync()
  }

  @Watch('Id')
  onMajorIdChange(val: string) {
    this.selectItem = val
  }
  /** 获取下拉列表数据 */
  async getListAsync() {
    const { data } = await api.GetInfoCategoryByType({ type: '学校' })

    this.dataList = data!
  }

  handleSelectChange(e: any) {
    this.$emit('update:Id', this.selectItem)
  }
}
</script>

<style></style>
