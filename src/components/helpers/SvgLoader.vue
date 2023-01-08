<template lang="">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 18 18"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title
      :id="id"
      lang="en"
    >{{ iconName }} icon</title>
    <g :fill="color">
      <slot />
    </g>
  </svg>
</template>
<script>
export default {
    props: {
        height: {
            type: [Number, String],
            default: 0
        },
        width: {
            type: [Number, String],
            default: 0
        },
        iconName: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default: ''
        },
        color: {
           type: String,
           default: ''
        }
    }
    
}
</script>
<style lang="">
    
</style>