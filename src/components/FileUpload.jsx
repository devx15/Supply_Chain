import React, { useRef, useState } from 'react';
import axios from "axios";
import "./FileUpload.css";
const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `69791cb90a4cc23a50b6`,
            pinata_secret_api_key: `9180ca7c075bd6e90733ad5b091733e0ba7ba164ce0e39ecf6013a1a65cf0e1b`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        //const signer = contract.connect(provider.getSigner());
        const signer = contract.connect(provider.getSigner());
        signer.add(account, ImgHash);
      } catch (e) {
        alert("Uploading image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  function  handleChange(event) {
    console.log(event.target.value)
  };
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);
  const OnhandleChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
      <label>Name of the product: </label>
        <input type="textarea" 
          name="textValue"
          onChange={handleChange}
        />
        
        <label>Enter Price : </label>
        <input type="textarea" 
          name="textValue"
          onChange={handleChange}
        />
        <label>Manufacturing Date : </label>
        <input
          type="date"
          onChange={OnhandleChange}
          ref={dateInputRef}
      />
        <label>Expiry Date : </label>
        <input
          type="date"
          onChange={OnhandleChange}
          ref={dateInputRef}
      />
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <button type="submit" className="upload" disabled={!file} onClick={handleSubmit}>
          Upload File
        </button> 
      </form>
    </div>
  );
};
export default FileUpload;

