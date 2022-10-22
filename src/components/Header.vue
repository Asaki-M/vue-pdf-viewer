<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import NextPageIcon from '../assets/next.svg'
import PrevPageIcon from '../assets/prev.svg'

interface HeaderProps {
  total: number
  current: number
  backgroudColor?: string
  showErrorTip?: Function
}
// props deconstruct can keep responsive
const props = withDefaults(defineProps<HeaderProps>(), {
  backgroudColor: '#ccc'
})
const { total, current, showErrorTip } = toRefs(props)

const emits = defineEmits(['nextPage', 'prevPage', 'changePage'])

const pageInput = ref<string>(current.value + '')
watch(current, (newValue) => {
  pageInput.value = newValue + ''
})

const onNextPage = () => {
  if (current.value === total.value) {
    return
  }
  emits('nextPage')
}

const onPrevPage = () => {
  if (current.value === 1) {
    return
  }
  emits('prevPage')
}

const handlePageChange = (e: KeyboardEvent) => {
  const page = parseInt(pageInput.value) - 0
  if (page > 0 && page <= total.value) {
    emits('changePage', page)
  } else {
    emits('changePage', 1)
    const showTip = showErrorTip?.value
    if (!!showTip && typeof showTip === 'function') {
      showTip()
    } else {
      alert('Please input format page.')
    }
    pageInput.value = '1'
  }
}
</script>

<template>
  <div class="pdf-viewer-header">
    <img class="pdf-viewer-control-icon" :class="{'disabled': current === 1}" :src="PrevPageIcon" @click="onPrevPage" />
    <span class="pdf-viewer-text">
      <input class="pdf-viewer-page-input" type="text" v-model="pageInput" @keydown.enter="handlePageChange">
      <span>/</span>
      {{total}}
    </span>
    <img class="pdf-viewer-control-icon" :class="{'disabled': current === total}" :src="NextPageIcon"
      @click="onNextPage" />
  </div>
</template>

<style lang="scss">
.pdf-viewer-header {
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: v-bind('props.backgroudColor');

  img {
    width: 16px;
    height: 16px;
    cursor: pointer;

    &.disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  .pdf-viewer-text {
    color: #333;
    display: flex;
    align-items: center;
    font-size: 14px;
    margin: 0 10px;

    .pdf-viewer-page-input {
      width: 20px;
      padding: 5px;
      border: none;
      outline: none;
      border-radius: 5px;
      text-align: center;
    }

    >span {
      margin: 0 10px;
    }
  }
}
</style>
