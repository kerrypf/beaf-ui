<template>
  <div class="icon-container">
    <div class="content demo">
      <p class="content-title">使用方法</p>
      <div class="use-demo">
        <div class="case">
          <icon name="beaf-close" size="30px" color="#f56c6c"></icon>
          <icon name="beaf-delete" size="30px"></icon>
          <icon name="beaf-success" size="30px"></icon>
          <icon name="beaf-settings" size="30px"></icon>
        </div>
        <div class="code">
          <div class="highlight">
            <codemirror ref="myCm"
                :value="code">
            </codemirror>
          </div>
        </div>
      </div>
    </div>
    <div class="content options">
      <p class="content-title">Attributes</p>
      <AiTable :data="tableData"></AiTable>
      <!-- <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="prop"
          label="参数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="des"
          label="说明">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="80">
        </el-table-column>
        <el-table-column
          prop="options"
          label="可选值">
        </el-table-column>
        <el-table-column
          prop="default"
          label="默认值">
        </el-table-column>
      </el-table> -->
    </div>
    <div class="content icons">
      <p class="content-title">图表集合</p>
      <ul class="icon_lists dib-box">
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-phone"></use>
            </svg>
            <div class="name ellipsis">phone-square</div>
            <div class="code-name ellipsis">beaf-phone</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-wechat"></use>
            </svg>
            <div class="name ellipsis">wechat</div>
            <div class="code-name ellipsis">beaf-wechat</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-qq"></use>
            </svg>
            <div class="name ellipsis">QQ</div>
            <div class="code-name ellipsis">beaf-qq</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-linkedin"></use>
            </svg>
            <div class="name ellipsis">linkedin0</div>
            <div class="code-name ellipsis">beaf-linkedin</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-github"></use>
            </svg>
            <div class="name ellipsis">github</div>
            <div class="code-name ellipsis">beaf-github</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-email"></use>
            </svg>
            <div class="name ellipsis">email</div>
            <div class="code-name ellipsis">beaf-email</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-add1"></use>
            </svg>
            <div class="name ellipsis">add-fill</div>
            <div class="code-name ellipsis">beaf-add1</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-apps"></use>
            </svg>
            <div class="name ellipsis">apps-fill</div>
            <div class="code-name ellipsis">beaf-apps</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-add"></use>
            </svg>
            <div class="name ellipsis">add-circle-fill</div>
            <div class="code-name ellipsis">beaf-add</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-down"></use>
            </svg>
            <div class="name ellipsis">arrow-down-s-line</div>
            <div class="code-name ellipsis">beaf-arrow-down</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-drop-down"></use>
            </svg>
            <div class="name ellipsis">arrow-drop-down-line</div>
            <div class="code-name ellipsis">beaf-arrow-drop-down</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-drop-left1"></use>
            </svg>
            <div class="name ellipsis">arrow-drop-left-fill</div>
            <div class="code-name ellipsis">beaf-arrow-drop-left1</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-drop-right1"></use>
            </svg>
            <div class="name ellipsis">arrow-drop-right-fill</div>
            <div class="code-name ellipsis">beaf-arrow-drop-right1</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-down1"></use>
            </svg>
            <div class="name ellipsis">arrow-down-line</div>
            <div class="code-name ellipsis">beaf-arrow-down1</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-drop-down1"></use>
            </svg>
            <div class="name ellipsis">arrow-drop-down-fill</div>
            <div class="code-name ellipsis">beaf-arrow-drop-down1</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-drop-right"></use>
            </svg>
            <div class="name ellipsis">arrow-drop-right-line</div>
            <div class="code-name ellipsis">beaf-arrow-drop-right</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-drop-left"></use>
            </svg>
            <div class="name ellipsis">arrow-drop-left-line</div>
            <div class="code-name ellipsis">beaf-arrow-drop-left</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-drop-up1"></use>
            </svg>
            <div class="name ellipsis">arrow-drop-up-fill</div>
            <div class="code-name ellipsis">beaf-arrow-drop-up1</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-drop-up"></use>
            </svg>
            <div class="name ellipsis">arrow-drop-up-line</div>
            <div class="code-name ellipsis">beaf-arrow-drop-up</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-left"></use>
            </svg>
            <div class="name ellipsis">arrow-left-s-line</div>
            <div class="code-name ellipsis">beaf-arrow-left</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-left1"></use>
            </svg>
            <div class="name ellipsis">arrow-left-line</div>
            <div class="code-name ellipsis">beaf-arrow-left1</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-right1"></use>
            </svg>
            <div class="name ellipsis">arrow-right-line</div>
            <div class="code-name ellipsis">beaf-arrow-right1</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-right"></use>
            </svg>
            <div class="name ellipsis">arrow-right-s-line</div>
            <div class="code-name ellipsis">beaf-arrow-right</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-up1"></use>
            </svg>
            <div class="name ellipsis">arrow-up-line</div>
            <div class="code-name ellipsis">beaf-arrow-up1</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-arrow-up"></use>
            </svg>
            <div class="name ellipsis">arrow-up-s-line</div>
            <div class="code-name ellipsis">beaf-arrow-up</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-check"></use>
            </svg>
            <div class="name ellipsis">check-fill</div>
            <div class="code-name ellipsis">beaf-check</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-success"></use>
            </svg>
            <div class="name ellipsis">checkbox-circle-fill</div>
            <div class="code-name ellipsis">beaf-success</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-error"></use>
            </svg>
            <div class="name ellipsis">close-circle-fill</div>
            <div class="code-name ellipsis">beaf-error</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-close"></use>
            </svg>
            <div class="name ellipsis">close-line</div>
            <div class="code-name ellipsis">beaf-close</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-dashboard1"></use>
            </svg>
            <div class="name ellipsis">dashboard-line</div>
            <div class="code-name ellipsis">beaf-dashboard1</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-dashboard"></use>
            </svg>
            <div class="name ellipsis">dashboard-fill</div>
            <div class="code-name ellipsis">beaf-dashboard</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-delete"></use>
            </svg>
            <div class="name ellipsis">delete-bin-fill</div>
            <div class="code-name ellipsis">beaf-delete</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-download"></use>
            </svg>
            <div class="name ellipsis">download-line</div>
            <div class="code-name ellipsis">beaf-download</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-warning"></use>
            </svg>
            <div class="name ellipsis">error-warning-fill</div>
            <div class="code-name ellipsis">beaf-warning</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-info"></use>
            </svg>
            <div class="name ellipsis">information-fill</div>
            <div class="code-name ellipsis">beaf-info</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-list-settings1"></use>
            </svg>
            <div class="name ellipsis">list-settings-line</div>
            <div class="code-name ellipsis">beaf-list-settings1</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-list-settings"></use>
            </svg>
            <div class="name ellipsis">list-settings-fill</div>
            <div class="code-name ellipsis">beaf-list-settings</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-question-fill"></use>
            </svg>
            <div class="name ellipsis">question-fill</div>
            <div class="code-name ellipsis">beaf-question-fill</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-settings"></use>
            </svg>
            <div class="name ellipsis">settings-3-fill</div>
            <div class="code-name ellipsis">beaf-settings</div>
        </li>
      
        <li class="dib">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#beaf-upload"></use>
            </svg>
            <div class="name ellipsis">upload-line</div>
            <div class="code-name ellipsis">beaf-upload</div>
        </li>
      
      </ul>
    </div>
  </div>
