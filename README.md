<!-- README copied from https://raw.githubusercontent.com/othneildrew/Best-README-Template/master/README.md -->

<!-- PROJECT Header -->
<br />
<div align="center">
  <!-- PROJECT LOGO -->
  <!-- <a href="">
    <img src="" alt="Logo" width="419" height="128">
  </a> -->

  <h1 align="center">
	  Token Security Audit
  </h1>
  <p align="center">
	Runs security analysis on a token outputting whether the token is safe to buy or not.
  </p>
  <br />
  <a href="https://lucid.app/lucidchart/f3dc82d7-f3ab-4c91-9edb-26982da26ed2/edit?viewport_loc=14%2C-687%2C2219%2C1061%2C0_0&invitationId=inv_687e7557-94f1-4b49-9d4d-e9acef156e0c" target="_blank">Lucid Chart / App Flow</a>
  ·
  <a href="https://github.com/dc-devs/token-security-audit/issues" target="_blank">Report Bug</a>
  ·
  <a href="https://github.com/dc-devs/token-security-audit/issues" target="_blank">Request Feature</a>
</div>

<!-- TABLE OF CONTENTS -->
<br/>
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#useful-links">Useful Links</a></li>
  </ol>
</details>
<br/>

<!-- ABOUT THE PROJECT -->

## About The Project

Runs security analysis on a token outputting whether the token is safe to buy or not.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

-   [Yarn](https://yarnpkg.com/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Prettier](https://prettier.io/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

-  yarn: [Install Instructions](https://classic.yarnpkg.com/en/docs/install#mac-stable)

-   `.env.local` file:

    Create an [Infura](https://www.infura.io/) account, as well get an API key from [De.fi](de.fi), and add it to your .env.local in root of project.

    ```
    INFURA_PROJECT_ID = <Infura Project Id>
    INFURA_PROJECT_API_SECRET = <Infura API Secret>
    DEFI_API_KEY = <De.fi API Key>
    ```

### Installation

1.  Clone the repo
    ```sh
      git clone git@github.com:dc-devs/token-security-audit.git
    ```

    ```sh
      cd token-security-audit
    ```

2.  Install NPM packages
    ```sh
    yarn install
    ```
<!-- Usage -->

## Usage
Below are the the instructions for kicking off the app as a whole, as well as for runing each module in the app individually.

### App
Runs the below modules in succession and outputs a security audit for each new token pair added to a UniSwap liquidity pool.

```
yarn start
```

### Token Pair Tracker
Sets a listener for new token pair liquidity pools created on UniSwap, outputs some basic information about the token pair.

```
yarn tokenPairTracker
```

### Security Audit
Run full security audit. Fetches and merges security audit results from all available security audit companies added to app and outputs a final analysis for token address.

```
yarn securityAudit --address=<tokenAddress> --chainId=<chainId>
```

Example: For scam ERC-20 token $XBOX

```
yarn securityAudit --address='0x47e4392036b9f5d9db985c76cf9428be0790e9e6' --chainId='1'
```


#### Security Audit - GoPlus
Run security audit on just GoPlus. This will return the adapted security audit results from just this company's security audit.

```
yarn securityAudit:goPlus --address=<tokenAddress> --chainId=<chainId>
```

Example: For scam ERC-20 token $XBOX

```
yarn securityAudit:goPlus --address='0x47e4392036b9f5d9db985c76cf9428be0790e9e6' --chainId='1'
```

#### Security Audit - DeFi
Run security audit on just DeFi. This will return the adapted security audit results from just this company's security audit.

```
yarn securityAudit:deFi --address=<tokenAddress> --chainId=<chainId>
```

Example: For scam ERC-20 token $XBOX

```
yarn securityAudit:deFi --address='0x47e4392036b9f5d9db985c76cf9428be0790e9e6' --chainId='1'
```
