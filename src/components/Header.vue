<script lang="ts" setup>
import NextPageIcon from '../assets/next.svg'
import PrevPageIcon from '../assets/prev.svg'
import ScaleBigPageIcon from '../assets/scale-big.svg'
import ScaleSmallPageIcon from '../assets/scale-small.svg'

interface HeaderProps {
  total: number
  current: number
}

const { total, current } = defineProps<HeaderProps>()
const emits = defineEmits(['nextPage', 'prevPage'])

const onNextPage = () => {
  emits('nextPage')
}

const onPrevPage = () => {
  emits('prevPage')
}

const onScaleBigPage = () => {

}

const onScaleSmallPage = () => {

}
</script>

<template>
  <div class="pdf-viewer-header">
    <img :src="PrevPageIcon" @click="onPrevPage" />
    <span>{{current}} / {{total}}</span>
    <img :src="NextPageIcon" @click="onNextPage" />
    <img :src="ScaleBigPageIcon" />
    <img :src="ScaleSmallPageIcon" />
  </div>
</template>

<style lang="scss">
.pdf-viewer-header {
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  background-color: #ccc;

  img {
    width: 24px;
    height: 24px;
  }
}
</style>
