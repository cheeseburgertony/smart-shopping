<template>
  <div class="count-box">
    <button @click="handleSub" class="sub">-</button>
    <input :value="value" @change="handleChange" class="inp" type="text">
    <button @click="handleAdd" class="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) return
      this.$emit('input', this.value - 1)
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
    },
    handleChange (e) {
      // 判断,如果输入的不合法则回退到原来的值
      const num = +e.target.value
      if (isNaN(num) || num < 0) {
        e.target.value = this.value
        return
      }
      // 合法则正常提交修改
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box{
  width: 110px;
  display: flex;
  .sub,.add{
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp{
    margin: 0 5px;
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
