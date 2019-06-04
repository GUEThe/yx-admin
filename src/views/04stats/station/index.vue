<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>服装统计</h3>
        <el-select v-model="listQuery.type" placeholder="统计类别" clearable @change="getGetStudentStation()">
<el-option label="衣服统计" value="clothesSize"></el-option>
          <el-option label="鞋子统计" value="shoesSize"></el-option>
          <el-option value="桂林西站"></el-option>
          <el-option value="两江机场"></el-option>
        </el-select>
        <el-select v-model="listQuery.isNeed" clearable placeholder="是否需要接待" @change="getGetStudentStation()">
          <el-option :value="0" label="否"></el-option>
          <el-option :value="1" label="是"></el-option>
        </el-select>
        &nbsp; 抵达时间段:<el-date-picker v-model="timeList" type="datetimerange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期" @change="timeChange">
        </el-date-picker>
        <el-button-group>
          <el-button type="primary" size="mini" icon="el-icon-search" @click="getGetStudentStation()">搜索</el-button>
          <el-button type="success" size="mini" icon="el-icon-download" @click="handleDownload">导出excel</el-button>
        </el-button-group>
        <el-table v-loading="listLoading" :data="listData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          element-loading-text="正在加载..." border fit highlight-current-row>
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column align="center" label="序号" type="index" :index="index" show-overflow-tooltip width="50" />
          <el-table-column label="学院" align="center">
            <template slot-scope="scope">
              {{ scope.row.collegeCode|collegeFilter }}
            </template>
          </el-table-column>
          <el-table-column label="专业" align="center">
            <template slot-scope="scope">
              {{ scope.row.majorCode|majorFilter }}
            </template>
          </el-table-column>
          <el-table-column label="姓名" align="center" prop="name"></el-table-column>
          <el-table-column label="性别" align="center" prop="gender">
            <template slot-scope="scope">
              {{ scope.row.gender ? '男':'女' }}
            </template>
          </el-table-column>
          <el-table-column label="学号" align="center" prop="studentId"></el-table-column>
          <el-table-column label="到站" align="center" prop="station"></el-table-column>
          <el-table-column label="人数" align="center" prop="peopleNum"></el-table-column>
          <el-table-column label="行李数" align="center" prop="baggageNum"></el-table-column>
          <el-table-column label="到达时间" align="center" prop="arriveTime">
            <template slot-scope="scope">
              {{ scope.row.arriveTime | StudentTimeFilter }}
            </template>
          </el-table-column>
          <el-table-column label="是否需要接待" align="center" prop="picture">
            <template slot-scope="scope">
              {{ scope.row.isNeed?'是':'否' }}
            </template>
          </el-table-column>
        </el-table>
        <br>
        <div style="text-align:center">
          <el-pagination background layout="total,prev, pager, next" :current-page.sync="page" :page-size="20" :total="total"
            align="center" />
        </div>
        <br>
      </el-main>
    </el-container>
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as api from '@/api';
import * as models from '@/api/models';
import { exportJson2Excel } from '@/utils/excel';
import { formatJson } from '@/utils';
import Moment from 'moment';

/** 请假管理 */
@Component({})
export default class AuditPicture extends Vue {
  listLoading: boolean = false;
  listData: models.Student[] = [];
  search = '';
  page = 1;
  total = 0;
  value1 = '';
  timeList = [''];
  listQuery = {
    page: 1,
    pageSize: 20,
    type: 'clothesSize',
    isNeed: undefined,
    time1: undefined,
    time2: undefined,
    year: 0
  }

  mounted() {
    this.listQuery.year = new Date().getFullYear();
    this.getGetStudentStation();
  }

  @Watch('page')
  async onPageChangeASync(val: number) {
    this.getGetStudentStation(val);
  }

  async getGetStudentStation(page: number = 1) {
    this.listLoading = true;
    console.log(this.listQuery);
    const { data, total } = await api.GetStudentColList(this.listQuery);
    console.log(data);
    this.listData = data!;
    this.total = total!;
    this.listLoading = false;
  }

  timestampToTime(timestamp: number) {
    var date = new Date(timestamp.toString().length > 10 ? timestamp : timestamp * 1000);// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  }

  timeChange(e: any) {
    this.listQuery.time1 = new Date(e[0]).getTime() as any;
    this.listQuery.time2 = new Date(e[1]).getTime() as any;
  }

  filterTime(val: number) {
    return Moment(val).utcOffset(0).format('YYYY-MM-DD HH:mm');
  }

  filterCollege(code: string) {
    let collegeList: models.College[] = JSON.parse(localStorage.getItem(
      'college'
    ) as string)
    if (!collegeList) {
      return code
    }
    let name = ''
    collegeList.forEach(element => {
      if (element.code === code) {
        name = element.name
      }
    })
    return name
  }

  filterMajor(code: string) {
    let majorList: models.Major[] = JSON.parse(localStorage.getItem('major') as string)
    if (!majorList) {
      return code
    }
    let name = ''
    majorList.forEach(element => {
      if (element.code === code) {
        name = element.name
      }
    })
    return name
  }

  handleDownload() {
    this.listQuery.pageSize = 10000;
    api.GetStudentStationList(this.listQuery).then((res: models.PageResponse<models.StudentStationView[]>) => {
      const { data: listData } = res;
      const tHeader = ['学院code', '专业code', '姓名', '性别', '学号', '到站', '人数', '行李数', '到达时间', '是否需要接待'];
      const filterVal = ['collegeCode', 'majorCode', 'name', 'gender', 'studentId', 'station', 'peopleNum', 'baggageNum', 'arriveTime', 'isNeed'];
      const list = listData!.map((e: models.StudentStationView) => {
        return {
          collegeCode: this.filterCollege(e.collegeCode),
          majorCode: this.filterMajor(e.majorCode),
          name: e.name,
          gender: e.gender ? '男' : '女',
          studentId: e.studentId,
          station: e.station,
          peopleNum: e.peopleNum,
          baggageNum: e.baggageNum,
          arriveTime: Moment(e.arriveTime).format('YYYY-MM-DD HH:mm'),
          isNeed: e.isNeed ? '是' : '否'
        }
      });
      const data = formatJson(filterVal, list);
      exportJson2Excel(tHeader, data, '新生到站统计表', undefined, undefined, true, 'xlsx');
    });
  }

  index(val: number) {
    return (this.listQuery.page - 1) * this.listQuery.pageSize + val + 1;
  }
}
</script>

<style scoped>
</style>
