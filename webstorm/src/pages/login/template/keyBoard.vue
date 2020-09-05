<template>
  <div class="index-login-template-key-board container">
    <div class="item">
      <span @click="handleClick(1)">1</span>
      <span @click="handleClick(2)">2</span>
      <span @click="handleClick(3)">3</span>
    </div>
    <div class="item">
      <span @click="handleClick(4)">4</span>
      <span @click="handleClick(5)">5</span>
      <span @click="handleClick(6)">6</span>
    </div>
    <div class="item">
      <span @click="handleClick(7)">7</span>
      <span @click="handleClick(8)">8</span>
      <span @click="handleClick(9)">9</span>
    </div>
    <div class="item">
      <span></span>
      <span @click="handleClick(0)">0</span>
      <span @click="deleteClick">x</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick (num) {
      this.$emit('handleClick', num)
    },
    deleteClick () {
      this.$emit('deleteClick')
    }
  }
}
</script>

<style lang="less">
  @import '../less/variable.less';
  @import '../../../less/function.less';
  .index-login-template-key-board {
    .item {
      display: flex;
      border-top: 1px solid @keyBoardBoder;
      span {
        flex: 1;
        text-align: center;
        height: @keyBoardItemHeight;
        line-height: @keyBoardItemHeight;
        &:nth-child(2) {
          border-left: 1px solid @keyBoardBoder;
        }
        &:nth-child(3) {
          border-left: 1px solid @keyBoardBoder;
        }
      }

      &:last-child {
        border-bottom: 1px solid @keyBoardBoder;
      }
    }
  }
</style>
