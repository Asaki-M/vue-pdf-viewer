<script lang="ts" setup>
import * as pdfjs from 'pdfjs-dist'
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry'
import * as PDFViewerLib from 'pdfjs-dist/web/pdf_viewer'
import { onMounted, ref } from 'vue'
import Failed from './components/Failed.vue'

interface DefaultPDFProps {
  src: string | ArrayBuffer
  pageWidth?: string
  pageHeight?: string
}

const loadingFailed = ref(false)
const errorMsg = ref('')
const props = defineProps<DefaultPDFProps>()
const customSizeClass = {
  'pdf-custom-width': !!props.pageWidth,
  'pdf-custom-height': !!props.pageHeight
}
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

onMounted(async () => {
  const container = document.getElementById('pageContainer') as HTMLDivElement
  const eventBus = new PDFViewerLib.EventBus()
  const linkService = new PDFViewerLib.PDFLinkService()
  const l10n = new PDFViewerLib.GenericL10n('')
  const pdfViewer = new PDFViewerLib.PDFViewer({
    container,
    viewer: container,
    eventBus,
    linkService,
    l10n
  })
  const loadingTask = pdfjs.getDocument(props.src)
  try {
    const pdf = await loadingTask.promise
    pdfViewer.setDocument(pdf)
  } catch (error) {
    loadingFailed.value = true
    if (error instanceof Error) {
      errorMsg.value = error.message
      console.error(error.message)
    }
  }

})
</script>

<template>
  <div id="pageContainer" :class="customSizeClass" v-if="!loadingFailed"></div>
  <Failed v-else :msg="errorMsg"></Failed>
</template>

<style lang="scss">
#pageContainer {
  position: absolute;

  .page {
    margin: 0 auto;

    &>.textLayer {
      display: none;
    }
  }

  &.pdf-custom-width {
    .page {
      width: v-bind('props.pageWidth') !important;

      &>.canvasWrapper {
        width: v-bind('props.pageWidth') !important;

        &>canvas {
          width: v-bind('props.pageWidth') !important;
        }
      }
    }
  }

  &.pdf-custom-height {
    .page {
      height: v-bind('props.pageHeight') !important;

      &>.canvasWrapper {
        height: v-bind('props.pageHeight') !important;

        &>canvas {
          height: v-bind('props.pageHeight') !important;
        }
      }
    }
  }

}
</style>
