# Ethoracle: A Decentralized, Trustless Price Oracle for Ethereum

## Introduction

In the Ethereum ecosystem, reliable, trustworthy, and secure data is of paramount importance. One of the most important pieces of data is the price of ETH itself. Obtaining this data in a decentralized and secure manner is challenging due to the inherent limitations of blockchain technology. To address this, we are introducing Ethoracle, a decentralized, trustless oracle that securely and reliably provides the price of ETH.

Ethoracle leverages the power of Ethereum to create a trustless oracle that is resistant to manipulation and provides highly reliable data to all participants in the Ethereum ecosystem. Its unique design promotes decentralization, while also incentivizing honest behavior from all participants.

## Purpose

The purpose of Ethoracle is to provide developers and users with a reliable and secure source of the ETH price, without relying on centralized sources which can be prone to manipulation or single points of failure. Ethoracle also addresses the ever growing concern over the 1 price oracle being used in 90% of DeFi applications today.

Ethoracle is designed to be user-friendly and easy for developers to integrate into their applications, making it an ideal solution for any service that requires access to the ETH price. The ultimate aim is to provide oracle diversity in the Ethereum ecosystem, thus contributing to the overall growth and success of the Ethereum network.

## Mechanism and Design

Ethoracle works by allowing stakers to propose the current price of ETH. In order to propose a price, a staker must have at least 1 ETH (subject to change) staked in the contract. This staking mechanism ensures that the staker has a vested interest in the accurate functioning of the oracle. Once a price is proposed, it goes into a pool of proposed prices. When the number of proposed prices is at least half the number of stakers, the oracle

takes the median of the proposed prices and sets it as the new price of ETH. This median-taking mechanism ensures that even if some stakers propose wildly inaccurate prices, the median price will still be accurate as long as the majority of stakers are honest.

To incentivize honesty and penalize dishonest behavior, Ethoracle implements a slashing mechanism. If a staker's proposed price deviates too much from the median, their stake is slashed by half. This ensures that stakers are motivated to propose accurate prices, as dishonest or reckless behavior can result in a significant financial loss. A small fee, denominated in ETH, is charged to any user or protocol that calls upon Ethoracle for pricing data and that fee is evenly distributed among stakers.

## Security

Ethoracle has been designed with security at its core. The staking and slashing mechanisms  help to secure the system by making it expensive for an attacker to manipulate the oracle. To significantly influence the price, an attacker would need to stake a large amount of ETH, and even then, they risk having their stake slashed if their proposed price deviates too much from the median.

 ## Conclusion

Ethoracle is a robust, secure, and decentralized solution for obtaining the ETH price in a trustless manner. It is designed to be easy to use for developers by cutting out unnecessary tokens and relying on the network's native asset instead.

Ethoracle represents a significant step forward in the development of decentralized oracles. It demonstrates that it is possible to obtain reliable and secure data in a decentralized and trustless manner, paving the way for the development of even more sophisticated decentralized applications.

Join us in this journey to provide reliable, secure, and decentralized data to the Ethereum ecosystem. By leveraging the power of the most pristine asset on the planet, we can create a more secure, transparent, and equitable financial system.


