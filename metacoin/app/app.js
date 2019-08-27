
const qs = (sel) => document.querySelector(sel)
async function init() {
  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  const artifact = await fetch('./../build/contracts/MetaCoin.json').then((res) => res.json())
  console.log(artifact)
  const deployedAddress = artifact.networks[1566865326729].address
  const instance = new web3.eth.Contract(artifact.abi, deployedAddress)
  console.log(instance)
  let accounts = await web3.eth.getAccounts()
  console.log(accounts)
  qs('#accounts').innerHTML = accounts.map((account) => `<div>${account}</div>`).join('')
  const alice = accounts[0]
  let ether = await instance.methods.getBalanceInEth(alice).call({from: alice, gas: 100000})
  console.log(ether)
  qs('#balance').innerHTML = `<div>${ether}</div>`
}
window.onload = init

