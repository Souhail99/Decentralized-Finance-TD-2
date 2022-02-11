const Str = require('@supercharge/strings')
// const BigNumber = require('bignumber.js');

var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20 = artifacts.require("DummyToken.sol"); 
var evaluator = artifacts.require("Evaluator.sol");
var Solution = artifacts.require("ExerciceSolution.sol");
var Uniswap=artifacts.require("Uniswap.sol");

const account = "0x7bb1AEb48F28c51E7f83506861AC7af33cD92F35"
const dummytokenadress = "0xbc3b69d1abD5A39f55a9Ba50C7a2aDd933952123"

module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        await deployTDToken(deployer, network, accounts); 
        await deployEvaluator(deployer, network, accounts); 
        //await setPermissionsAndRandomValues(deployer, network, accounts); 
        //await deployRecap(deployer, network, accounts); 
		await deployExerciceSolution(deployer, network, accounts);
		await makeExercise(deployer, network, accounts);
    });
};

async function deployTDToken(deployer, network, accounts) {
	TDToken = await TDErc20.new("TD-AMM-101","TD-AMM-101",web3.utils.toBN("20000000000000000000000000000"))
	dummyToken = await ERC20.new("dummyToken", "DTK", web3.utils.toBN("2000000000000000000000000000000"))
	uniswapV2FactoryAddress = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f"
	wethAddress = "0xc778417e063141139fce010982780140aa0cd5ab"
}

async function deployEvaluator(deployer, network, accounts) {
	//Evaluator = await evaluator.new(TDToken.address, dummyToken.address, uniswapV2FactoryAddress, wethAddress)
	Evaluator = await evaluator.at("0x89a2Faa44066e94CE6B6D82927b0bbbb8709eEd7")

}

async function setPermissionsAndRandomValues(deployer, network, accounts) {
	await TDToken.setTeacher(Evaluator.address, true)
	randomSupplies = []
	randomTickers = []
	for (i = 0; i < 20; i++)
		{
		randomSupplies.push(Math.floor(Math.random()*1000000000))
		randomTickers.push(Str.random(5))
		// randomTickers.push(web3.utils.utf8ToBytes(Str.random(5)))
		// randomTickers.push(Str.random(5))
		}

	console.log(randomTickers)
	console.log(randomSupplies)
	// console.log(web3.utils)
	// console.log(type(Str.random(5)0)
	await Evaluator.setRandomTickersAndSupply(randomSupplies, randomTickers);
}

async function deployRecap(deployer, network, accounts) {
	console.log("TDToken " + TDToken.address)
	console.log("dummyToken " + dummyToken.address)
	console.log("Evaluator " + Evaluator.address)
}

async function deployExerciceSolution(deployer, network, accounts) {

	
	//SolutionToken = await Solution.new("zyGkq","zyGkq",web3.utils.toBN("965485991000000000000000000"))
	SolutionToken = await Solution.at("0xDfb928438CDD50ce919242D650d07e7f2b219C94")
	uni=await Uniswap.new("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D","0x15EE27e40aa1166c1e41a3AFA6D62938ada526B2")
	//uni=await Uniswap.at("0x3b9C6431dbC57f7Ee5ac65361d85b4ab25498c5e")
	//uni=await Uniswap.at("0x31CA975d5a0E00dcc12829d59dBF2F9Cb9EDb94C")
}

async function makeExercise(deployer, network, accounts) {


	
	console.log("SolutionToken " + SolutionToken.address)
	console.log("Uni " + uni.address)
	// Submit Exercise
	console.log("====== Submit Exercise ======")
	//await Evaluator.submitExercice(SolutionToken.address,{from:account})
	await Evaluator.submitExercice(uni.address,{from:account})
	//const submit_balance = await TDToken.balanceOf(account)
	//console.log("submit_balance " + submit_balance)


	console.log("====== Exercice 6 ======")
	//await Evaluator.ex6a_getTickerAndSupply({from:account})
	//const ticker=await Evaluator.readTicker() 
	//await Evaluator.submitErc20(SolutionToken.address,{from:account})
	//const submit_balance2 = await TDToken.balanceOf(account)
	//console.log("submit_balance " + submit_balance2)

	//await Evaluator.ex6b_testErc20TickerAndSupply({from:account})
	//const submit_balance3 = await TDToken.balanceOf(account)
	//console.log("submit_balance " + submit_balance3)
	console.log("====== Exercice 7 ======")
	await Evaluator.ex7_tokenIsTradableOnUniswap({from:account})
	await SolutionToken.getSomeTokens(uni.address,1000000)
	await uni.addLiquidity()
	await Evaluator.ex8_contractCanSwapVsEth({from:account})
	
	
}
