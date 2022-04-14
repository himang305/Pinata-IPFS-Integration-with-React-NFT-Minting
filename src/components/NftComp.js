import React, { Component } from 'react'
import axios from 'axios';

import './App.css'


class NftComp extends Component {
  constructor(props) {
    super(props)
     this.state = {
      file: '',
      myipfsHash: '',

    }
  }


// Pinata 

 async handleFile(fileToHandle) {

    console.log('starting')
    // initialize the form data
    const formData = new FormData()

    // append the file form data to 
    formData.append("file", fileToHandle)

    // call the keys from .env

    const API_KEY = process.env.REACT_APP_API_KEY
    const API_SECRET = process.env.REACT_APP_API_SECRET

    // the endpoint needed to upload the file
    const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`

    const response = await axios.post(
      url,
      formData,
      {
          maxContentLength: "Infinity",
          headers: {
              "Content-Type": `multipart/form-data;boundary=${formData._boundary}`, 
              'pinata_api_key': API_KEY,
              'pinata_secret_api_key': API_SECRET
          }
      }
  )
  console.log(response)
  // get the hash
  this.setState({myipfsHash: response.data.IpfsHash})
  }

  render() {

  

    return (
<div id="content" className="mt-3">

<div className="card mb-4" >

        <h2> Upload your NFT to IPFS (Pinata) </h2>
      
<div className="card-body">

        <form className="mb-3"  onSubmit={(event) => {
          event.preventDefault()
          this.handleFile(this.state.file)
        }}>

     <div className="input-group mb-4">
     <input placeholder="Select File" className="form-control form-control-lg" type="file" onChange={(event)=>this.setState({file:event.target.files[0]}) }/>
          
          
        </div>
       
<button type="submit" className="btn btn-primary btn-block btn-lg">Upload Your NFT</button>

    {
      this.state.myipfsHash.length > 0 && 
<img className="mystyle" 
height='100' src={`https://gateway.pinata.cloud/ipfs/${this.state.myipfsHash}`} alt='not loading'/>
    }
      
      </form>

          </div>

        </div>




<div className="card mb-4" >

        <h2> Mint Your Own NFT </h2>

<div className="card-body">

        <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let tokenuri
          tokenuri = event.target.uri.value.toString()
          alert(tokenuri);
          this.props.mintNFTs(tokenuri)
        }}>

      <div className="input-group mb-4">
          <input
            type="text"
            name="uri" readOnly
            value={"ipfs/" + this.state.myipfsHash}
            className="form-control form-control-lg"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              &nbsp;&nbsp;&nbsp; Token URI  
            </div>
          </div>
        </div> 

        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder={this.props.account}
            disabled />
          <div className="input-group-append">
            <div className="input-group-text">
              &nbsp;&nbsp;&nbsp; Your Address
            </div>
          </div>
        </div>
       

       <div className="input-group mb-4">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder= { window.web3.utils.fromWei(this.props.ethBalance,'ether')}
            disabled />
          <div className="input-group-append">
            <div className="input-group-text">
              &nbsp;&nbsp;&nbsp; Eth Balance
            </div>
          </div>
        </div>
       
      <button type="submit" className="btn btn-primary btn-block btn-lg">Mint NFT</button>
      
      </form>

          </div>

        </div>


<div className="card mb-4" >

        <h2> Verify NFT Ownership / TokenID </h2>
     
<div className="card-body">

        <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let addresss
          addresss = event.target.add.value.toString()
          alert(addresss);
          this.props.balanceOf(addresss)
        }}>

      <div className="input-group mb-4">
          <input
            type="text"
            name="add"
            onChange={(event) => {
              const addresss = this.input.value
            }}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              &nbsp;&nbsp;&nbsp;  Address
            </div>
          </div>
        </div> 


          <div className="input-group mb-4">
          <input
            type="text"
            className="form-control form-control-lg"
            value = {this.props.nftBalance}
            disabled />
          <div className="input-group-append">
            <div className="input-group-text">
              &nbsp;&nbsp;&nbsp; NFT Balance
            </div>
          </div>
        </div>
       
      <button type="submit" className="btn btn-primary btn-block btn-lg">Get Info</button>
      
      </form>

          </div>

        </div>


<div className="card mb-4" >

        <h2> Transfer NFT Ownership </h2>
     
<div className="card-body">

        <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let buyer
          buyer = event.target.buyer.value.toString()
           let ids
          ids = event.target.ids.value.toString()
          alert(buyer + ids)
          this.props.nftTransfer(buyer,ids)
        }}>

      <div className="input-group mb-4">
          <input
            type="text"
            name="buyer"
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              &nbsp;&nbsp;&nbsp; Buyer Address
            </div>
          </div>
        </div> 


          <div className="input-group mb-4">
          <input
            type="text"
            name="ids"
            className="form-control form-control-lg"
            placeholder = "2345"
            required />
          <div className="input-group-append">
            <div className="input-group-text">
              &nbsp;&nbsp;&nbsp; TokenID
            </div>
          </div>
        </div>
       
      <button type="submit" className="btn btn-primary btn-block btn-lg">Transfer Ownership</button>
      
      </form>

          </div>

        </div>


      </div>


    );
  }
}

export default NftComp;
