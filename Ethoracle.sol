// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Arrays.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ETHPriceOracle is ReentrancyGuard {
    bool private locked = false;

    uint256 private price;
    uint256 public fee;
    uint256 public totalStaked;

    mapping(address => uint256) public payments;
    mapping(address => uint256) public staked;
    mapping(address => uint256) public rewards;

    uint256[] private proposedPrices;
    address[] public stakers;

    modifier onlyStaker() {
        require(
            staked[msg.sender] >= 1 ether,
            "Only users with at least 1 ETH staked can call this function"
        );
        _;
    }

    constructor() {
        fee = 0.001 ether;
    }

    function proposePrice(uint256 _price) public nonReentrant onlyStaker {
        proposedPrices.push(_price);
    }

    function updatePrice() public nonReentrant {
        require(!locked, "Price update is currently locked");
        locked = true;
        require(
            proposedPrices.length >= stakers.length / 2,
            "Not enough proposed prices"
        );
        uint256 medianPrice = getMedianPrice();
        for (uint256 i = 0; i < proposedPrices.length; i++) {
            if (
                proposedPrices[i] > medianPrice * 2 ||
                proposedPrices[i] < medianPrice / 2
            ) {
                // If the proposed price deviates too much from the median, slash the staker
                address staker = stakers[i];
                staked[staker] /= 2;
                totalStaked /= 2;
            }
        }
        proposedPrices = new uint256[](0);
        price = medianPrice;
        locked = false;
    }

    function getPrice() public payable nonReentrant returns (uint256) {
        require(price > 0, "Price not available");
        require(msg.value == fee, "Exact fee is required");
        payments[msg.sender] += msg.value;
        if (totalStaked > 0) {
            uint256 rewardPerStake = msg.value / totalStaked;
            for (uint256 i = 0; i < stakers.length; i++) {
                address staker = stakers[i];
                rewards[staker] += staked[staker] * rewardPerStake;
            }
        }

        return price;
    }

    function getMedianPrice() private view returns (uint256) {
        require(proposedPrices.length > 0, "No prices proposed");
        uint256[] memory sortedPrices = proposedPrices;
        quickSort(sortedPrices, int256(0), int256(sortedPrices.length - 1));
        uint256 median;
        if (sortedPrices.length % 2 == 0) {
            median =
                (sortedPrices[sortedPrices.length / 2] +
                    sortedPrices[sortedPrices.length / 2 - 1]) /
                2;
        } else {
            median = sortedPrices[sortedPrices.length / 2];
        }
        return median;
    }

    function quickSort(
        uint256[] memory arr,
        int256 left,
        int256 right
    ) internal pure {
        int256 i = left;
        int256 j = right;
        if (i == j) return;
        uint256 pivot = arr[uint256(left + (right - left) / 2)];
        while (i <= j) {
            while (arr[uint256(i)] < pivot) i++;
            while (pivot < arr[uint256(j)]) j--;
            if (i <= j) {
                (arr[uint256(i)], arr[uint256(j)]) = (
                    arr[uint256(j)],
                    arr[uint256(i)]
                );
                i++;
                j--;
            }
        }
        if (left < j) quickSort(arr, left, j);
        if (i < right) quickSort(arr, i, right);
    }

    function stake() public payable nonReentrant {
        require(msg.value > 0, "Must stake a positive amount");
        if (staked[msg.sender] == 0) {
            stakers.push(msg.sender);
        }
        staked[msg.sender] += msg.value;
        totalStaked += msg.value;
    }

    function withdraw(uint256 amount) public nonReentrant {
        require(
            amount <= staked[msg.sender],
            "Cannot withdraw more than staked amount"
        );
        staked[msg.sender] -= amount;
        totalStaked -= amount;
        if (staked[msg.sender] == 0) {
            for (uint256 i = 0; i < stakers.length; i++) {
                if (stakers[i] == msg.sender) {
                    stakers[i] = stakers[stakers.length - 1];
                    stakers.pop();
                    break;
                }
            }
        }
        payable(msg.sender).transfer(amount + rewards[msg.sender]);
        rewards[msg.sender] = 0;
    }
}