</template>
<script>
import {basic} from './code.js'
export default {
  data(){
    return {
      code:basic,
      cmOptions: {
          // codemirror options
          tabSize: 4,
          mode: 'text/x-vue',
          theme: 'base16-dark',
          lineNumbers: true,
          line: true,
      },
      tableData: [{
        prop: 'css',
        des: '默认Symbol方式引用。css为true时，更改为font-class方式引用',
        type: 'Boolean',
        options: 'true|false',
        default: 'false'
      },{
        prop: 'name',
        des: '图标fontclass名称',
        type: 'String',
        options: '-',
        default: '-'
      },{
        prop: 'color',
        des: '更改单色图标颜色',
        type: 'String',
        options: '-',
        default: '-'
      },{
        prop: 'bgColor',
        des: '图标背景颜色',
        type: 'String',
        options: '-',
        default: 'transparent'
      },{
        prop: 'size',
        des: '图标字体大小，单位px',
        type: 'String',
        options: '-',
        default: '14px'
      }]
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.icon-container{
  .content{
    .use-demo{
      .case{
        >span{
          margin: 0 10px;
        }
      }

    }
  }
}
.icon_lists.dib-box{
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    margin-left: -10px;
    margin-right: 10px;
    .dib{
        width:132px;
        padding: 15px 0;
        color: #666;
        &:hover{
            background-color: rgba(33, 32, 36, 0.06);
        }
        svg{
            width: 40px;
            height: 95px;
        }
        .name{
            font-weight: 400;
            color: rgba(33, 32, 36, 0.86);
        }
        .code-name{
            font-size:12px;
        }
    }
}
</style>
