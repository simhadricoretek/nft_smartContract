// // import { useState } from "react";
// // import { ethers } from "ethers";
// // import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
// // import "./App.css";

// // const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;

// import "./App.css";
// import { useState } from "react";
// import { ethers } from "ethers";
// import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

// const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// function App() {

//   const [greeting, setGreetingValue] = useState();

//   async function requestAccount() {
//     await window.ethereum.request({ method: "eth_requestAccounts" });
//   }

//   async function fetchGreeting() {
//     if (typeof window.ethereum !== "undefined") {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const contract = new ethers.Contract(
//         greeterAddress,
//         Greeter.abi,
//         provider
//       );
//       try {
//         const data = await contract.greet();
//         console.log("data: ", data);
//       } catch (err) {
//         console.log("Error: ", err);
//       }
//     }
//   }

//   async function setGreeting() {
//     if (!greeting) return;
//     if (typeof window.ethereum !== "undefined") {
//       await requestAccount();
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
//       const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
//       const transaction = await contract.setGreeting(greeting);
//       await transaction.wait();
//       fetchGreeting();
//     }
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <button onClick={fetchGreeting}>Fetch Greeting</button>
//         <button onClick={setGreeting}>Set Greeting</button>
//         <input
//           onChange={(e) => setGreetingValue(e.target.value)}
//           placeholder="Set greeting"
//         />
//       </header>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import ERC20 from "./artifacts/@openzeppelin/contracts/token/ERC20/ERC20.sol/ERC20.json";

const greeterAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const tokenAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const ndTokenAddress = "0x0B306BF915C4d645ff596e518fAf3F9669b97016";

function App() {
  const [greeting, setGreetingValue] = useState();
  const [userAccount, setUserAccount] = useState();
  const [display, setDisplay] = useState("");
  const [amount, setAmount] = useState();

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();

        console.log("data: ", data);
        setDisplay(data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider);
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());
      setDisplay(`Balance of ${account} is ${balance.toString()}`);
    }
  }

  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      await transaction.wait();
      setDisplay("successfully setted your Greeting Message");
      fetchGreeting();
    }
  }

  async function sendCoins() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
      setDisplay(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }

  async function getName() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = new ethers.Contract(ndTokenAddress, ERC20.abi, provider);

      const name = await contract.name();
      console.log(name);
      setDisplay(name);
    }
  }

  async function getSymbol() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = new ethers.Contract(ndTokenAddress, ERC20.abi, provider);

      const symbol = await contract.symbol();
      console.log(symbol);
      setDisplay(symbol);
    }
  }

  async function getDecimals() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = new ethers.Contract(ndTokenAddress, ERC20.abi, provider);

      const decimals = await contract.decimals();
      console.log(decimals);
      setDisplay(decimals);
    }
  }

  async function getTotalSupply() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const contract = new ethers.Contract(ndTokenAddress, ERC20.abi, provider);

      const tsupply = await contract.totalSupply();
      console.log(tsupply.toString());
      setDisplay(tsupply.toString());
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="Set greeting"
        />

        <br />
        <button onClick={getBalance}>Get Balance</button>
        <button onClick={sendCoins}>Send Coins</button>
        <input
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder="Account ID"
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
        <p>{display}</p>
        <div className="cont-but">
          <button onClick={getName}>Get Name</button>
          <button onClick={getSymbol}>Get Symbol</button>
          <button onClick={getDecimals}>Get Decimals</button>
          <button onClick={getTotalSupply}>Get Total Supply</button>
        </div>
      </header>
    </div>
  );
}

export default App;

// Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// Greeter deployed to: 0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82
// Token deployed to: 0x9A676e781A523b5d0C0e43731313A708CB607508
// nd token deployed to 0x0B306BF915C4d645ff596e518fAf3F9669b97016
