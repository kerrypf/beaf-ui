// import Vue from 'vue'

/**
* 提供给element UI表单验证的validator,例如：
* import VALIDATE from '../../utils/validates'
* productName: [
*  { required: true, message: '请输入产品名称', trigger: 'blur' },
*  { validator: VALIDATE.charLength, max: 30,
*    message: '产品名称不能多于30个字符（1个汉字为3个字符）', trigger: 'blur' },
*  { validator: VALIDATE.normalStr, message: '产品名称只能是中文、字母、数字', trigger: 'blur' }
* ]
**/
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
   // 上传文件文件名验证,中文、字母、数字、下划线、空格符或“_”、“-”、“.”,首字母为中文字母数字或下划线
  validateFileName (filename) {
    if (/^[\u4e00-\u9fa5a-zA-Z0-9_][\u4e00-\u9fa5a-zA-Z0-9\. _-]*$/.test(filename)) {
      return true
    } else {
      return false
    }
  },
  // 检查手机号或固定电话号码
  checkPhoneOrTel: function (rule, value, callback) {
    if (/(^$)/.test(value)) callback()
    if (/^1[345789]\d{9}$/.test(value) || /^((0\d{2,3})[\s-])(\d{7,8})([-\s](\d{3,}))?$/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('号码有误，请重填'))
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
  },
  // 文件类型验证,返回文件类型
  validateFileType (filename, fileTypes) {
    let fileType
    if (/^.*\.[zZ][iI][pP]$/.test(filename)) {
      fileType = 'zip'
    } else if (/^.*\.[pP][nN][gG]$/.test(filename)) {
      fileType = 'png'
    } else if (/^.*\.[jJ][pP][gG]$/.test(filename)) {
      fileType = 'jpg'
    } else if (/^.*\.[jJ][pP][eE][gG]$/.test(filename)) {
      fileType = 'jpeg'
    } else if (/^.*\.[tT][xX][tT]$/.test(filename)) {
      fileType = 'txt'
    } else {
      fileType = ''
    }
    return fileTypes && fileTypes.indexOf(fileType) > -1 ?
      (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' ? 'img' : fileType) : ''
  },

  // 必填
  require: function (rule, value, callback) {
    if (value) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('不能为空'))
      }
    }
  },
  // 中文字母数字
  normalStr: function (rule, value, callback) {
    if (/(^$)|(^[\u4e00-\u9fa5a-zA-Z0-9]+$)/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是中文、字母、数字'))
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
  // 只能是中文
  chinese: function (rule, value, callback) {
    if (/^[\u4e00-\u9fa5]+$/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是中文'))
      }
    }
  },
  // 只能是字母
  char: function (rule, value, callback) {
    if (/^[a-zA-Z]+$/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是字母'))
      }
    }
  },
  // 只能是数字
  number: function (rule, value, callback) {
    if (/(^$)|(^[0-9]+$)/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是数字'))
      }
    }
  },
  // 只能是字母或数字
  charOrNumber: function (rule, value, callback) {
    if (/^[a-zA-Z0-9]+$/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是字母或数字'))
      }
    }
  },
   // 只能是字母或数字,且不能以数字开头
  charOrNumberNotNumberStart: function (rule, value, callback) {
    if (/^[a-zA-Z][a-zA-Z0-9]*$/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是字母或数字,且不能以数字开头'))
      }
    }
  },
  // 只能是字母或数字和下划线
  charOrNumber_: function (rule, value, callback) {
    if (/^[a-zA-Z0-9_]+$/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是字母、数字或下划线'))
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
  // 中文字母或下划线
  chineseOrChar_: function (rule, value, callback) {
    if (/^[\u4e00-\u9fa5a-zA-Z_]+$/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是中文、字母或下划线'))
      }
    }
  },
  // 小数点后不能超过3位
  decimalPlaces: function (rule, value, callback) {
    if (/^\d+(\.\d{1,3})?$/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('小数点后不超过3位'))
      }
    }
  },
  //范围在0.001~0.999之间
  betweenZeroAndOne: function (rule, value, callback) {
    if (value > 0 && value < 1) { // 0 < value < 1 只能识别value < 1
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('范围在0.001~0.999之间'))
      }
    }
  },
  // 只能是字母或单个空格，并且两端不能是空格
  CharOrMidSingleSpace: function (rule, value, callback) {
    if (/^([a-zA-Z]+\s?)*[a-zA-Z]$/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('只能是字母或用单个空格分隔的字母'))
      }
    }
  },
 
  // 不超过max行，不少于min行（非空行）
  row: function (rule, value, callback) {
    let len = 0
    const regStr = /\n./g
    if (value.match(regStr)) len = value.match(regStr).length
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
  
  // 只能是中英文 或者 '[]' '()' '|' 及成对的 '##' (电话选择支持.)
  chineseOrCharOrSymbolPhone: function (rule, value, callback) {
    if (/^[\s\u4e00-\u9fa5a-zA-Z\.()|#\r\n\[\]]*$/.test(value)) {
      const newVal = value.replace(/\#[^#]+\#/g, '')
      if (/(#)+/.test(newVal)) {
        if (rule.message) {
          callback(new Error(rule.message))
        } else {
          callback(new Error('#符号必须成对出现，##中间请填写语义槽名称'))
        }
      } else {
        callback()
      }
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('仅支持中英文，空格，英文符号()[] |，语义槽引用符号##'))
      }
    }
  },
  // 只能是中英文 或者 '[]' '()' '|' 及成对的 '##'
  chineseOrCharOrSymbol: function (rule, value, callback) {
    if (/^[\s\u4e00-\u9fa5a-zA-Z()|#\r\n\[\]]*$/.test(value)) {
      const newVal = value.replace(/\#[^#]+\#/g, '')
      if (/(#)+/.test(newVal)) {
        if (rule.message) {
          callback(new Error(rule.message))
        } else {
          callback(new Error('#符号必须成对出现，##中间请填写语义槽名称'))
        }
      } else {
        callback()
      }
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('仅支持中英文，空格，英文符号()[] |，语义槽引用符号##'))
      }
    }
  },
  // '()''[]'及'#'不能嵌套使用
  nestedUnable: function (rule, value, callback) {
    if (/[\(\[\)\]]/.test(value)) {
      // 1. 去掉第一层被括号包围的内容
      const newVal = value.replace(/(\([^\(\)\[\]]*\))|(\[[^\[\]\(\)]*\])/g, '')
      // 2. 如果还有括号说明括号有嵌套
      if (!/[\(\[\)\]]/.test(newVal)) {
        callback()
      } else {
        if (rule.message) {
          callback(new Error(rule.message))
        } else {
          callback(new Error("'()''[]'及'#'不能嵌套使用"))
        }
      }
    } else {
      callback()
    }
  },
  // '|'必须出现在括号内
  inParentheses: function (rule, value, callback) {
    if (/[|]+/.test(value)) {
      // 1. 去掉被括号包围的内容
      const newVal = value.replace(/(\([^\(\)\[\]]*\))|(\[[^\[\]\(\)]*\])/g, '')
      // 2. 如果还有|说明括号外有|
      if (!/[|]+/.test(newVal)) {
        callback()
      } else {
        if (rule.message) {
          callback(new Error(rule.message))
        } else {
          callback(new Error("'|'必须出现在括号内"))
        }
      }
    } else {
      callback()
    }
  },
  // IP格式验证
  IP: function (rule, value, callback) {
    if (!value) return
    const ipArr = value.split('\n')
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    for (var i = 0; i < ipArr.length; i++) {
      if (reg.test(ipArr[i])) {
        callback()
      } else {
        if (rule.message) {
          callback(new Error(rule.message))
        } else {
          callback(new Error(`IP地址不合法`))
        }
        break
      }
    }
  },
  // URL格式验证
  URL: function (rule, value, callback) {
    if (!value) return
    var urlRegExp = /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
    if (urlRegExp.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error(`服务地址不合法`))
      }
    }
  },
  callbackURL: function (rule, value, callback) {
    if (!value) return
    var urlRegExp =  /^[^\u4e00-\u9fa5]{0,}$/
    if (urlRegExp.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error(`服务地址不合法`))
      }
    }
  },
  SHA256: function (rule, value, callback) {
    if (!value) return
    var SHARegExp = /^([A-Z\d]{2})+(:[A-Z\d]{2}){31}$/
    if (SHARegExp.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error(`SHA256格式不合法`))
      }
    }
  },
  SHA256Char: function (rule, value, callback) {
    if (!value) return
    const charRegExp = /^[A-Z\d:]*$/
    if (charRegExp.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error(`SHA256格式不合法`))
      }
    }
  },
  bundleId: function (rule, value, callback) {
    if (!value) return
    const bundleIdRegExp = /^[a-zA-Z][a-zA-Z0-9._]*$/
    if (bundleIdRegExp.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error(`Bunble ID以字母开头，由字母、数字、下划线和点组成`))
      }
    }
  },
  // '#'号必须成对出现,数字只能出现在#中
  poundSignParsing (rule, value, callback) {
    if (/[#]+/.test(value)) {
      const newVal = value.replace(/\#[^#]+\#/g, '')
      if (/[0-9#]+/.test(newVal)) {
        if (rule.message) {
          callback(new Error(rule.message))
        } else {
          callback(new Error("'#'必须成双、'#'中间不能为空、数字只能出现在'#'中间"))
        }
      } else {
        callback()
      }
    } else {
      callback()
    }
  },
  // #不能在括号里面
  hashInParentheses: function (rule, value, callback) {
    if (/\([^\(\)]*#[^\(\)]*\)|\[[^\[\]]*#[^\[\]]*\]/.test(value)) {
      callback(new Error('#符号不允许出现在括号内() []'))
    } else {
      callback()
    }
  },
  // 必须有标签<>
  tagsRequire: function (rule, value, callback) {
    if (!value || /<.*>/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('必须有标签'))
      }
    }
  },
  // <speak></speak>标签必须存在且在最外面，其他标签和文本都在该标签内
  speekTagRoot: function (rule, value, callback) {
    if (!value || /^<speak(\s[^<>]+)?>.*<\/speak>$/.test(value)) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('请添加<speak>根标签，其他标签和文本都在该标签以内'))
      }
    }
  },
  // 标签必须成对出现
  allTagsClose: function (rule, value, callback) {
    const tagsArray = value.match(/<[^\<\>]*>/g)
    const tagsStack = []
    if (!tagsArray) return
    for (let i = 0; i< tagsArray.length; i++) {
      const tag = tagsArray[i].match(/[a-zA-Z\/]+/) && tagsArray[i].match(/[a-zA-Z\/]+/)[0]
      if (tag === 'break' || tag === '/break') continue
      if (tagsStack.length > 0 && ('/' + tagsStack[tagsStack.length - 1] === tag)) {
        tagsStack.pop()
      } else {
        tagsStack.push(tag)
      }
    }
    if (!tagsStack || tagsStack.length === 0) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error('SSML标签必须成对出现'))
      }
    }
  },
 
  // 标签必须全部支持
  valideXML: function (rule, xmlContent, callback) {
    if (!xmlContent) return

    let xmlDoc
    let errorMessage
    let errorCode = 0
    // code for IE
    if (window.ActiveXObject) {
        xmlDoc  = new ActiveXObject("Microsoft.XMLDOM")
        xmlDoc.async="false"
        xmlDoc.loadXML(xmlContent)

        if(xmlDoc.parseError.errorCode!=0) {
          errorMessage = xmlDoc.parseError.reason
          errorCode = 1
        }
    }
    // code for Mozilla, Firefox, Opera, chrome, safari,etc.
    else if (document.implementation.createDocument) {
        var parser=new DOMParser()
        xmlDoc = parser.parseFromString(xmlContent,"text/xml")
        var error = xmlDoc.getElementsByTagName("parsererror")
        if (error.length > 0) {
           if(xmlDoc.documentElement.nodeName=="parsererror") {
              errorCode = 1
              errorMessage = xmlDoc.documentElement.childNodes[0].nodeValue
          } else {
              errorCode = 1
              errorMessage = xmlDoc.getElementsByTagName("parsererror")[0].innerHTML
          }
        }
    }
    if (!errorCode) {
      callback()
    } else {
      if (rule.message) {
        callback(new Error(rule.message))
      } else {
        callback(new Error(errorMessage))
      }
    }
  },
  
  
  
  // 身份证验证
  validateIdCard: function (rule, value, callback) {
    if (value.length > 18) {
      callback(new Error('身份号码有误'))
    }
    if (!/\d{17}[\dxX]/.test(value)) {
      callback(new Error('身份号码有误'))
    }
    var modcmpl = function (m, i, n) { return (i + n - m % i) % i }
    var f = function (v, i) { return v * (Math.pow(2, i - 1) % 11) }
    var s = 0
    for (var i = 0; i < 17; i++) {
      s += f(+value.charAt(i), 18 - i)
    }
    var c0 = value.charAt(17)
    var c1 = modcmpl(s, 11, 1)
    if (c0 - c1 === 0 || (c0.toLowerCase() === 'x' && c1 === 10)) {
      callback()
    } else {
      callback(new Error('身份号码有误'))
    }
  }
}

