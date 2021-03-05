import service from './service';

// 首页 获取分类目录
export const getCategorys =(params)=>service('/webapi/categorys',"GET", params);