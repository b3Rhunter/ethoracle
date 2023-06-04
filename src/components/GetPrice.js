// GetPrice.js
import { useState } from 'react';
import { ethers } from 'ethers';

function GetPrice({ contract, connected }) {

  const [price, setPrice] = useState(null)
  
  const getPrice = async () => {
    try {
      const fee = "0.001"
      const getPrice = await contract.getPrice({value: ethers.utils.parseEther(fee)});  
      console.log(getPrice.value.toString())  
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='getPrice'>
      <button onClick={getPrice} disabled={!connected}>
        Get Price
      </button>
    </div>
  );
}

export default GetPrice;
