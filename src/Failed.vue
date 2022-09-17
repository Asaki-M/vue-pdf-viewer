<script setup lang="ts">
import PDFIcon from './pdf-icon.png'
interface FailedProps {
  msg: string
}

const { msg } = defineProps<FailedProps>()
</script>
<template>
  <div class="error-container">
    <img class="error-icon" :src="PDFIcon" />
    <p class="error-text">{{msg}}</p>
  </div>

</template>

<style lang="scss">
.error-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .error-icon {
    width: 50px;
    height: 50px;
  }

  .error-text {
    color: #FF1D1D;
    font-size: 12px;
    font-weight: 700;
  }
}
</style>
