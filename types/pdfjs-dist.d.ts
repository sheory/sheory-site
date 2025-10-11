declare module "pdfjs-dist/build/pdf" {
  const pdfjsLib: any
  export default pdfjsLib
}

declare module "pdfjs-dist/legacy/build/pdf.worker.min.js?url" {
  const workerSrc: string
  export default workerSrc
}
