const getters = {
  permission_routes: state => state.permission.routes,
  menu_type: state => state.permission.menuType,
  tabIdx: state => state.permission.tabIndex,
  userInfo: state => state.user.userInfo,
  checkDtype: state => state.common.checkDtype,
  checkQtype: state => state.common.checkQtype,
  checkMonth: state => state.common.checkMonth,
  checkMonthS: state => state.common.checkMonthS,
}
export default getters
