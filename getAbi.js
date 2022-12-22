const axios = require('axios');
const { ethers } = require('ethers');

const address = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599';
const apiKey = '';
const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${apiKey}`;
const infuraUrl = 'https://mainnet.infura.io/v3/597b1fbb3d0a4079bd197a5b8ea1f045';

const getAbi = async () => {
  const res = await axios.get(url);
  const abi = JSON.parse(res.data.result);
//   console.log(abi);

  const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
  const contract = new ethers.Contract(
    address,
    abi,
    provider
  )

  const name = await contract.name();
  const totalSupply = await contract.totalSupply();

  console.log(name);
  console.log(totalSupply.toString());
}
getAbi();