// import logo from './logo.svg';
import './App.css';
import ItemManager from "./artifacts/contracts/ItemManager.sol/ItemManager.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from './components/FileUpload';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          ItemManager.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <div className="App">
      <Header />
      <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Footer />
    </div>
  );
}

export default App;
