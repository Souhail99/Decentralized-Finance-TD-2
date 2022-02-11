pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./ExerciceSolution.sol";
import "./IUniswapV2Router02.sol";


contract Uniswap{
    
    IUniswapV2Router02 public uniRouter02;

    ExerciceSolution public auteur;
    address public auteuraddress;
    address tokenA;
    address tokenB;
    address factory;
    address WETH;
    address[] public addressArray;
    //bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
    uint _amountIn=500000000000000000;
    uint deadline=9999999999999999999999999999;

    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant wethAddress = 0xc778417E063141139Fce010982780140Aa0cD5Ab;

    constructor(IUniswapV2Router02 _factory, address _WETH) public payable {
        uniRouter02 = _factory;
        auteuraddress=0xDfb928438CDD50ce919242D650d07e7f2b219C94;
    }
    
    fallback () external payable 
	{}

	receive () external payable 
	{}

    function balanceOf() public view returns (uint256){
        return auteur.balanceOf(address(this));
    }

   function addLiquidity() external{
        uniRouter02.addLiquidityETH(auteuraddress, 1000*(10**18), 1, 1, address(this), 9999999999999999999999999999);
   }
	function withdrawLiquidity() external{
        
    }
	function swapYourTokenForDummyToken() external{
        
    }

    function swapYourTokenForEth() external {

        _amountIn=balanceOf();
        //IUniswapV2Pair(factory).transferFrom(msg.sender,address(this), _amountIn);
        //IUniswapV2Pair(factory).approve(address(this), _amountIn);
        
        uint amountOutMin= 0;
        /*if (tokenA == wethAddress || tokenB == wethAddress) {
        path = new address[](2);
        path[0] = tokenA;
        path[1] = tokenB;
        } else {
        path = new address[](3);
        path[0] = tokenA;
        path[1] = wethAddress;
        path[2] = tokenB;
        }*/
        addressArray.push(auteuraddress);
        addressArray.push(wethAddress);
        uniRouter02.swapExactTokensForETH(100*(10**18), amountOutMin, addressArray,address(this), deadline);
    }
  
}
