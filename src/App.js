// App.js
import { useState } from 'react';
import { ethers } from 'ethers';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ABI from './ABI.json';
import Stake from './components/Stake';
import Propose from './components/Propose';
import GetPrice from './components/GetPrice';
import Nav from './components/Nav';

const contractAddress = "0x4a8253056d0F19299AB8E3AbE32bE6a241007Dcf"

function App() {
  const [connected, setConnected] = useState(false);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState(null)
  const [stakedBalance, setStakedBalance] = useState(0);
  
  const connect = async () => {
    try {
      if (!connected) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const getContract = new ethers.Contract(contractAddress, ABI, signer);
        setContract(getContract)
        const getAddress = await signer.getAddress();
        setAddress(getAddress)
        const balance = await getContract.staked(getAddress);
        const balanceInEther = ethers.utils.formatEther(balance);
        setStakedBalance(balanceInEther)
        await signer.signMessage("Hello World");
        setConnected(true);
      } else {
        window.ethereum.selectedAddress = null;
        setConnected(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='app'>
      <button className='connect' onClick={connect}>
        {connected ? 'Disconnect' : 'Connect'}
      </button>
      {!connected && (
        <h1>Ethoracle</h1>
      )}
      {connected && (
        <div className='ui glass'>
          <div>{stakedBalance}</div>
          <Router>
            <Nav />
            <Routes>
              <Route path="/stake" element={<Stake contract={contract} setStakedBalance={setStakedBalance} connected={connected} />} />
              <Route path="/propose" element={<Propose contract={contract} connected={connected} />} />
              <Route path="/getprice" element={<GetPrice contract={contract} connected={connected} />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
