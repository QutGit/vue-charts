<template v-slot = "slotContent">
  <div class="wck-tab text-s">{{label}}</div>
</template>
<script>

export default {
  name: 'Tab',
  props: {
    label: {
      default: 'Tab切换',
      type: String,
      required: true,
    }
  },
  data: function(){
    return{
      
    }
  },
  mounted() {
    
  },
  computed: {
    
  },
}
</script>
<style lang="scss" scoped>
    .wck-tab{
      float: left;
      padding: 24px 40px;
      color: #4A4A4A;
      position: relative;

      &::after{
        content: ' ';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px; 
        height: 10px;
        background: #ccc;
      }
      
    }
</style>