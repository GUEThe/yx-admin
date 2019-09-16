<template>
  <div style="padding:5px">
    <el-container>
      <el-main>
        <h3>学生成绩分析</h3>
        <el-row type="flex">
        </el-row>
        <div id="stuChart" style="width: 100%;height:600px;"></div>
        <br />
        <el-table ref="filterTable" :data="tableData" style="width: 100%">
          <el-table-column prop="termname" label="学期" sortable width="180" column-key="termname" :filters="termList"
            :filter-method="filterTerm">
          </el-table-column>
          <el-table-column prop="cname" label="课程名称" width="180">
          </el-table-column>
          <el-table-column prop="courseid" label="课程性质" :filters="natureList" :filter-method="filterNature"
            :formatter="formatterNature" />
          <el-table-column prop="courseno" label="课号">
          </el-table-column>
          <el-table-column prop="score" sortable label="成绩">
          </el-table-column>
          <!-- <el-table-column prop="score" label="成绩" width="100"
            :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]" :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" disable-transitions>{{scope.row.tag}}
              </el-tag>
            </template>
          </el-table-column> -->
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script  lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import echarts from 'echarts'

import { genGradeData, getTypeConut } from '@/utils';

const gradeList = [
  {
    'id': 890962,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_1',
    'termname': '2015-2016上学期',
    'courseid': 'BJ030006910',
    'cname': '计算机科学导论',
    'courseno': '1510682',
    'test': 67,
    'score': 72,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890963,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_1',
    'termname': '2015-2016上学期',
    'courseid': 'BJ0300094X0',
    'cname': '程序设计与问题求解',
    'courseno': '1510683',
    'test': 62,
    'score': 69,
    'credithour': 4,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890960,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_1',
    'termname': '2015-2016上学期',
    'courseid': 'BG0000178X0',
    'cname': '形势与政策1',
    'courseno': '1510743',
    'test': 93,
    'score': 93,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890964,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_1',
    'termname': '2015-2016上学期',
    'courseid': 'BS0300018X3',
    'cname': '计算机基本操作实验',
    'courseno': '1511162',
    'test': 95,
    'score': 85,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890965,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_1',
    'termname': '2015-2016上学期',
    'courseid': 'BS0300095X3',
    'cname': '程序设计与问题求解实验',
    'courseno': '1511175',
    'test': 95,
    'score': 95,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890959,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_1',
    'termname': '2015-2016上学期',
    'courseid': 'BG0000028X0',
    'cname': '体育1',
    'courseno': '1512638',
    'test': 66,
    'score': 72,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890966,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_1',
    'termname': '2015-2016上学期',
    'courseid': 'KW0000317X0',
    'cname': '大学生安全教育',
    'courseno': '1512850',
    'test': 90,
    'score': 90,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890967,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_1',
    'termname': '2015-2016上学期',
    'courseid': 'KW0000321X0',
    'cname': '大学生安全教育实践',
    'courseno': '1512880',
    'test': 90,
    'score': 90,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890969,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_2',
    'termname': '2015-2016下学期',
    'courseid': 'BG0000009X0',
    'cname': '大学英语2',
    'courseno': '1520263',
    'test': 70,
    'score': 77,
    'credithour': 4,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890972,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_2',
    'termname': '2015-2016下学期',
    'courseid': 'BJ000001410',
    'cname': '高等数学A2',
    'courseno': '1520633',
    'test': 70,
    'score': 75,
    'credithour': 6,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890975,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_2',
    'termname': '2015-2016下学期',
    'courseid': 'BT0300135X0',
    'cname': '离散数学B',
    'courseno': '1520698',
    'test': 68,
    'score': 73,
    'credithour': 4,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890973,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_2',
    'termname': '2015-2016下学期',
    'courseid': 'BJ000021110',
    'cname': '线性代数A',
    'courseno': '1520702',
    'test': 68,
    'score': 73,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890970,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_2',
    'termname': '2015-2016下学期',
    'courseid': 'BG0000022X0',
    'cname': '马克思主义基本原理概论',
    'courseno': '1520802',
    'test': 85,
    'score': 88,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890974,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_2',
    'termname': '2015-2016下学期',
    'courseid': 'BJ000034630',
    'cname': '大学物理C',
    'courseno': '1520939',
    'test': 56,
    'score': 65,
    'credithour': 4,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890971,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_2',
    'termname': '2015-2016下学期',
    'courseid': 'BG0000029X0',
    'cname': '体育2',
    'courseno': '1521489',
    'test': 80,
    'score': 82,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890978,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_2',
    'termname': '2015-2016下学期',
    'courseid': 'TX0000087X0',
    'cname': '大学生与社会礼仪',
    'courseno': '1521777',
    'test': 100,
    'score': 100,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890976,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_2',
    'termname': '2015-2016下学期',
    'courseid': 'KW0000040X0',
    'cname': '职业生涯与发展规划',
    'courseno': '1521989',
    'test': 84,
    'score': 85,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890977,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_2',
    'termname': '2015-2016下学期',
    'courseid': 'TP0000355X0',
    'cname': '谈判技巧（网络）',
    'courseno': '1522173',
    'test': 100,
    'score': 100,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890979,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_1',
    'termname': '2016-2017上学期',
    'courseid': 'BG0000006X0',
    'cname': '大学英语3',
    'courseno': '1610289',
    'test': 51,
    'score': 69,
    'credithour': 4,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890983,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_1',
    'termname': '2016-2017上学期',
    'courseid': 'BJ0000047X0',
    'cname': '概率论与数理统计',
    'courseno': '1610518',
    'test': 60,
    'score': 66,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890980,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_1',
    'termname': '2016-2017上学期',
    'courseid': 'BG0000030X0',
    'cname': '体育3',
    'courseno': '1610740',
    'test': 70,
    'score': 75,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890981,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_1',
    'termname': '2016-2017上学期',
    'courseid': 'BG0000175X0',
    'cname': '毛泽东思想和中国特色社会主义理论体系概论',
    'courseno': '1610788',
    'test': 61,
    'score': 75,
    'credithour': 6,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890982,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_1',
    'termname': '2016-2017上学期',
    'courseid': 'BG0000177X0',
    'cname': '形势与政策2',
    'courseno': '1611151',
    'test': 95,
    'score': 95,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890986,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_1',
    'termname': '2016-2017上学期',
    'courseid': 'BT0300037X0',
    'cname': '数据结构与算法',
    'courseno': '1611238',
    'test': 0,
    'score': 80,
    'credithour': 5,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890984,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_1',
    'termname': '2016-2017上学期',
    'courseid': 'BJ0300097X0',
    'cname': '电路与电子技术基础',
    'courseno': '1611239',
    'test': 71,
    'score': 72,
    'credithour': 4,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890988,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_1',
    'termname': '2016-2017上学期',
    'courseid': 'TR0000284X0',
    'cname': '西方哲学智慧（网络）',
    'courseno': '1612205',
    'test': 100,
    'score': 100,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890985,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_1',
    'termname': '2016-2017上学期',
    'courseid': 'BS0300106X3',
    'cname': '电路与电子技术基础实验',
    'courseno': '1612798',
    'test': 85,
    'score': 95,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890999,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_2',
    'termname': '2016-2017下学期',
    'courseid': 'RZ0300044X0',
    'cname': '网站规划与艺术',
    'courseno': '1620032',
    'test': 58,
    'score': 65,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890996,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_2',
    'termname': '2016-2017下学期',
    'courseid': 'BT0300021X2',
    'cname': '计算机网络(双语教学)',
    'courseno': '1620044',
    'test': 61,
    'score': 68,
    'credithour': 4,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890997,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_2',
    'termname': '2016-2017下学期',
    'courseid': 'BT0300041X0',
    'cname': '数字逻辑',
    'courseno': '1620047',
    'test': 66,
    'score': 73,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890992,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_2',
    'termname': '2016-2017下学期',
    'courseid': 'BS0300038X0',
    'cname': '数据结构与算法课程设计',
    'courseno': '1620157',
    'test': 80,
    'score': 85,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890994,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_2',
    'termname': '2016-2017下学期',
    'courseid': 'BS0301048X3',
    'cname': '数据库系统原理实验',
    'courseno': '1620158',
    'test': 94,
    'score': 95,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890995,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_2',
    'termname': '2016-2017下学期',
    'courseid': 'BS0301049X0',
    'cname': 'Java应用开发',
    'courseno': '1620159',
    'test': 94,
    'score': 96,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890998,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_2',
    'termname': '2016-2017下学期',
    'courseid': 'BT0300099X0',
    'cname': '数据库系统原理',
    'courseno': '1620183',
    'test': 71,
    'score': 68,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890989,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_2',
    'termname': '2016-2017下学期',
    'courseid': 'BG0000007X0',
    'cname': '大学英语4',
    'courseno': '1620684',
    'test': 54,
    'score': 71,
    'credithour': 4,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890990,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_2',
    'termname': '2016-2017下学期',
    'courseid': 'BG0000027X0',
    'cname': '体育4',
    'courseno': '1621150',
    'test': 80,
    'score': 79,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890991,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_2',
    'termname': '2016-2017下学期',
    'courseid': 'BG0000041X0',
    'cname': '中国近现代史纲要',
    'courseno': '1621449',
    'test': 54,
    'score': 69,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891000,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_2',
    'termname': '2016-2017下学期',
    'courseid': 'TE0000405X0',
    'cname': '大学生创新基础（网络）',
    'courseno': '1622038',
    'test': 100,
    'score': 100,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891001,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_2',
    'termname': '2016-2017下学期',
    'courseid': 'TW0000377X0',
    'cname': '人人爱设计（网络）',
    'courseno': '1622040',
    'test': 100,
    'score': 100,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890993,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_2',
    'termname': '2016-2017下学期',
    'courseid': 'BS0300042X3',
    'cname': '数字逻辑实验',
    'courseno': '1622503',
    'test': 80,
    'score': 85,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891007,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_1',
    'termname': '2017-2018上学期',
    'courseid': 'BS0306033X3',
    'cname': '网络编程课程设计',
    'courseno': '1710192',
    'test': 80,
    'score': 86,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891005,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_1',
    'termname': '2017-2018上学期',
    'courseid': 'BS0300022X0',
    'cname': '计算机网络课程设计',
    'courseno': '1710193',
    'test': 83,
    'score': 83,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891006,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_1',
    'termname': '2017-2018上学期',
    'courseid': 'BS0306027X0',
    'cname': 'TCP/IP体系结构实践',
    'courseno': '1710194',
    'test': 85,
    'score': 82,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891002,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_1',
    'termname': '2017-2018上学期',
    'courseid': 'BG0000048X0',
    'cname': '形势与政策3',
    'courseno': '1710736',
    'test': 89,
    'score': 89,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891008,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_1',
    'termname': '2017-2018上学期',
    'courseid': 'BT0300024X0',
    'cname': '计算机组成原理',
    'courseno': '1710832',
    'test': 54,
    'score': 66,
    'credithour': 5,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891009,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_1',
    'termname': '2017-2018上学期',
    'courseid': 'BT0300123X0',
    'cname': 'TCP/IP体系结构',
    'courseno': '1710836',
    'test': 92,
    'score': 91,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891010,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_1',
    'termname': '2017-2018上学期',
    'courseid': 'BT0300152X0',
    'cname': '组网技术与交换',
    'courseno': '1710837',
    'test': 82,
    'score': 80,
    'credithour': 4,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891011,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_1',
    'termname': '2017-2018上学期',
    'courseid': 'BT0306013X0',
    'cname': '网络编程',
    'courseno': '1710838',
    'test': 60,
    'score': 69,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891013,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_1',
    'termname': '2017-2018上学期',
    'courseid': 'XZ0300032X0',
    'cname': '软件工程',
    'courseno': '1710839',
    'test': 27,
    'score': 43,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891014,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_1',
    'termname': '2017-2018上学期',
    'courseid': 'XZ0300153X0',
    'cname': 'Android软件开发',
    'courseno': '1710840',
    'test': 87,
    'score': 89,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890987,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2016-2017_1',
    'termname': '2016-2017上学期',
    'courseid': 'KW0000315X0',
    'cname': '军事教育课',
    'courseno': '1610015',
    'test': 100,
    'score': 100,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890968,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_1',
    'termname': '2015-2016上学期',
    'courseid': 'TZ0000134X0',
    'cname': '食品与营养学',
    'courseno': '1510567',
    'test': 100,
    'score': 100,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890961,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_1',
    'termname': '2015-2016上学期',
    'courseid': 'BJ000001510',
    'cname': '高等数学A1',
    'courseno': '1510543',
    'test': 57,
    'score': 63,
    'credithour': 6,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890958,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_1',
    'termname': '2015-2016上学期',
    'courseid': 'BG0000026X0',
    'cname': '思想道德修养与法律基础',
    'courseno': '1510428',
    'test': 63,
    'score': 72,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 890957,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2015-2016_1',
    'termname': '2015-2016上学期',
    'courseid': 'BG0000008X0',
    'cname': '大学英语1',
    'courseno': '1510329',
    'test': 53,
    'score': 69,
    'credithour': 4,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891012,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_1',
    'termname': '2017-2018上学期',
    'courseid': 'XZ0300017X0',
    'cname': '基于.NET的开发技术',
    'courseno': '1710899',
    'test': 67,
    'score': 75,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891003,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_1',
    'termname': '2017-2018上学期',
    'courseid': 'BG0000203X0',
    'cname': '体育达标1',
    'courseno': '1712156',
    'test': 72,
    'score': 72,
    'credithour': 0,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891004,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_1',
    'termname': '2017-2018上学期',
    'courseid': 'BS0000025X0',
    'cname': '社会实践',
    'courseno': '1712419',
    'test': 77,
    'score': 77,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891019,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_2',
    'termname': '2017-2018下学期',
    'courseid': 'RZ0300000X0',
    'cname': 'ACM算法设计与竞赛1',
    'courseno': '1720831',
    'test': 90,
    'score': 84,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891018,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_2',
    'termname': '2017-2018下学期',
    'courseid': 'BT0300009X0',
    'cname': '操作系统',
    'courseno': '1720866',
    'test': 78,
    'score': 82,
    'credithour': 4,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891020,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_2',
    'termname': '2017-2018下学期',
    'courseid': 'RZ0300089X0',
    'cname': 'WEB数据库技术',
    'courseno': '1720867',
    'test': 69,
    'score': 76,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891021,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_2',
    'termname': '2017-2018下学期',
    'courseid': 'RZ0300150X0',
    'cname': '文献检索与科技论文写作',
    'courseno': '1721010',
    'test': 73,
    'score': 78,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891022,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_2',
    'termname': '2017-2018下学期',
    'courseid': 'XZ0300093X0',
    'cname': '无线通信与网络',
    'courseno': '1721018',
    'test': 65,
    'score': 73,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891016,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_2',
    'termname': '2017-2018下学期',
    'courseid': 'BS0300036X0',
    'cname': '生产实习',
    'courseno': '1722204',
    'test': 80,
    'score': 82,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891015,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_2',
    'termname': '2017-2018下学期',
    'courseid': 'BS0300023X0',
    'cname': '计算机原理课程设计',
    'courseno': '1722212',
    'test': 76,
    'score': 78,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891017,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2017-2018_2',
    'termname': '2017-2018下学期',
    'courseid': 'BS0300163X3',
    'cname': 'Android软件开发课程设计',
    'courseno': '1722213',
    'test': 88,
    'score': 88,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891027,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2018-2019_1',
    'termname': '2018-2019上学期',
    'courseid': 'XZ0306012X0',
    'cname': '网络安全与管理',
    'courseno': '1810169',
    'test': 75,
    'score': 77,
    'credithour': 3,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891025,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2018-2019_1',
    'termname': '2018-2019上学期',
    'courseid': 'BS0300064X0',
    'cname': '操作系统课程设计',
    'courseno': '1812150',
    'test': 88,
    'score': 90,
    'credithour': 2,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891026,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2018-2019_1',
    'termname': '2018-2019上学期',
    'courseid': 'BS0306031X3',
    'cname': '综合组网课程设计',
    'courseno': '1812151',
    'test': 69,
    'score': 70,
    'credithour': 4,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891023,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2018-2019_1',
    'termname': '2018-2019上学期',
    'courseid': 'BG0000204X0',
    'cname': '体育达标2',
    'courseno': '1812536',
    'test': 63,
    'score': 63,
    'credithour': 0,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891024,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2018-2019_1',
    'termname': '2018-2019上学期',
    'courseid': 'BS0000035X0',
    'cname': '形势与政策实践',
    'courseno': '1812957',
    'test': 80,
    'score': 80,
    'credithour': 1,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  },
  {
    'id': 891028,
    'grade': 2015,
    'class': '15003501',
    'stid': '1500350104',
    'name': '何建钦',
    'term': '2018-2019_2',
    'termname': '2018-2019下学期',
    'courseid': 'BS0300007X0',
    'cname': '毕业设计',
    'courseno': '1822087',
    'test': 80,
    'score': 84,
    'credithour': 16,
    'stype': '正常',
    'ttype': '正考',
    'testtime': '期考'
  }
]

