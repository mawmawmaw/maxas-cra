import { useState } from 'react';
import { useMoralis } from 'react-moralis';
import './Mint.css';
const Mint = () => {
    const [minted, setMinted] = useState(false);
    const [minting, setMinting] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const {authenticate, isAuthenticated, isAuthenticating, user, logout, isWeb3Enabled} = useMoralis();

    const login = async () => {
        if (!isAuthenticated) {
          await authenticate({signingMessage: "Connect to Maxas.xyz" })
            .then(function (user) {
                console.log("logged in user:", user);
                console.log(user?.get("ethAddress"));
            })
            .catch(function (error) {
                setErrorMsg(error);
                setError(true);
            });
        }
    }

    const preMintNFT = (e) => {
        e.preventDefault();
        if(isWeb3Enabled){
            setMinting(true);
            console.log("Mint");
            setTimeout(()=>setMinted(true),5000);
        }
    }

    const renderConnectWallet = () => {
        if(error){
            return (
                <div className='connect-wallet error'>    
                    <p>{errorMsg}</p>
                </div>
            )
        }
        return (
            <div className='connect-wallet'>    
                <p>To be able to mint, please connect your wallet.</p>
                <button className='button' onClick={login} disabled={Boolean(isAuthenticating)}>{isAuthenticating ? 'Connecting...' : 'Connect Wallet'}</button>
            </div>
        )
    }
    const renderMintingBox = () => {
        if(minted){
            return (
                <div className='minting-box success'>    
                    <p>You minted 1 NFT</p>
                    <div className='post-mint-options'>
                        <button className='button'>Check Transaction</button>
                        <button className='button'>View NFT</button>
                    </div>
                </div>
            )
        }
        if(error){
            return (
                <div className='minting-box error'>    
                    <p>{errorMsg}</p>
                </div>
            )
        }
        return (
            <div className='minting-box'>    
                <p>You will be able to mint 1 NFT to your wallet:</p>
                <span className='wallet-address'>{user?.get("ethAddress")}</span>
                <form className='mint' onSubmit={e=>preMintNFT(e)}>
                    <button type='submit' className='button' disabled={Boolean(minting)}>{minting ? 'Minting...' : 'Mint'}</button><br/>
                    <button className='button-disconnect' onClick={logout}>Disconnect Wallet</button>
                </form>
            </div>
        )
    }
    return (
        <div id="mint" className='section'>
            <div className='container'>
                <h2 className='section-title'>Pre-Mint</h2>
                {isAuthenticated || renderConnectWallet()}
                {isAuthenticated && renderMintingBox()}
            </div>
        </div>
    )
}
export default Mint;