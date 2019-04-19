import cookie from 'js-cookie'
import { host } from '../util/env_host'

export default {
  methods:{
    loginout()  {
      const token = cookie.get('TOKEN')
      const origin = location.protocol+'//'+location.host
      this.AJAX.get(`${origin}/auth/invalidate?token=${token}`).then(res => {
        cookie.remove('TOKEN')
        cookie.remove('TOKEN',{domain:'.'+host})
        cookie.remove('groupKey')
        cookie.remove('groupKey',{domain:'.'+host})
        cookie.remove('Rmem-auth')
        cookie.remove('Rmem-auth',{domain:'.'+host})
        location.href = origin;
        // location.href = `http://authentication.${host}/#/pc/login/commons`
        // location.href = `http://authentication.${host}/?service=${encodeURIComponent(location.href)}#/pc/login/commons`
      })
    }
  }
}