/**
 * yxAPI
 *
 *
 * version v1
 *
 *
 * NOTE: This class is auto generated by the code generator.
 * Do not edit the class manually.
 */
import * as m from "./models";
import { encodeQuery } from "@/utils";
import { Log } from "@/logbox";
import { apiSendAsync, ApiRequestOptions } from "@/utils/apiRequest";

const defaultPageSize = 20;

const protocol = "https";
export const apiHost = process.env.VUE_APP_API_HOST;
const basePath = "";
export const baseUrl = `${protocol}://${apiHost}`;
export const wssBaseUrl = `wss://${apiHost}${basePath}/ws`;

/*
    export interface m.DataResponse&lt;m.TokenObj&gt; extends m.RestfulData{
      data?: m.TokenObj;
    }
*/

/**
 * 登陆获取token
 * @param signinForm m.SigninForm
 */
export function Sigin(options: {
  signinForm: m.SigninForm;
}): Promise<m.DataResponse<m.TokenObj>> {
  const opts: ApiRequestOptions = {
    url: `/api/Auth`,
    method: "post",
    reqName: "Sigin"
  };

  opts.data = options.signinForm;
  return apiSendAsync<m.DataResponse<m.TokenObj>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 退出登录
 */
export function Logout(): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Auth/logout`,
    method: "post",
    reqName: "Logout"
  };

  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.UserInfo&gt; extends m.RestfulData{
      data?: m.UserInfo;
    }
*/

/**
 *
 */
export function GetUserInfo(): Promise<m.DataResponse<m.UserInfo>> {
  const opts: ApiRequestOptions = {
    url: `/api/Auth/user`,
    method: "get",
    reqName: "GetUserInfo"
  };

  return apiSendAsync<m.DataResponse<m.UserInfo>>(opts);
}
/*
    export interface m.PageResponse&lt;m.Bed[]&gt; extends m.RestfulData{
      data?: m.Bed[];
      total: number;
      page: number;
      pageSize: number;
    }
*/

/**
 * 获取床位列表
 * @param page number integer
 * @param pageSize number integer
 * @param status number integer
 */
export function GetBedList(options: {
  page?: number;
  pageSize?: number;
  status?: number;
}): Promise<m.PageResponse<m.Bed[]>> {
  const opts: ApiRequestOptions = {
    url: `/api/Bed`,
    method: "get",
    reqName: "GetBedList"
  };

  options.pageSize = options.pageSize || defaultPageSize;

  opts.params = {
    page: options.page,
    pageSize: options.pageSize,
    status: options.status
  };

  return apiSendAsync<m.PageResponse<m.Bed[]>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 新增床位
 * @param value string
 */
export function PostBed(options: {
  value?: string;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Bed`,
    method: "post",
    reqName: "PostBed"
  };

  opts.data = options.value;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 修改床位信息
 * @param id number integer
 * @param value string
 */
