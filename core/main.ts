import PDFViewerDefault from './PDFViewerDefault.vue';
import PDFViewer from './PDFViewer.vue'
import { App } from 'vue';

export {
  PDFViewerDefault,
  PDFViewer
}

export default {
  install(app: App) {
    app.component("PDFViewerDefault", PDFViewerDefault)
  }
}
