pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExerciceSolution is ERC20 {
    uint256 supply;
    string symbole;


    //constructor to mint
    constructor(string memory name, string memory symbol,uint256 initialSupply) public ERC20(name, symbol) 
	{
	   _mint(msg.sender, initialSupply);
       supply=initialSupply;
       symbole=symbol;
       approve(msg.sender,initialSupply);

	}
    function getSomeTokens(address receiver,uint freeTokens) public payable{
        _mint(receiver,freeTokens*(10**18));
    
    }
    function totalSupply() public view virtual override returns(uint256){
        return supply;

    }
     function symbol() public view virtual override returns(string memory){
        return symbole;

    }

}