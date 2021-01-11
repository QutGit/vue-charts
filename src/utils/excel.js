// 导出excel公共封装
const extExcel = (tHeader,data, filename = "薪社会") =>{
  import('@/support/export2excel').then(excel => {
    excel.export_json_to_excel({
      header: tHeader, //表头 必填
      data, //具体数据 必填
      filename, //非必填
      autoWidth: true, //非必填
      bookType: 'xlsx' //非必填
    })
  })
}

export { extExcel };