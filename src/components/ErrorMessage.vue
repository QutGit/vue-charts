<template>
  <div class="error-message">{{message}}</div>
</template>

<script>

export default {
  props: {
    message: {
      type: String,
      default: "default"
    }
  }
};
</script>

<style scoped lang="scss">
.error-message {
  display: inline-block;
  width: 300px;
  height: 30px;
  background-color: #ff9393;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  line-height: 30px;
  border-radius: 2px;
  margin: 32px auto;
}
</style>