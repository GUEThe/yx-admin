<template>
  <el-dialog width="800px" :title="label" :visible="showDialog" destroy-on-close
    @close="$emit('update:showDialog',false)">
    <el-table v-loading="loading" align="center" :data="data">
      <el-table-column label="序号" width="55" align="center">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header">
          备注
        </template>
        <template slot-scope="scope">
          <span v-if="operateLog.id!==scope.row.id">{{ scope.row.mark }}</span>
          <el-input v-if="operateLog.id===scope.row.id" v-model="operateLog.mark" type="textarea" :rows="2"
            placeholder="请输入内容">
          </el-input>
        </template>
      </el-table-column>
      <el-table-column property="time" align="center" label="时间" width="150"></el-table-column>
      <el-table-column property="handler" align="center" label="操作人" width="100"></el-table-column>
      <el-table-column align="center" width="150">
        <template slot="header">
          操作
        </template>
        <template slot-scope="scope">
          <el-button-group>
            <el-button :type="operateLog.id===scope.row.id?'primary':'warning'" size="mini"
              @click="onEdit(scope.row,scope.row.id===operateLog.id)">
              {{ operateLog.id===scope.row.id? "保存":"修改" }}
            </el-button>
            <template>
              <!-- <el-popconfirm confirmButtonText="确认" cancelButtonText="取消" icon="el-icon-info" iconColor="red"
                title="确定此条备注删除吗？">
                <el-button slot="reference" size="mini" type="danger">删除</el-button>
              </el-popconfirm> -->
              <Popconfirm placement="bottom" width="200" type="danger" okType="primary" okText="确认" title="确定此条备注删除吗？"
                icon="el-icon-error" @confirm="onDelete(scope.row)">
                <el-button type="danger" size="mini">删除</el-button>
              </Popconfirm>
            </template>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top:20px">
      <el-form :inline="true" :model="operateLog">
        <el-form-item label="备注内容">
          <el-input v-model="operateLog.mark" type="textarea" :rows="1" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="handleSave">新增</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </el-dialog>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import Popconfirm from '@/components/Popconfirm/index.vue'
import { deepClone } from '@/utils/index'

const emptyLog = {
  id: 0,
  xh: '',
  mark: '',
  time: '',
  type: 3,
  handler: ''
}

@Component({
  components: {
    Popconfirm
  }
})
export default class StuMark extends Vue {
  @Prop() showDialog!: boolean;
  @Prop() stuInfo!: models.StuInfo;
  label: string = '暂无信息';
  loading: boolean = false;
  saving: boolean = false;
  data: models.OperateLog[] = []
  operateLog: models.OperateLog = emptyLog
  newStuInfo!: models.StuInfo;
  visible = false;

  @Watch('showDialog')
  async showDialogChange(val: boolean, old: boolean) {
    if (val) {
      this.init()
    } else {
      this.operateLog = emptyLog
    }
  }

  init() {
    if (JSON.stringify(this.stuInfo) !== '{}') {
      this.newStuInfo = deepClone(this.stuInfo) as models.StuInfo
      this.label = this.newStuInfo.studentId + ' ' + this.newStuInfo.name + ' ' + '的备注信息'
    }
    this.requestData()
  }

  async requestData() {
    this.loading = true
    const resp = await api.GetStudentMark({ stid: (this.stuInfo as models.StuInfo).studentId })
    if (resp.code === 0) {
      this.data = resp.data!
    }
    this.loading = false
  }

  async onEdit(mark: models.OperateLog, isSave: boolean) {
    if (isSave) {
      const resp = await api.PutOperateLog({ model: this.operateLog as models.OperateLog })
      if (resp.code === 0) {
        this.operateLog = emptyLog
        this.$message.success('修改成功')
      }
    } else {
      this.operateLog = mark
    }
  }

  async onDelete(operateLog: models.OperateLog) {
    const resp = await api.DeleteOperateLog({ id: operateLog.id })
    if (resp.code === 0) {
      this.data = this.data.filter(item => {
        return item.id !== operateLog.id
      })
      this.$message.success('删除成功')
    }
  }

  async handleSave() {
    this.saving = true
    const resp = await api.PostStudentMark({ xh: this.newStuInfo.studentId, mark: this.operateLog.mark })
    if (resp.code === 0) {
      this.operateLog = {
        id: 0,
        xh: '',
        mark: '',
        time: '',
        type: 3,
        handler: ''
      }
      this.$message.success('添加成功')
      this.requestData()
    }
    this.saving = false
  }
}
</script>

<style scoped>
</style>
