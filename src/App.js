import "./App.css";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";

function App() {
  const [pdfFileData, setPdfFileData] = useState();

  // helper function to modify Filereader callbacks into async/await
  function modifyFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  // generate number of pages you want to extract

  function pdfRange(start, end) {
    let length = end - start + 1;

    // Here we add -1 at the end. Do you know the reason? Yes – in programming,
    // indexes start from 0, not 1. So we have to deduct -1
    // from every page number to get the behaviour we want.
    return Array.from({ length }, (_, i) => start + i - 1);
  }

  // extract pages

  async function extractPdfPage(arrayBuff) {
    const pdfSrcDoc = await PDFDocument.load(arrayBuff);
    const pdfNewDoc = await PDFDocument.create();
    const pages = await pdfNewDoc.copyPages(pdfSrcDoc, pdfRange(2, 3));
    pages.forEach((page) => pdfNewDoc.addPage(page));
    const newPdf = await pdfNewDoc.save();
    return newPdf;
  }

  // convert Uint8Array of the modified pdf to blod for rendering in browser
  function renderPdf(Uint8Array) {
    const tempblob = new Blob([
      Uint8Array,
      {
        type: "application/pdf",
      },
    ]);

    const docUrl = URL.createObjectURL(tempblob);
    setPdfFileData(docUrl);
  }

  // Execute when user select a file
  const fileSelected = async (e) => {
    const fileList = e.target.files;
    if (fileList?.length > 0) {
      const pdfArrayBuffer = await modifyFileAsync(fileList[0]);
      const newPdfDoc = await extractPdfPage(pdfArrayBuffer);
      renderPdf(newPdfDoc);
    }
    console.log(fileList);
  };
  return (
    <div className="App">
      <div>
        <input
          type="file"
          id="file-picker"
          accept=".pdf"
          onChange={fileSelected}
        />
      </div>

      <div>
        <iframe
          style={{ display: "block", width: "100vw", height: "90vh" }}
          title="PdfFrame"
          src={pdfFileData}
          frameBorder="0"
          type="application/pdf"
        ></iframe>
      </div>
    </div>
  );
}

export default App;