/** 报道统计 */
@Component({
})
export default class GradeAnalysis extends Vue {
  myChart: any = null;
  tableData: any = [];
  termList: any = [];
  natureList = [{ text: 'BT专业基础必修', value: 'BT' },
  { text: 'BJ基础必修', value: 'BJ' },
  { text: 'BG公共必修', value: 'BG' },
  { text: 'BS实践必修', value: 'BS' },
  { text: 'XZ限选', value: 'XZ' },
  { text: '其它', value: 'other' }]
  mounted() {
    this.myChart = echarts.init(document.getElementById('stuChart') as HTMLDivElement);
    const gradeData = genGradeData(gradeList);
    const termList = Object.keys(gradeData).map(key => (gradeData[key].termName));
    const BTList = Object.keys(gradeData).map(key => getTypeConut(gradeData[key].gradeList, 'BT'));
    const BJList = Object.keys(gradeData).map(key => getTypeConut(gradeData[key].gradeList, 'BJ'));
    const BGList = Object.keys(gradeData).map(key => getTypeConut(gradeData[key].gradeList, 'BG'));
    const BSList = Object.keys(gradeData).map(key => getTypeConut(gradeData[key].gradeList, 'BS'));
    const XZList = Object.keys(gradeData).map(key => getTypeConut(gradeData[key].gradeList, 'XZ'));
    const TotalList = Object.keys(gradeData).map(key => (gradeData[key].gradeList.length));
    const OtherList = TotalList.map((item, index) => {
      return item - BTList[index] - BJList[index] - BGList[index] - BSList[index] - XZList[index];
    })
    Object.keys(gradeData).forEach(key => this.tableData = this.tableData.concat(gradeData[key].gradeList));
    Object.keys(gradeData).forEach(key => this.termList.push({
      text: gradeData[key].termName, value: gradeData[key].termName
    }));
    // 指定图表的配置项和数据
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      grid: {
        right: '20%'
      },
      legend: {
        data: [
          'BT专业基础必修',
          'BJ基础必修',
          'BG公共必修',
          'BS实践必修',
          'XZ限选',
          '其它',
          '总门数',
          '所有课程平均分',
          'BS平均分'
        ]
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: termList
        }
      ],
      yAxis: [
        // {
        //   type: "value",
        //   name: "课程数",
        //   min: 0,
        //   max: 20,
        //   position: "right",
        //   axisLabel: {
        //     formatter: "{value} 门"
        //   }
        // },
        {
          type: 'value',
          name: '分数',
          min: 0,
          max: 100,
          position: 'left',
          axisLabel: {
            formatter: '{value} 分'
          }
        }
      ],
      series: [
        // {
        //   name: "BT专业基础必修",
        //   type: "bar",
        //   yAxisIndex: 0,
        //   data: BTList
        // },
        {
          name: 'BT专业基础必修',
          type: 'line',
          yAxisIndex: 0,
          data: BTList
        },
        // {
        //   name: "BJ基础必修",
        //   type: "bar",
        //   yAxisIndex: 0,
        //   data: BJList
        // },
        {
          name: 'BJ基础必修',
          type: 'line',
          yAxisIndex: 0,
          data: BJList
        },
        // {
        //   name: "BG公共必修",
        //   type: "bar",
        //   yAxisIndex: 0,
        //   data: BGList
        // },
        {
          name: 'BG公共必修',
          type: 'line',
          yAxisIndex: 0,
          data: BGList
        },
        // {
        //   name: "BS实践必修",
        //   type: "bar",
        //   yAxisIndex: 0,
        //   data: BSList
        // },
        {
          name: 'BS实践必修',
          type: 'line',
          yAxisIndex: 0,
          data: BSList
        },
        // {
        //   name: "XZ限选",
        //   type: "bar",
        //   yAxisIndex: 0,
        //   data: XZList
        // },
        {
          name: 'XZ限选',
          type: 'line',
          yAxisIndex: 0,
          data: XZList
        }
        // {
        //   name: "其它",
        //   type: "bar",
        //   yAxisIndex: 0,
        //   data: OtherList
        // },
        // {
        //   name: "总门数",
        //   type: "bar",
        //   yAxisIndex: 0,
        //   data: TotalList
        // }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    this.myChart.setOption(option);

    console.log('data', gradeData)
  }

  beforeDestroy() {
    if (!this.myChart) {
      return
    }
    this.myChart.dispose()
    this.myChart = null
  }

  filterTerm(value: any, row: any, column: any) {
    return row['term'] === value;
  }

  filterNature(value: any, row: any, column: any) {
    if (value === 'other') {
      return !row.courseid.includes('BJ') && !row.courseid.includes('BT') && !row.courseid.includes('BG') && !row.courseid.includes('BS') && !row.courseid.includes('XZ')
    } else {
      return row.courseid.includes(value)
    }
  }

  formatterNature(row: any, column: any) {
    if (row.courseid.includes('BJ')) {
      return 'BJ基础必修'
    } else if (row.courseid.includes('BT')) {
      return 'BT专业基础必修'
    } else if (row.courseid.includes('BG')) {
      return 'BG公共必修';
    } else if (row.courseid.includes('BS')) {
      return 'BS实践必修';
    } else if (row.courseid.includes('XZ')) {
      return 'XZ限选';
    } else {
      return '其它'
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
  margin-bottom: 32px;
}
</style>
