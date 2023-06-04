// Propose.js
import { useState } from 'react';
import { ethers } from 'ethers';

function Propose({ contract, connected }) {
  const [proposePriceInput, setProposePriceInput] = useState("");

  const proposePrice = async () => {
    try {
      const tx = await contract.proposePrice(ethers.utils.parseEther(proposePriceInput));
      await tx.wait();
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='propose'>
      <input 
        type="text" 
        placeholder="Propose price" 
        id="proposePriceInput"
        value={proposePriceInput} 
        onChange={e => setProposePriceInput(e.target.value)}  
      />
      <button onClick={proposePrice} disabled={!connected}>
        Propose Price
      </button>
    </div>
  );
}

export default Propose;
