import "./App.css";
import Home from "./components/pages/Home";
import Header from "../src/components/shared/Header/Header";
import Footer from "../src/components/shared/Footer/Footer";
import Web3 from "web3";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from '@ethersproject/providers'


// const getLibrary = (provider) => {
//   return new Web3(provider);
// };

const getLibrary = (provider) => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div className="App">
        <Header />
        <Home />
        <Footer />
      </div>
    </Web3ReactProvider>
  );
};

export default App;
