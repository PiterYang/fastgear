# date_season_range

### 使用：

```
##### npm 安装

npm i date-season-range
```

```

import VueComponent from 'date-season-range'
const seasonSelect = VueComponent.SeasonRange

<season-select v-model="value2" inputStyle="width: 300px;" style="width:300px" />

<script>
  export default {
    data(){
      return{
          value2: [new Date(), new Date()]
      }
    },
    components: {
        seasonSelect
    },
  }
</script>

v-model绑定的值：和 element-ui 中的 el-date-picker 一致

inputStyle：用来设置组件中显示选中季度的 input 样式

style： 则是设置组件最外层元素样式
```

### 注意事项

1 需要在 elementUi 下使用，是对 elementUi 的扩展

2 style 和 inputStyle 的宽度需要设置一致
