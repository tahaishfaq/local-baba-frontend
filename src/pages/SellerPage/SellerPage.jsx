import React from "react";
import BecomeSeller from "../../components/BecomeSeller";
import SellerStep2 from "../../components/SellerStep2";
import Step3 from "../../components/Step3";
import Step4 from "../../components/Step4";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useSeller } from "../../context/SellerContext";


const SellerPage = () => {
  const { currentStep, nextStep } = useSeller();

  return (
    
      <div className="font-figtree">
        <NavBar />
        {currentStep === 1 && <BecomeSeller onNext={nextStep} />}
        {currentStep === 2 && <SellerStep2 onNext={nextStep} />}
        {currentStep === 3 && <Step3 onNext={nextStep} />}
        {currentStep === 4 && <Step4 />}
        <Footer />
      </div>
    
  );
};

export default SellerPage;
