import "./App.css";

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


  const fileSelected = async (e) => {
    const fileList = e.target.files
    if(fileList?.length > 0){
      const pdfArrayBuffer = await modifyFileAsync(fileList[0])
    }
    console.log("helloe biy");
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
