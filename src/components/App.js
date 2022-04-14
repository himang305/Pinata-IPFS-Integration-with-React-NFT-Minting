import React, { Component } from 'react'
import Web3 from 'web3'
import MyNFT from '../abis/MyNFT.json'
import NftComp from './NftComp'


import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {

    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ethBalance })

    // Load Token
    const networkId =  await web3.eth.net.getId()
    const myNFTData = MyNFT.networks[networkId]

    console.log('1');
    if(myNFTData) {
    const nft = new web3.eth.Contract(MyNFT.abi, myNFTData.address)
      this.setState({ nft })
       console.log('4')
     // this.mintNFTs("ipfs://QmZsGNgpGhnz6R12z3KnUUaBDgXHSipKSVBzrGSJ7s4kRU" )    

      // let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      // this.setState({ tokenBalance: tokenBalance.toString() })
    } else {
      window.alert('Token contract not deployed to detected network.')
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  transferTokens = (tokenAmount, receiver ) => {
    // alert(tokenAmount);
    // alert(receiver);
    this.state.token.methods.transfer(tokenAmount, receiver).
    send({ from: this.state.account }).on('transactionHash', (hash) => {
      alert(1);    })
  }

  constructor(props) {
   super(props)          // super() is used to call the parent constructor
                          // super(props) would pass props to the parent constructor
    this.state = {
      account: '',
      nft: {},
      ethBalance: '0',
      nftBalance: '0',
      hash: '',
     
    }
    }

nftTransfer = (buyer,ids) => {  
    if(this.state.nft){ 
    this.state.nft.methods.safeTransferFrom(this.state.account , buyer ,ids).
    send({ from: this.state.account }).on('transactionHash', (hash) => {
    alert('Transaction Hash : ' + hash)   })
  }
  }  


  mintNFTs = (tokenURI) => {   
    if(this.state.nft.methods.mintNFT()){ 
       const self = this;
    this.state.nft.methods.mintNFT(this.state.account , tokenURI).
    send({ from: this.state.account }).on('transactionHash', (hash) => {
    alert('Transaction Hash : ' + hash) 
    self.setState({ hash: hash })
      alert(123);
        self.state.nft.getPastEvents(
          'allEvents',
          {
            fromBlock: 0, toBlock: 'latest'
          },(err, events) => { console.log(events) }
          )
        window.web3.eth.getBlockNumber().then(console.log);
        window.web3.eth.getBlock('latest').
            then((block) => {console.log(block) })
      })
     }
  }  

  balanceOf = (account) => {  
    if(this.state.nft){ 
      const self = this;
    this.state.nft.methods.balanceOf(account).call().then(function(number) { 
     self.setState({ nftBalance: number.toString() })
})
  } }


  render() {

        let  content1 = <NftComp
        ethBalance={this.state.ethBalance}
        account={this.state.account}
        nftBalance={this.state.nftBalance}
        mintNFTs={this.mintNFTs}
        balanceOf={this.balanceOf}
        nftTransfer={this.nftTransfer}
      
      />

    return (
      <div>

        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '700px' }}>
              <div className="content mr-auto ml-auto">
               
                {content1}

               </div>
             </main>
          </div>
        </div>
      
      </div>
    );
  }
}

export default App;
