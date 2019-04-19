const VALIDATE = {
  // 字符长度限制，支持min和max，1汉字或汉字字符=3字符
  charLength: function (rule, value, callback) {
    let chineseLength = 0
    const regStr = /[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\u4e00-\u9fa5]/g
    if (value && value.match(regStr)) chineseLength = value.match(regStr).length
    const len = chineseLength * 2 + (value ? value.length : 0)
    if ((rule.min && len < rule.min) || (rule.max && len > rule.max)) {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('长度不合法'))
      }
    } else {
      callback()
    }
  },
  // 中文字母数字下划线
  normalStr_: function (rule, value, callback) {
    if (/(^$)|(^[\u4e00-\u9fa5_a-zA-Z0-9]+$)/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是中文、字母、数字、下划线'))
      }
    }
  },
  // 只能是中文或字母
  chineseOrChar: function (rule, value, callback) {
    if (/^[\u4e00-\u9fa5a-zA-Z]+$/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是中文或字母'))
      }
    }
  },
  // 中文字母数字下划线
  normalStr_: function (rule, value, callback) {
    if (/(^$)|(^[\u4e00-\u9fa5_a-zA-Z0-9]+$)/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是中文、字母、数字、下划线'))
      }
    }
  },
  // 只能是中文或字母
  chineseOrChar: function (rule, value, callback) {
    if (/^[\u4e00-\u9fa5a-zA-Z]+$/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是中文或字母'))
      }
    }
  },
  // 检查邮箱
  checkEmail: function (rule, value, callback) {
    if (/(^$)/.test(value)) callback()
    if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
      callback()
    } else {
      callback(new Error('邮箱有误'))
    }
  },
  // 检查手机号
  checkPhone: function (rule, value, callback) {
    if (/(^$)/.test(value)) callback()
    if (/^1[34578]\d{9}$/.test(value)) {
      callback()
    } else {
      callback(new Error('手机号码有误'))
    }
  }
}

export default VALIDATE