// // 单个el-input验证
// Vue.directive('duiValidate', {
//   update: function (el, obj) {
//     let input
//     if (el.tagName === 'INPUT') {
//       input = el
//     } else {
//       input = el.getElementsByTagName('input') && el.getElementsByTagName('input')[0]
//       if (!input) input = el.getElementsByTagName('textarea') && el.getElementsByTagName('textarea')[0]
//     }
//     if (!obj.value || !input || document.activeElement !== input) return
//     for (let i = 0; i < obj.value.length; i++) {
//       const rule = obj.value[i]
//       let hasError = false
//       rule.validator(rule, input.value, function showMsg (error) {
//         if (error && (!input.nextSibling || input.nextSibling.className !== 'el-form-item__error')) {
//           const errEl = document.createElement('div')
//           errEl.className = 'el-form-item__error'
//           errEl.innerHTML = error && error.message
//           insertAfter(errEl, input)
//           input.className += ' el-form-item__input__error '
//         } else if (!error && input.nextSibling && input.nextSibling.className === 'el-form-item__error') {
//           removeElement(input.nextSibling)
//           input.className = input.className.replace(' el-form-item__input__error ', ' ')
//         }
//         if (error) hasError = true
//       })
//       if (hasError) break
//     }
//   }
// })

// 字符串反转
function reverseString (str) {
  return str.split('').reverse().join('')
}

