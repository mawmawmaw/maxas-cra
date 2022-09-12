// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MaxasFreeMintPass is
    ERC721,
    ERC721Enumerable,
    Pausable,
    Ownable,
    ERC721Burnable
{
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    string public baseURI;
    uint256 public maxSupply = 1000;
    uint256 public amountBurned = 0;

    //Evento para registrar cada minteo
    event MaxasFreeMintPassMinted(
        address indexed MaxasFreeMintPassBuyer,
        uint256 MaxasFreeMintPassAmount
    );
    //Evento para registrar cada burn
    event MaxasFreeMintPassBurned(
        address indexed MaxasFreeMintPassBurner,
        uint256 MaxasFreeMintPassID
    );
    //Evento para registrar cambios al contrato
    event configChanges(address indexed configChangedBy, string configChange);

    //Constructor del contrato
    constructor() ERC721("Maxas NFT Free Mint Pass", "MFMP") {
        setBaseURI("ipfs://QmVcVRP6KQdZHkTWeb3b6BpX7cw6RbrsiVZywSgDz4pVHo/");
        _tokenIdCounter.increment();
    }

    //Funcion que devuelve la base URI actual
    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    //Funcion para Mintear un token
    function mint() public payable {
        uint256 supply = totalSupply();
        //La venta no esta activa
        require(!paused(), "Minting is not active at the moment.");
        //No se puede tener mas de 1 en la wallet
        require(
            balanceOf(msg.sender) < 1,
            "You cant have more than 1 NFTs in your wallet."
        );
        //No se puede mintear si no quedan suficientes NFTs
        require(supply + 1 <= maxSupply, "There are not enough NFTs left.");
        //Se mintea el NFT
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(msg.sender, tokenId);
        _tokenIdCounter.increment();
        //Se emite el evento para registrar la venta en BD
        emit MaxasFreeMintPassMinted(msg.sender, 1);
    }

    //Funciones para quemar 1 pase
    function burn(uint256 tokenId) public virtual override {
        //solhint-disable-next-line max-line-length
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721Burnable: caller is not owner nor approved"
        );
        _burn(tokenId);
        //Se reduce el max supply
        setmaxSupply(maxSupply - 1);
        //Incrementamos el numero de passes burned
        amountBurned = amountBurned + 1;
        //Se emite el evento para registrar la venta en BD
        emit MaxasFreeMintPassBurned(msg.sender, tokenId);
    }

    //Funcion para quemar un grupo de pases
    function burnPasses(uint256[] memory ids) public {
        for (uint256 i = 0; i < ids.length; i++) {
            burn(ids[i]);
        }
    }

    //Funcion que retorna numero de tokens en wallet para web
    function balanceForWeb() public view returns (uint256) {
        return balanceOf(msg.sender);
    }

    //Funcion para Transferir varios pases
    function safeTransferBatch(uint256[] memory ids, address _to) public {
        for (uint256 i = 0; i < ids.length; i++) {
            safeTransferFrom(msg.sender, _to, ids[i]);
        }
    }

    //Funcion que devuelve los token ids que contiene un wallet
    function walletOfOwner(address _address)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_address);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for (uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_address, i);
        }
        return tokenIds;
    }

    //Funcion que devuelve el URI de un token
    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(abi.encodePacked(currentBaseURI))
                : "";
    }

    //Funcion para definir el supply maximo
    function setmaxSupply(uint256 _newmaxSupply) public onlyOwner {
        maxSupply = _newmaxSupply;
        //Se emite el evento para el cambio
        emit configChanges(msg.sender, "Max Supply changed");
    }

    //Funcion para cambiar la URI base del asset asociado al token
    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
        //Se emite el evento para el cambio
        emit configChanges(msg.sender, "URI Changed");
    }

    //Funcion para pausar todas las transacciones del contrato
    function pause() public onlyOwner {
        _pause();
        //Se emite el evento para el cambio
        emit configChanges(msg.sender, "Minting Paused");
    }

    //Funcion para resumir todas las transacciones del contrato
    function unpause() public onlyOwner {
        _unpause();
        //Se emite el evento para el cambio
        emit configChanges(msg.sender, "Minting Resumed");
    }

    //Funcion para retirar fondos del contrato
    function withdraw() public payable onlyOwner {
        // This will payout the contract balance to the contract owner.
        // =============================================================================
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
        // =============================================================================
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
