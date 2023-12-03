import { Wallet } from './wallet/wallet.class';

// LEFT OFF..
// 1. Best way to find wallets to follow?
// 2. Find best wallets to track
// - top PNL over last year?
// 3. How does the 7M wallet and all of its other wallets connect?
// - It currernly sends money to a walllet, and that wallet buys the token. So cant just follow direct..

const whaleAddress1 = '0x20d74dfd6f5df400be4df00703097bea450bfe0a'; // .5M
const whaleAddress2 = '0x50be13b54f3eebbe415d20250598d81280e56772'; // 7M
const whaleAddress1Sub2 = '0x1889ba28961dabb511491b4c1e564deafa61ce04'; // 8k

const dchristianEthAddress = '0x4B7F04f7960db235CFB333721F9eE51a5929AB35';

const whaleWallet = new Wallet({ address: whaleAddress1 });
const dchristianWallet = new Wallet({ address: dchristianEthAddress });
