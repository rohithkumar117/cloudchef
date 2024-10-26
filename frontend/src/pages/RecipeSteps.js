import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const RecipeSteps = ({ steps }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="recipe-steps">
            <h3>Step {steps[currentStep].number}</h3>
            <p>{steps[currentStep].instruction}</p>
            {steps[currentStep].timer && <p>Timer: {steps[currentStep].timer} minutes</p>}
            {steps[currentStep].image && <img src={steps[currentStep].image} alt={`Step ${steps[currentStep].number}`} />}
            <div className="navigation">
                <button onClick={handlePrevious} disabled={currentStep === 0}>Previous</button>
                <button onClick={handleNext} disabled={currentStep === steps.length - 1}>Next</button>
            </div>
        </div>
    );
};

export default RecipeSteps;
