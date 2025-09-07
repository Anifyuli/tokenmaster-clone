import { MetaMaskInpageProvider } from "@metamask/providers";
import { useEffect, useState } from "react";
import { BrowserProvider, Contract, getAddress } from "ethers";
import TMConfig from "./config.json";
import TMAbi from "./abis/TokenMaster.json";
import Navigation from "./components/Navigation";
import "./App.css";
import type { Occasion } from "./types/Occasion";
import Card from "./components/Card";
import Sort from "./components/Sort";
import SeatChart from "./components/SeatChart";
import type { TokenMasterContract } from "./types/TokenMasterContract";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

function App() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [account, setAccount] = useState("");
  const [tokenMaster, setTokenMaster] = useState<TokenMasterContract>();
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [currentOccasion, setCurrentOccasion] = useState<Occasion | null>(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (!window.ethereum) return;

    const init = async () => {
      const newProvider = new BrowserProvider(window.ethereum);
      setProvider(newProvider);

      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];

      if (accounts?.length > 0) {
        setAccount(getAddress(accounts[0]));
      }

      // listen account changes
      window.ethereum.on("accountsChanged", () => {
        if (accounts.length > 0) {
          setAccount(getAddress(accounts[0]));
        } else {
          setAccount("");
        }
      });
    };

    init();
  }, []);

  useEffect(() => {
    if (!provider) return;

    const loadContract = async () => {
      const network = await provider.getNetwork();
      const chainId = String(network.chainId) as keyof typeof TMConfig;
      const address = TMConfig[chainId].TokenMaster.address;
      const signer = await provider.getSigner();
      const tokenmaster = new Contract(address, TMAbi, signer);

      setTokenMaster(tokenmaster as unknown as TokenMasterContract);

      console.log("Contract address:", await tokenmaster.getAddress());
    };

    loadContract();
  }, [provider]);

  useEffect(() => {
    if (!tokenMaster) return;

    const loadData = async () => {
      try {
        const totalOccasions = await tokenMaster.totalOccasions();
        const occasionsList: Occasion[] = [];

        for (let i = 1; i <= Number(totalOccasions); i++) {
          const occasion = await tokenMaster.getOccasion(i);
          occasionsList.push(occasion);
        }

        setOccasions(occasionsList);
      } catch (err) {
        console.error("Error calling totalOccasions:", err);
      }
    };

    loadData();
  }, [tokenMaster]);

  useEffect(() => {
    if (occasions.length > 0) {
      console.log("Occasions:", occasions);
    }
  }, [occasions]);

  return (
    <>
      <header>
        <Navigation account={account} setAccount={setAccount} />
        <h1 className="header__title">
          <strong>Event</strong>Tickets
        </h1>
      </header>

      <Sort />

      <div className="cards">
        {occasions.map((occ, index) => (
          <Card
            key={index}
            occasion={occ}
            toggle={toggle}
            setToggle={setToggle}
            setOccasion={setCurrentOccasion}
          />
        ))}
      </div>

      {toggle && tokenMaster && provider && currentOccasion && (
        <SeatChart
          occasion={currentOccasion}
          setToggle={setToggle} 
          tokenMaster={tokenMaster} 
          provider={provider}        
        />
      )}
    </>
  );
}

export default App;
