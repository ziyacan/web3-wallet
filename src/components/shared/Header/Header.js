import React, { useEffect } from "react";
import { Spinner } from "../Spinner/Spinner";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../wallet/connectors";
import style from "./Header.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const { active, account, activate, deactivate, loading, library } =
    useWeb3React();

  const parseAddress = (_address) => {
    return _address.slice(0, 4) + "..." + _address.slice(-4);
  };

  const connect = () => {
    try {
      activate(injected);
      localStorage.setItem("isWalletConnected", true);
    } catch (e) {
      console.log(e);
    }
  };

  const disconnect = () => {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
      toast.warning("Wallet Disconnected");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  useEffect(() => {
    if (account) {
      toast.success("Wallet Connected");
    }
  }, [account]);

  return (
    <>
      <div className={style.header}>
        <p className={style.header__heading} to="/">
          Wallet Dapp
        </p>

        <div>
          {active ? (
            <p className={style.address}>{parseAddress(account)}</p>
          ) : (
            <button className={style.connectButton} onClick={() => connect()}>
              {loading ? <Spinner /> : "Connect Wallet"}
            </button>
          )}

          <button
            onClick={disconnect}
            style={{
              display: active ? "block" : "none",
              width: "100%",
              cursor: "pointer",
            }}
          >
            Disconnect
          </button>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        closeOnClick
        autoClose={1500}
      />
    </>
  );
};

export default Header;
