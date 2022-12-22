
import './App.css';
import axios, { Axios } from 'axios';
// import erc20Abi from './abi/erc20Abi.json';
import React , { useState } from 'react';
import { ethers } from 'ethers';
import Navbar from './components/Navbar';
import ShowInfo from './components/ShowInfo';
// import e from 'express';
// import { data } from 'autoprefixer';


function App() {
  const [Address , setAddress] = useState(null);
  const [infoContract , setInfoContract] = useState({
    address:"-",
    nameToken:"-",
    symbol:"-",
    totalSupply: "-"
  });
  
//Connect Metamask
  const connectWallet  = async ()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts" , []);
    const signer = provider.getSigner();
    signer.getAddress().then((result)=>{setAddress(result)});
  }

  //Disconnect Wallet , null Address
  const disconnectWallet = () =>{
    setAddress(null);
  }

  // Read Contract ERC20 info  with address
  const handelBtn = async (e)=>{
    e.preventDefault();

    const data = new FormData(e.target);
    let addr = data.get("addr");
    const apiKey = ''
    // goerli : https://api-goerli.etherscan.io/
    //main : https://api.etherscan.io/
    //poligone: https://api.polygonscan.com/
    //mumbai : https://api-testnet.polygonscan.com/
    const url = `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${addr}&apikey=${apiKey}`; 
    // infura mainnet goerli sepolia
    const infuraUrl = 'https://goerli.infura.io/v3/597b1fbb3d0a4079bd197a5b8ea1f045';
    const getAbi = async () => {
      const res = await axios.get(url);
      const abi = JSON.parse(res.data.result);
       console.log(abi , "aaaa");
      const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
      const contractErc20 = new ethers.Contract(data.get("addr"), abi , provider);

      const nameToken = await contractErc20.name();
      const symbol = await contractErc20.symbol();
      const totalSupply = await contractErc20.totalSupply();

      setInfoContract({
        address: data.get("addr"),
        nameToken,
        symbol,
        totalSupply
      })
      
    }

    getAbi();
    
    console.log(infoContract.nameToken);
  }
  
  //

  return (
    <>
    <Navbar Address={Address} connectWallet={connectWallet} disconnectWallet={disconnectWallet} setAddress={setAddress} />

    <ShowInfo infoContract={infoContract} handleBtn={handelBtn} setInfoContract={setInfoContract} />
    </>
  );
}


export default App;
