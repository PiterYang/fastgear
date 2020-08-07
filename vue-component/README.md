# date-season-range

## use step
```
first: npm install date-season-range
```

### require in you project
```
second: import DateSeasonRange from 'date-season-range'
```

### use as a global componnet
```
Vue.use(DateSeasonRange)
```

### use in anywhere of your project
```
<season-range v-model="value2" inputStyle="width: 300px;" style="width:300px" />

<script>
  export default {
    data(){
      return{
          value2: [new Date(), new Date()]
      }
    }
  }
</script>

v-model绑定的值：和 element-ui 中的 el-date-picker 一致
```
