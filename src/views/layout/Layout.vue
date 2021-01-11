<template>
  <router-view :key="key" />
</template>
<script>

export default {
  name: "Layout",
  computed: {
    key() {
      return this.$route.path
    }
  }
};
</script>
