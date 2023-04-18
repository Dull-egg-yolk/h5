<template>
  <div class="rc-swipe-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'RcSwipeItem',
  mounted () {
    this.$parent && this.$parent.swipeItemCreated(this)
  },
  destroyed () {
    this.$parent && this.$parent.swipeItemDestroyed(this)
  }
}
</script>
