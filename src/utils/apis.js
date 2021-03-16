import service from './service';

// 首页 获取分类目录
export const getCategorys =(params)=>service('/webapi/categorys',"GET", params)
// 分页获取 文章列表
export const getArticles =(params)=>service('/bossapi/articles',"GET", params)
