// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Open Zeppelin libraries for controlling upgradability and access.
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


// 制作一个可以升级的合约
contract ERC721MSHKUUPSToken is
    Initializable,
    ERC721Upgradeable,
    UUPSUpgradeable,
    OwnableUpgradeable
{
    uint256 public _tokenIdCounter;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() initializer {}

    // 可升级的合约应该有一个initialize方法来代替构造函数，并且initializer关键字确保合约只被初始化一次
    function initialize() public initializer {
        
        __ERC721_init("MSHK ERC721 UUPS Token", "MSHKUUPS");

        ///@dev as there is no constructor, we need to initialise the OwnableUpgradeable explicitly
        __Ownable_init();

        __UUPSUpgradeable_init();

        // 向合约创建者发送 1000 个有18位小数的代币
        _mint(msg.sender, 1000 * 10 ** 18);
    }

    // 需要此方法来防止未经授权的升级，因为在 UUPS 模式中，升级是从实现合约完成的，而在透明代理模式中，升级是通过代理合约完成的
    function _authorizeUpgrade(address) internal override onlyOwner {}

    // 计数+1
    function Increment() external  {
        unchecked {
            _tokenIdCounter += 1;
        }
    }

}
