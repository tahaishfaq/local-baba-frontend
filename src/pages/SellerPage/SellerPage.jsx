import React, { useState } from "react";
import BecomeSeller from "../../components/BecomeSeller"; // Your step components
import SellerStep2 from "../../components/SellerStep2";
import Step3 from "../../components/Step3";
import Step4 from "../../components/Step4";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const SellerPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <div>
      <NavBar/>
      {currentStep === 1 && <BecomeSeller onNext={nextStep} />}
      {currentStep === 2 && <SellerStep2 onNext={nextStep} />}
      {currentStep === 3 && <Step3 onNext={nextStep} />}
      {currentStep === 4 && <Step4 />}
      <Footer/>
    </div>
  );
};

export default SellerPage;










































// import React from 'react'
// import NavBar from '../../components/NavBar'
// import BecomeSeller from '../../components/BecomeSeller'
// import Footer from '../../components/Footer'
// import SellerStep2 from '../../components/SellerStep2'
// import Step3 from '../../components/Step3'
// import Step4 from '../../components/Step4'
// import SellerPopover from '../../components/SellerPopover'

// const SellerPage = () => {
//   return (
//     <>
//     <NavBar/>
//     <BecomeSeller/>
//     {/* <SellerStep2/> */}
//     {/* <Step3/> */}
//     {/* <Step4/> */}
//     <Footer/>
//     </>
//   ) 
// }

// export default SellerPage