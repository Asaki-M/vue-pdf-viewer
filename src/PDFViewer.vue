<script lang="ts" setup>
import * as pdfjs from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry'
import { onMounted, ref } from 'vue'

interface DefaultPDFProps {
  src: string | ArrayBuffer
  width: string
  height: string
}

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc


const props = withDefaults(defineProps<DefaultPDFProps>(), {
  width: '100vw',
  height: '100vh'
})

const pageNum = ref<number>(1)

onMounted(async () => {
  const canvas = document.getElementById("pageContainer") as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  const loadingTask = pdfjs.getDocument(props.src)
  loadingTask.promise.then(pdf => {
    pdf.getPage(pageNum.value).then(page => {
      const viewport = page.getViewport({ scale: 1 })
      canvas.width = viewport.width
      canvas.height = viewport.height
      const renderTask = page.render({
        canvasContext: ctx,
        viewport: viewport
      })
      renderTask.promise.then(() => {
        console.log('render ok')
      })
    })
  })
})
</script>

<template>
  <canvas id="pageContainer"></canvas>
</template>
