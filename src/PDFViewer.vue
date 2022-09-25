<script lang="ts" setup>
import * as pdfjs from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry'
import { onMounted, ref } from 'vue'

import Failed from './components/Failed.vue'
import PDFHeader from './components/Header.vue'

interface DefaultPDFProps {
  src: string | ArrayBuffer
  pageWidth?: number
  pageHeight?: number
  header?: boolean
}

interface PageRenderProps {
  num: number
}

const loadingFailed = ref(false)
const errorMsg = ref('')
const props = defineProps<DefaultPDFProps>()

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

const totalPage = ref<number>(0)
const pageNum = ref<number>(1)

const fetchPage = ({
  num
}: PageRenderProps) => {
  const canvas = document.getElementById("pageContainer") as HTMLCanvasElement
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  const loadingTask = pdfjs.getDocument(props.src)
  loadingTask.promise.then(pdf => {
    totalPage.value = pdf.numPages
    pdf.getPage(num).then(page => {
      const viewport = page.getViewport({ scale: 1.5 })
      canvas.width = props.pageWidth || viewport.width
      canvas.height = props.pageHeight || viewport.height
      page.render({
        canvasContext: ctx,
        viewport: viewport
      })
    })
  }).catch(error => {
    loadingFailed.value = true
    if (error instanceof Error) {
      errorMsg.value = error.message
      console.error(error.message)
    }
  })
}

onMounted(async () => {
  fetchPage({ num: pageNum.value })
})

const handleNextPage = () => {
  pageNum.value++
  fetchPage({ num: pageNum.value })
}
const handlePrevPage = () => {
  pageNum.value--
  fetchPage({ num: pageNum.value })
}
</script>

<template>
  <div v-if="!loadingFailed">
    <PDFHeader :total="totalPage" :current="pageNum" @nextPage="handleNextPage" @prevPage="handlePrevPage"></PDFHeader>
    <canvas id="pageContainer"></canvas>
  </div>
  <Failed v-else :msg="errorMsg"></Failed>
</template>
