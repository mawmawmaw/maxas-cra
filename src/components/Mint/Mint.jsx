import { useState, useEffect } from "react";
import { useMoralis } from 'react-moralis';
import './Mint.css';
import abi from './abi.json';
import heroGif from '../../assets/hero.gif';
const Mint = () => {
    
    const minterContractAddress = "0xbdda1Fe95B0E43Ca80Fae4EF03268373e0e3779A";
    const contractChainId = "0x5";
    const [hasMinted, setHasMinted] = useState(false);
    const [chainId, setChainId] = useState('');
    const [minting, setMinting] = useState(false);
    const [minted, setMinted] = useState(false);
    const [txHash, setTxHash] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const {authenticate, isAuthenticated, isAuthenticating, user, logout, Moralis, enableWeb3, isWeb3Enabled} = useMoralis();

    useEffect(()=>{
        if(!isWeb3Enabled){
            enableWeb3();
        }else{
            setChainId(Moralis.getChainId());
            userHasMinted();
        }
    // eslint-disable-next-line
    },[enableWeb3,isWeb3Enabled,chainId])

    const login = async () => {
        if (!isAuthenticated) {
          await authenticate({signingMessage: "Connect to Maxas.xyz" })
            .then(function (user) {
                console.log("logged in user:", user);
                console.log(user?.get("ethAddress"));
            })
            .catch(function (err) {
                setErrorMsg(err);
                setError(true);
            });
        }
    }

    const userHasMinted = async () => {
        const options1 = {
            contractAddress: minterContractAddress,
            functionName: 'balanceForWeb',
            abi
        };
        Moralis.executeFunction(options1).then((response) =>{
            response._hex.toString() === "0x00"  ? setHasMinted(false) : setHasMinted(true);
        })
    }

    const preMintNFT = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setError(false);
        if(isWeb3Enabled){
            try{
                setMinting(true);
                if(!hasMinted){
                    const options2 = {
                        contractAddress: minterContractAddress,
                        functionName: "mint",
                        abi: abi
                    };
                    //send the transaction
                    const tx = await Moralis.executeFunction(options2);
                    await tx.wait().then((res)=>{
                        console.log(res);
                        setTxHash(res);
                        setMinting(false);
                        setMinted(true);
                    });   
                }else{
                    setMinted(false);
                    setErrorMsg("You already have 1 Maxas Free Mint Pass NFT in your wallet");
                    setError(true);
                }
            }catch(error){
                setMinted(false);
                if(error.code === 4001){
                    setErrorMsg("User rejected the transaction.");
                }else{
                    if(error.toString().split('"message":"')[1].split('","')[0] !== ''){
                        setErrorMsg(error.toString().split('"message":"')[1].split('","')[0]);
                    }else{
                        setErrorMsg(error.code)
                    }
                }
                setError(true);
            }
        }else{
            await enableWeb3();
            preMintNFT();
            return;
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
                    <h5>You successfully minted 1 Maxas NFT</h5>
                    <p>Your transaction hash is:</p>
                    <span className="transaction-hash">{txHash.transactionHash}</span>
                    <div className='post-mint-options'>
                        <a href={`https://goerli.etherscan.io/tx/${txHash.transactionHash}`} className='button' target="_blank" rel="noreferrer">Check Transaction</a>
                        <a href={`https://testnets.opensea.io/account?tab=collected`} className='button' target="_blank" rel="noreferrer">View NFT</a>
                    </div><br/>
                    <button className='button-disconnect' onClick={logout}>Disconnect Wallet</button>
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
                    <button type='submit' className='button' disabled={Boolean(minting|| chainId!==contractChainId)}>{minting ? 'Minting...' : 'Mint'}</button>
                    {minting || <button className='button-disconnect' onClick={logout}>Disconnect Wallet</button>}
                </form>
            </div>
        )
    }
    return (
        <div id="mint" className='section'>
            <div className='container'>
                <div className="content grid">
                    <img src={heroGif} className="main-img" alt="Maxas"/>
                    <div>
                        <h2 className='section-title'>Pre-Mint</h2>
                        {isAuthenticated || renderConnectWallet()}
                        {isAuthenticated && renderMintingBox()}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Mint;