export function PutBed(options: {
  id: number;
  value?: string;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Bed/${options.id}`,
    method: "put",
    reqName: "PutBed"
  };

  opts.data = options.value;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 删除床位信息
 * @param id number integer
 */
export function DeleteBed(options: {
  id: number;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Bed/${options.id}`,
    method: "delete",
    reqName: "DeleteBed"
  };

  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.PageResponse&lt;m.Campus[]&gt; extends m.RestfulData{
      data?: m.Campus[];
      total: number;
      page: number;
      pageSize: number;
    }
*/

/**
 * 校区列表
 */
export function GetCampusList(): Promise<m.PageResponse<m.Campus[]>> {
  const opts: ApiRequestOptions = {
    url: `/api/Campus`,
    method: "get",
    reqName: "GetCampusList"
  };

  return apiSendAsync<m.PageResponse<m.Campus[]>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 新增校区
 * @param campus m.Campus
 */
export function PostCampus(options: {
  campus?: m.Campus;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Campus`,
    method: "post",
    reqName: "PostCampus"
  };

  opts.data = options.campus;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 更新校区
 * @param id number integer
 * @param campus m.Campus
 */
export function PutCampus(options: {
  id: number;
  campus?: m.Campus;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Campus/${options.id}`,
    method: "put",
    reqName: "PutCampus"
  };

  opts.data = options.campus;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 删除校区
 * @param id number integer
 */
export function DeleteCampus(options: {
  id: number;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Campus/${options.id}`,
    method: "delete",
    reqName: "DeleteCampus"
  };

  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.PageResponse&lt;m.College[]&gt; extends m.RestfulData{
      data?: m.College[];
      total: number;
      page: number;
      pageSize: number;
    }
*/

/**
 * 获取学院列表
 */
export function GetCollegeList(): Promise<m.PageResponse<m.College[]>> {
  const opts: ApiRequestOptions = {
    url: `/api/College`,
    method: "get",
    reqName: "GetCollegeList"
  };

  return apiSendAsync<m.PageResponse<m.College[]>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 新增学院
 * @param college m.College
 */
export function PostCollege(options: {
  college?: m.College;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/College`,
    method: "post",
    reqName: "PostCollege"
  };

  opts.data = options.college;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 更新学院
 * @param id number integer
 * @param college m.College
 */
export function Put(options: {
  id: number;
  college?: m.College;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/College/${options.id}`,
    method: "put",
    reqName: "Put"
  };

  opts.data = options.college;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 删除学院
 * @param id number integer
 */
export function DeleteCollege(options: {
  id: number;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/College/${options.id}`,
    method: "delete",
    reqName: "DeleteCollege"
  };

  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.PageResponse&lt;m.Fee[]&gt; extends m.RestfulData{
      data?: m.Fee[];
      total: number;
      page: number;
      pageSize: number;
    }
*/

/**
 * 学生获取财务信息
 */
export function GetStudentFee(): Promise<m.PageResponse<m.Fee[]>> {
  const opts: ApiRequestOptions = {
    url: `/api/Fee/student`,
    method: "get",
    reqName: "GetStudentFee"
  };

  return apiSendAsync<m.PageResponse<m.Fee[]>>(opts);
}
/*
    export interface m.DataResponse&lt;m.Fee&gt; extends m.RestfulData{
      data?: m.Fee;
    }
*/

/**
 * 获取某个财务项
 * @param id number integer
 */
export function GetFee(options: {
  id: number;
}): Promise<m.DataResponse<m.Fee>> {
  const opts: ApiRequestOptions = {
    url: `/api/Fee/${options.id}`,
    method: "get",
    reqName: "GetFee"
  };

  return apiSendAsync<m.DataResponse<m.Fee>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 更改财务信息
 * @param id number integer
 * @param fee m.Fee
 */
export function PutFee(options: {
  id: number;
  fee?: m.Fee;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Fee/${options.id}`,
    method: "put",
    reqName: "PutFee"
  };

  opts.data = options.fee;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 删除财务信息
 * @param id number integer
 */
export function DeleteFee(options: {
  id: number;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Fee/${options.id}`,
    method: "delete",
    reqName: "DeleteFee"
  };

  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.PageResponse&lt;m.Fee[]&gt; extends m.RestfulData{
      data?: m.Fee[];
      total: number;
      page: number;
      pageSize: number;
    }
*/

/**
 * 获取财务列表
 * @param page number integer
 * @param pageSize number integer
 */
export function GetFeeList(options: {
  page?: number;
  pageSize?: number;
}): Promise<m.PageResponse<m.Fee[]>> {
  const opts: ApiRequestOptions = {
    url: `/api/Fee`,
    method: "get",
    reqName: "GetFeeList"
  };

  options.pageSize = options.pageSize || defaultPageSize;

  opts.params = {
    page: options.page,
    pageSize: options.pageSize
  };

  return apiSendAsync<m.PageResponse<m.Fee[]>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 新增财务信息项
 * @param fee m.Fee
 */
export function PostFee(options: {
  fee?: m.Fee;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Fee`,
    method: "post",
    reqName: "PostFee"
  };

  opts.data = options.fee;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 下载文件
 * @param fileKey number integer
 */
export function GetFile(options: {
  fileKey: number;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/File/${options.fileKey}`,
    method: "get",
    reqName: "GetFile"
  };

  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.PageResponse&lt;m.GreenChannel[]&gt; extends m.RestfulData{
      data?: m.GreenChannel[];
      total: number;
      page: number;
      pageSize: number;
    }
*/

/**
 * 获取绿色通道列表
 */
export function GetGreenChannelList(): Promise<
  m.PageResponse<m.GreenChannel[]>
> {
  const opts: ApiRequestOptions = {
    url: `/api/GreenChannel`,
    method: "get",
    reqName: "GetGreenChannelList"
  };

  return apiSendAsync<m.PageResponse<m.GreenChannel[]>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 新增绿色通道申请
 * @param greenChannel m.GreenChannel
 */
export function PostGreenChannel(options: {
  greenChannel?: m.GreenChannel;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/GreenChannel`,
    method: "post",
    reqName: "PostGreenChannel"
  };

  opts.data = options.greenChannel;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.GreenChannel&gt; extends m.RestfulData{
      data?: m.GreenChannel;
    }
*/

/**
 * 获取某个学生的绿色通道申请
 * @param studentId number integer
 */
export function GetGreenChannel(options: {
  studentId: number;
}): Promise<m.DataResponse<m.GreenChannel>> {
  const opts: ApiRequestOptions = {
    url: `/api/GreenChannel/${options.studentId}`,
    method: "get",
    reqName: "GetGreenChannel"
  };

  return apiSendAsync<m.DataResponse<m.GreenChannel>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 更改绿色通道申请
 * @param id number integer
 * @param greenChannele m.GreenChannel
 */
export function PutGreenChannel(options: {
  id: number;
  greenChannele?: m.GreenChannel;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/GreenChannel/${options.id}`,
    method: "put",
    reqName: "PutGreenChannel"
  };

  opts.data = options.greenChannele;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 删除绿色通道申请
 * @param id number integer
 */
export function DeleteGreenChannel(options: {
  id: number;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/GreenChannel/${options.id}`,
    method: "delete",
    reqName: "DeleteGreenChannel"
  };

  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.PageResponse&lt;m.InfoCategory[]&gt; extends m.RestfulData{
      data?: m.InfoCategory[];
      total: number;
      page: number;
      pageSize: number;
    }
*/

/**
 * 获取信息类别列表
 */
export function GetInfoCategoryList(): Promise<
  m.PageResponse<m.InfoCategory[]>
> {
  const opts: ApiRequestOptions = {
    url: `/api/InfoCategory`,
    method: "get",
    reqName: "GetInfoCategoryList"
  };

  return apiSendAsync<m.PageResponse<m.InfoCategory[]>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 修改信息类别项
 * @param id number integer
 * @param value string
 */
export function PutInfoCategory(options: {
  id?: number;
  value?: string;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/InfoCategory`,
    method: "put",
    reqName: "PutInfoCategory"
  };

  opts.params = {
    id: options.id
  };

  opts.data = options.value;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 新增某类型信息类别项
 * @param value string
 */
export function PostInfoCategory(options: {
  value?: string;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/InfoCategory`,
    method: "post",
    reqName: "PostInfoCategory"
  };

  opts.data = options.value;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.PageResponse&lt;m.InfoCategory[]&gt; extends m.RestfulData{
      data?: m.InfoCategory[];
      total: number;
      page: number;
      pageSize: number;
    }
*/

/**
 * 获取某类型信息类别列表
 * @param type string string
 */
export function GetInfoCategoryItem(options: {
  type: string;
}): Promise<m.PageResponse<m.InfoCategory[]>> {
  const opts: ApiRequestOptions = {
    url: `/api/InfoCategory/${options.type}`,
    method: "get",
    reqName: "GetInfoCategoryItem"
  };

  return apiSendAsync<m.PageResponse<m.InfoCategory[]>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 删除信息类别项
 * @param id number integer
 */
export function DeleteInfoCategory(options: {
  id: number;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/InfoCategory/${options.id}`,
    method: "delete",
    reqName: "DeleteInfoCategory"
  };

  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.Leave&gt; extends m.RestfulData{
      data?: m.Leave;
    }
*/

/**
 * 学生获取请假信息(包括请假与保留资格)
 * @param type number integer
 */
export function GetLeave(options: {
  type?: number;
}): Promise<m.DataResponse<m.Leave>> {
  const opts: ApiRequestOptions = {
    url: `/api/Leave`,
    method: "get",
    reqName: "GetLeave"
  };

  opts.params = {
    type: options.type
  };

  return apiSendAsync<m.DataResponse<m.Leave>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 学生新建请假
 * @param leave m.Leave
 */
export function PostLeave(options: {
  leave?: m.Leave;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Leave`,
    method: "post",
    reqName: "PostLeave"
  };

  opts.data = options.leave;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.PageResponse&lt;m.Leave[]&gt; extends m.RestfulData{
      data?: m.Leave[];
      total: number;
      page: number;
      pageSize: number;
    }
*/

/**
 * 获取请假列表
 * @param type number integer
 * @param page number integer
 * @param pageSize number integer
 */
export function GetLeaveList(options: {
  type?: number;
  page?: number;
  pageSize?: number;
}): Promise<m.PageResponse<m.Leave[]>> {
  const opts: ApiRequestOptions = {
    url: `/api/Leave/list`,
    method: "get",
    reqName: "GetLeaveList"
  };

  options.pageSize = options.pageSize || defaultPageSize;

  opts.params = {
    type: options.type,
    page: options.page,
    pageSize: options.pageSize
  };

  return apiSendAsync<m.PageResponse<m.Leave[]>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 更新请假申请
 * @param id number integer
 * @param leave m.Leave
 */
export function PutLeave(options: {
  id: number;
  leave?: m.Leave;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Leave/${options.id}`,
    method: "put",
    reqName: "PutLeave"
  };

  opts.data = options.leave;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 删除请假申请
 * @param id number integer
 */
export function DeleteLeave(options: {
  id: number;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Leave/${options.id}`,
    method: "delete",
    reqName: "DeleteLeave"
  };

  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.PageResponse&lt;m.Major[]&gt; extends m.RestfulData{
      data?: m.Major[];
      total: number;
      page: number;
      pageSize: number;
    }
*/

/**
 * 获取专业列表
 */
export function GetMajorList(): Promise<m.PageResponse<m.Major[]>> {
  const opts: ApiRequestOptions = {
    url: `/api/Major`,
    method: "get",
    reqName: "GetMajorList"
  };

  return apiSendAsync<m.PageResponse<m.Major[]>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 新增专业
 * @param major m.Major
 */
export function PostMajor(options: {
  major?: m.Major;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Major`,
    method: "post",
    reqName: "PostMajor"
  };

  opts.data = options.major;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 更改专业信息
 * @param id number integer
 * @param major m.Major
 */
export function PutMajor(options: {
  id: number;
  major?: m.Major;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Major/${options.id}`,
    method: "put",
    reqName: "PutMajor"
  };

  opts.data = options.major;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 删除专业信息
 * @param id number integer
 */
export function DeleteMajor(options: {
  id: number;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Major/${options.id}`,
    method: "delete",
    reqName: "DeleteMajor"
  };

  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.PageResponse&lt;m.News[]&gt; extends m.RestfulData{
      data?: m.News[];
      total: number;
      page: number;
      pageSize: number;
    }
*/

/**
 * 获取新闻列表
 * @param page number integer
 * @param pageSize number integer
 */
export function GetNewsList(options: {
  page?: number;
  pageSize?: number;
}): Promise<m.PageResponse<m.News[]>> {
  const opts: ApiRequestOptions = {
    url: `/api/News`,
    method: "get",
    reqName: "GetNewsList"
  };

  options.pageSize = options.pageSize || defaultPageSize;

  opts.params = {
    page: options.page,
    pageSize: options.pageSize
  };

  return apiSendAsync<m.PageResponse<m.News[]>>(opts);
}
/*
    export interface m.DataResponse&lt;m.News&gt; extends m.RestfulData{
      data?: m.News;
    }
*/

/**
 * 新增新闻
 * @param news m.News
 */
export function PostNews(options: {
  news?: m.News;
}): Promise<m.DataResponse<m.News>> {
  const opts: ApiRequestOptions = {
    url: `/api/News`,
    method: "post",
    reqName: "PostNews"
  };

  opts.data = options.news;
  return apiSendAsync<m.DataResponse<m.News>>(opts);
}
/*
    export interface m.DataResponse&lt;m.News&gt; extends m.RestfulData{
      data?: m.News;
    }
*/

/**
 * 获取新闻详情
 * @param id number integer
 */
export function GetNews(options: {
  id: number;
}): Promise<m.DataResponse<m.News>> {
  const opts: ApiRequestOptions = {
    url: `/api/News/${options.id}`,
    method: "get",
    reqName: "GetNews"
  };

  return apiSendAsync<m.DataResponse<m.News>>(opts);
}
/*
    export interface m.DataResponse&lt;m.News&gt; extends m.RestfulData{
      data?: m.News;
    }
*/

/**
 * 修改新闻
 * @param id number integer
 * @param news m.News
 */
export function PutNews(options: {
  id: number;
  news?: m.News;
}): Promise<m.DataResponse<m.News>> {
  const opts: ApiRequestOptions = {
    url: `/api/News/${options.id}`,
    method: "put",
    reqName: "PutNews"
  };

  opts.data = options.news;
  return apiSendAsync<m.DataResponse<m.News>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 删除新闻
 * @param id number integer
 */
export function DeleteNews(options: {
  id: number;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/News/${options.id}`,
    method: "delete",
    reqName: "DeleteNews"
  };

  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.PageResponse&lt;m.Payment[]&gt; extends m.RestfulData{
      data?: m.Payment[];
      total: number;
      page: number;
      pageSize: number;
    }
*/

/**
 * 获取缴费信息列表
 */
export function GetPaymentList(): Promise<m.PageResponse<m.Payment[]>> {
  const opts: ApiRequestOptions = {
    url: `/api/Payment`,
    method: "get",
    reqName: "GetPaymentList"
  };

  return apiSendAsync<m.PageResponse<m.Payment[]>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 新增缴费
 * @param value string
 */
export function PostPayment(options: {
  value?: string;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Payment`,
    method: "post",
    reqName: "PostPayment"
  };

  opts.data = options.value;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 更新缴费
 * @param id number integer
 * @param value string
 */
export function PutPayment(options: {
  id: number;
  value?: string;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Payment/${options.id}`,
    method: "put",
    reqName: "PutPayment"
  };

  opts.data = options.value;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 删除缴费
 * @param id number integer
 */
export function DeletePayment(options: {
  id: number;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Payment/${options.id}`,
    method: "delete",
    reqName: "DeletePayment"
  };

  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.PageResponse&lt;m.Student[]&gt; extends m.RestfulData{
      data?: m.Student[];
      total: number;
      page: number;
      pageSize: number;
    }
*/

/**
 * 获取学生信息列表
 * @param page number integer
 * @param pageSize number integer
 */
export function GetStudentList(options: {
  page?: number;
  pageSize?: number;
}): Promise<m.PageResponse<m.Student[]>> {
  const opts: ApiRequestOptions = {
    url: `/api/Student`,
    method: "get",
    reqName: "GetStudentList"
  };

  options.pageSize = options.pageSize || defaultPageSize;

  opts.params = {
    page: options.page,
    pageSize: options.pageSize
  };

  return apiSendAsync<m.PageResponse<m.Student[]>>(opts);
}
/*
    export interface m.DataResponse&lt;m.Student&gt; extends m.RestfulData{
      data?: m.Student;
    }
*/

/**
 * 新增单个学生
 * @param student m.Student
 */
export function PostStudent(options: {
  student?: m.Student;
}): Promise<m.DataResponse<m.Student>> {
  const opts: ApiRequestOptions = {
    url: `/api/Student`,
    method: "post",
    reqName: "PostStudent"
  };

  opts.data = options.student;
  return apiSendAsync<m.DataResponse<m.Student>>(opts);
}
/*
    export interface m.DataResponse&lt;m.Student&gt; extends m.RestfulData{
      data?: m.Student;
    }
*/

/**
 * 获取学生（admin可以获得任意学生，student只能获取自己）
 * @param id number integer
 */
export function GetStudent(options: {
  id: number;
}): Promise<m.DataResponse<m.Student>> {
  const opts: ApiRequestOptions = {
    url: `/api/Student/${options.id}`,
    method: "get",
    reqName: "GetStudent"
  };

  return apiSendAsync<m.DataResponse<m.Student>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 更新学生信息
 * @param id number integer
 * @param value string
 */
export function PutStudent(options: {
  id: number;
  value?: string;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Student/${options.id}`,
    method: "put",
    reqName: "PutStudent"
  };

  opts.data = options.value;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 删除某个学生
 * @param id number integer
 */
export function DeleteStudent(options: {
  id: number;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/Student/${options.id}`,
    method: "delete",
    reqName: "DeleteStudent"
  };

  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.PageResponse&lt;m.User[]&gt; extends m.RestfulData{
      data?: m.User[];
      total: number;
      page: number;
      pageSize: number;
    }
*/

/**
 * 获取用户列表
 * @param page number integer
 * @param pageSize number integer
 */
export function GetUserList(options: {
  page?: number;
  pageSize?: number;
}): Promise<m.PageResponse<m.User[]>> {
  const opts: ApiRequestOptions = {
    url: `/api/User`,
    method: "get",
    reqName: "GetUserList"
  };

  options.pageSize = options.pageSize || defaultPageSize;

  opts.params = {
    page: options.page,
    pageSize: options.pageSize
  };

  return apiSendAsync<m.PageResponse<m.User[]>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 新增用户
 * @param user m.User
 */
export function PostUser(options: {
  user?: m.User;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/User`,
    method: "post",
    reqName: "PostUser"
  };

  opts.data = options.user;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.User&gt; extends m.RestfulData{
      data?: m.User;
    }
*/

/**
 * 获取用户信息
 * @param id number integer
 */
export function GetUser(options: {
  id: number;
}): Promise<m.DataResponse<m.User>> {
  const opts: ApiRequestOptions = {
    url: `/api/User/${options.id}`,
    method: "get",
    reqName: "GetUser"
  };

  return apiSendAsync<m.DataResponse<m.User>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 更改用户
 * @param id number integer
 * @param user m.User
 */
export function PutUser(options: {
  id: number;
  user?: m.User;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/User/${options.id}`,
    method: "put",
    reqName: "PutUser"
  };

  opts.data = options.user;
  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
/*
    export interface m.DataResponse&lt;m.RestfulData&gt; extends m.RestfulData{
      data?: m.RestfulData;
    }
*/

/**
 * 删除用户
 * @param id number integer
 */
export function DeleteUser(options: {
  id: number;
}): Promise<m.DataResponse<m.RestfulData>> {
  const opts: ApiRequestOptions = {
    url: `/api/User/${options.id}`,
    method: "delete",
    reqName: "DeleteUser"
  };

  return apiSendAsync<m.DataResponse<m.RestfulData>>(opts);
}