function insertAfter (newEl, targetEl) {
  const parentEl = targetEl.parentNode

  if (!parentEl) return

  if (parentEl.lastChild === targetEl) {
    parentEl.appendChild(newEl)
  } else {
    parentEl.insertBefore(newEl, targetEl.nextSibling)
  }
}

function removeElement (el) {
  const parentEl = el.parentNode
  if (parentEl) {
    parentEl.removeChild(el)
  }
}

// el 传dom节点
function getElementsByClassName (el, className) {
  if (!el) return
  const classElements = []
  const allElements = el.getElementsByTagName('*')
  for (let i = 0; i < allElements.length; i++) {
    if (allElements[i].className === className) {
      classElements[classElements.length] = allElements[i]
    }
  }
  return classElements
}

VALIDATE.isValid = function (element) {
  const errEls = getElementsByClassName(element, 'el-form-item__error')
  const duiErrEls = getElementsByClassName(element, 'dui-error')
  return (!errEls || !errEls[0]) && (!duiErrEls || !duiErrEls[0])
}

VALIDATE.validate = function (value, rules, obj) {
  let hasError = false
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    hasError = false
    rule.validator(rule, value, function (error) {
      if (error) {
        obj.error = error.message
        hasError = true
      } else {
        obj.error = ''
      }
      if (error) hasError = true
    })
    if (hasError) break
  }
  return !hasError
}


VALIDATE.removeSpaceUnlessBetweenChar = function (str) {
  if (typeof str !== 'string') return str
  str = str.replace(/\s(?!\w)/g, '')
  str = reverseString(str)
  str = str.replace(/\s(?!\w)/g, '')
  str = reverseString(str)
  return str
}


export default VALIDATE
