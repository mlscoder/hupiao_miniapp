   const basePath = 'https://api.adong.fun';
//const basePath = 'http://localhost';

const urlList = {
  //地铁线路配置获取连接 后期转移到本地
  config:'https://m.hizhu.com/houseselect.html', 
  
  // refreshTokeUrl: basePath + '/refreshToke',//token
  // 登录获取保存用户信息
  loginUrl: basePath + '/wxapp/getopenId',//
  userInfo: basePath + '/wxapp/userinfo',//
  sendsms: basePath + '/wxapp/sendsms',  // 发送短信，暂时未用
  verify: basePath + '/wxapp/verify', //信息更新
  custom: basePath + '/wxapp/custom',//新增定制
  getcustom: basePath + '/wxapp/getcustom', //查询定制
  getcustomhistory: basePath + '/wxapp/getcustomhistory',//查询定制
  getrentinfo: basePath +  '/wxapp/rentinfo',
  getnotice: basePath + '/wxapp/getnotice',
  querylist: basePath + '/wxapp/query',
  queryone: basePath + '/wxapp/queryone',
  message: basePath + '/wxapp/message'
}
module.exports = urlList;
