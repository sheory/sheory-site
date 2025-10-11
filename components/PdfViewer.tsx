"use client"

import { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

// 🚀 SOLUÇÃO do GitHub issue #1855:
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

export default function PdfViewer({ fileUrl }: { fileUrl: string }) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      <p className="text-gray-400 mt-2">
        Página {pageNumber} de {numPages}
      </p>

      <div className="flex gap-2 mt-3">
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          ← Anterior
        </button>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Próxima →
        </button>
      </div>
    </div>
  )
}
