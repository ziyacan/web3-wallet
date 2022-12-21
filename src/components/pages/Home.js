import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const { active, account, activate, deactivate, library } = useWeb3React();
  const [balance, setBalance] = useState("");

  useEffect(() => {
    library?.getBalance(account).then((result) => {
      setBalance(result / 1e18);
    });
  });

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      {active && (
        <div
        className="balance"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          Balance: {balance}
        </div>
      )}
    </div>
  );
};

export default Home;
