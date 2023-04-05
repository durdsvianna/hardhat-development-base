// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Talkaway1155 is ERC1155 {
    
    using Counters for Counters.Counter;
    Counters.Counter public tokenIdCounter;

    struct Caminhada {
        address aluno;
        address tutor;
        string localizacao;
        string estado;
    }

    
    string[] IpfsUri = [
        "https://ipfs.io/ipfs/QmYaTsyxTDnrG4toc8721w62rL4ZBKXQTGj9c9Rpdrntou/seed.json",
        "https://ipfs.io/ipfs/QmYaTsyxTDnrG4toc8721w62rL4ZBKXQTGj9c9Rpdrntou/purple-sprout.json"
    ]; 
    
    address tutor;
    address aluno;
    string localizacao;
    Caminhada[] caminhadas;
    mapping(address => Caminhada) localizacoes;

    constructor() ERC1155("Talkaway Language - Caminhadas") {}

     function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
    {
        _mintBatch(to, ids, amounts, data);
    }

    function novaCaminhada(address _aluno, address _tutor, string memory _localizacao) public {        
        caminhadas.push(Caminhada(_aluno,_tutor, _localizacao, "checkin"));
        uint256 tokenId = tokenIdCounter.current();
        setURI(IpfsUri[0]);
        
        _mint(_aluno, tokenId, 1, abi.encodePacked(
                        '{"name": "Caminhada - Aluno",',
                        '"description": "This is your features",',
                        '"attributes": [',
                        '{',
                            '"trait_type": "estado",',
                            '"value": ', caminhadas[tokenId].estado,
                            '}]'
                        '}'
                    ));
        tokenId = tokenIdCounter.current();
        _mint(_tutor, tokenId, 1, abi.encodePacked(
                        '{"name": "Caminhada - Tutor",',
                        '"description": "This is your features",',
                        '"attributes": [',
                        '{',
                            '"trait_type": "estado",',
                            '"value": ', caminhadas[tokenId].estado,
                            '}]'
                        '}'
                    ));
    }

    function atualizaTokenCheckin() public {        
        setURI(string(
                    abi.encodePacked(
                        '{"name": "RunnerNFT - DUH",',
                        '"description": "This is your features",',
                        '"image": "https://ipfs.io/ipfs/QmRkq5EeKE5wKAuZNjaDFxtqpLQP3cFJVVWNu3sqy452uA/purple_seedling.jpg",'
                        '"attributes": [',
                        '{',
                            '"trait_type": "estado",',
                            '"value": ', "checkout",
                            '}]'
                        '}'
                    )
                ));        
    }


    function setURI(string memory newuri) public {
        _setURI(IpfsUri[1]);
    }

    function getTutor() public view returns (address) {
        return tutor;
    }
 
    function setTutor(address _tutor) private {
        tutor = _tutor;
    }

    function getAluno() public view returns (address) {
        return aluno;
    }
 
    function setAluno(address _aluno) private {
        aluno = _aluno;
    }

    function getLocalizaco() public view returns (string memory) {
        return localizacao;
    }
 
    function setLocalizaco(string memory _localizacao) private {
        localizacao = _localizacao;
    }
}