import { host } from '../util/env_host'
// 全局检测用户身份
export default {
  // watch:{
  //   'user.userId'(val){
  //       // console.log(val,99888324)
  //       val && this.loginCheck()
  //   }
  // },
  methods:{
    loginCheck(){
      

      this.AJAX.get('/permission/invitation/loginCheck',
        {baseURL:'/'})
        .then((res)=>{
          // console.log({res})
          let resData = res.code === undefined ? res.data : res;
          switch(resData.code){
            case '103119':
              location.href = 'http://' + location.host + '/console/home/developer.html#/pc/choose';
            break;
            case '103120':
              
              location.href = `http://authentication.${host}/#/pc/register/waitCheckInfo/joinGroup`
            break;
            case '103150':
              location.href = `http://authentication.${host}/#/pc/register/waitCheckInfo/joinProject`
            break;
            case '103121':
              this.AlertMsg({
                type: 'warning',
                message: '个人开发者加入公司待审核中'
              })
            break;
            case '103142':
              this.AlertMsg({
                type: 'warning',
                message: '个人开发者认领公司待审核中'
              })
            break;
            case '103145':
              location.href = `http://authentication.${host}/#/pc/register/waitCheckInfo/claimGroup`
            break;
          }
        })
    }
  }
}
