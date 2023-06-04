// Stake.js
import { useState } from 'react';
import { ethers } from 'ethers';

function Stake({ contract, connected, setStakedBalance, address }) {
  const [stakeInput, setStakeInput] = useState("");
  const [withdrawInput, setWithdrawInput] = useState("");

  const stake = async () => {
    try {
      const tx = await contract.stake({ value: ethers.utils.parseEther(stakeInput) });
      await tx.wait();
      const balance = await contract.staked(address);
      const balanceInEther = ethers.utils.formatEther(balance);
      setStakedBalance(balanceInEther)
    } catch(error) {
      console.log(error)
    }
  }

  const withdraw = async () => {
    try {
      const tx = await contract.withdraw(ethers.utils.parseEther(withdrawInput));
      await tx.wait();      
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='stake'>
      <input
        type="text"
        placeholder="Enter amount"
        id="stakeInput"
        value={stakeInput}
        onChange={e => setStakeInput(e.target.value)} />
      <button onClick={stake} disabled={!connected}>
        Stake
      </button>
      <input
          type="text"
          placeholder="Withdraw amount"
          id="withdrawInput"
          value={withdrawInput}
          onChange={e => setWithdrawInput(e.target.value)} />
        <button onClick={withdraw} disabled={!connected}>
          Withdraw
        </button>
    </div>

  );
}

export default Stake;
