import React, {useState} from "react";
import HomeSideNav from "../components/HomeSideNav";

const Home = () => {
  const [walletDetails, setWalletDetails] = useState(false);
  const [showEyes, setShowEyes] = useState(false);


  return (
    <div className="relative">
      <div className="absolute h-screen justify-center items-center flex left-10 px-5">
        <HomeSideNav walletDetails={walletDetails} setWalletDetails={setWalletDetails} showEyes={showEyes} setShowEyes={setShowEyes}/>
      </div>
      
    </div>
  );
};

export default Home;
