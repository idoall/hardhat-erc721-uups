const {
    ethers,
    upgrades
  } = require("hardhat");
  

  async function main() {
    const ERC721MSHKUUPSToken = await ethers.getContractFactory("ERC721MSHKUUPSToken");
  
    console.log("Deploying ERC721MSHKUUPSToken...");
  
    const m = await upgrades.deployProxy(ERC721MSHKUUPSToken, {
      initializer: "initialize",  // 设置一个不同的初始化函数来调用
    });
    await m.deployed();
  
    console.log("ERC721MSHKUUPSToken deployed to:", m.address);
  }
  
  
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });