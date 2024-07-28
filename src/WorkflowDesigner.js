import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkflowDesigner.css'; // Import the CSS file

const activities = ['Pincode', 'DOB', 'Gender'];
const specialActivities = ['Add More Activity', 'No More Activity'];

const WorkflowDesigner = () => {
  const [steps, setSteps] = useState([{ activity: '', condition: '', nextActivity: '' }]);
  const [isFormValid, setIsFormValid] = useState(false); // To track form validity
  const navigate = useNavigate();

  const getAvailableActivities = () => {
    return activities;
  };

  const getNextActivityOptions = (index) => {
    if (index === steps.length - 1) {
      return specialActivities;
    }
    return activities.filter(activity => activity !== steps[index].activity);
  };

  const handleActivityChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index].activity = value;
    setSteps(newSteps);
    validateForm();
  };

  const handleConditionChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index].condition = value;
    setSteps(newSteps);
    validateForm();
  };

  const handleNextActivityChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index].nextActivity = value;
    setSteps(newSteps);
    validateForm();

    if (value === 'Add More Activity') {
      addStep(); // Automatically add a new step when "Add More Activity" is selected
    } else if (value === 'No More Activity') {
      validateForm(); // Ensure all fields are filled before allowing navigation
    }
  };

  const addStep = () => {
    const newSteps = [...steps, { activity: '', condition: '', nextActivity: '' }];
    setSteps(newSteps);
  };

  const removeStep = (index) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
    validateForm(); // Revalidate form after removing a step
  };

  const validateForm = () => {
    // Check if all steps have activity, condition, and nextActivity
    const allStepsValid = steps.every(step => 
      step.activity && step.condition && step.nextActivity
    );

    // Ensure that the last step must have 'No More Activity'
    const lastStep = steps[steps.length - 1];
    setIsFormValid(allStepsValid && lastStep.nextActivity === 'No More Activity');
  };

  const saveWorkflow = () => {
    if (!isFormValid) {
      alert('Please ensure all fields are filled and the last step is set to "No More Activity" before saving.');
      return;
    }

    console.log('Workflow saved:', steps);
    navigate('/person-input'); // Navigate to the PersonInputPage
  };

  return (
    <div className="workflow-designer">
      <h1>Workflow for Loan Approval</h1>
      {steps.map((step, index) => (
        <div key={index} className="workflow-step">
          <select
            value={step.activity}
            onChange={(e) => handleActivityChange(index, e.target.value)}
          >
            <option value="">Select Activity</option>
            {getAvailableActivities().map((activity, i) => (
              <option key={i} value={activity}>{activity}</option>
            ))}
          </select>
          <input
            type="text"
            value={step.condition}
            onChange={(e) => handleConditionChange(index, e.target.value)}
            placeholder="Condition"
          />
          <select
            value={step.nextActivity}
            onChange={(e) => handleNextActivityChange(index, e.target.value)}
          >
            <option value="">Select Next Step</option>
            {getNextActivityOptions(index).map((activity, i) => (
              <option key={i} value={activity}>{activity}</option>
            ))}
          </select>
          {index > 0 && (
            <button className="remove-button" onClick={() => removeStep(index)}>Remove</button>
          )}
        </div>
      ))}
      <button
        className="save-workflow-button"
        onClick={saveWorkflow}
        disabled={!isFormValid} // Disable if form is not valid
      >
        Save Workflow
      </button>
    </div>
  );
};

export default WorkflowDesigner;
