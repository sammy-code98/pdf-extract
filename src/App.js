import "./App.css";
import { PDFDocument } from "pdf-lib";

function App() {
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

  const fileSelected = async (e) => {
    const fileList = e.target.files;
    if (fileList?.length > 0) {
      const pdfArrayBuffer = await modifyFileAsync(fileList[0]);
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
    </div>
  );
}

export default App;
