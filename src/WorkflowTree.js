import React from 'react';
import './WorkflowTree.css'; // Import the CSS file

const WorkflowTree = ({ workflow, personData }) => {
  const isConditionMet = (condition) => {
    if (!condition) return true; // No condition means always true
    // Example condition check: condition could be something like 'gender === "Female"'
    const conditionLower = condition.toLowerCase();
    const personDataLower = {
      name: personData.name.toLowerCase(),
      gender: personData.gender.toLowerCase(),
      dob: personData.dob.toLowerCase(),
      pincode: personData.pincode.toLowerCase(),
    };

    try {
      // Evaluating the condition (use with caution, consider using safer alternatives in production)
      return eval(conditionLower.replace(/\b(gender|name|dob|pincode)\b/g, match => `personDataLower.${match}`));
    } catch {
      return false; // If the condition is invalid, treat it as false
    }
  };

  const renderNode = (step, index) => {
    const nodeColor = isConditionMet(step.condition) ? 'green' : 'gray';

    return (
      <div key={index} className="workflow-node" style={{ backgroundColor: nodeColor }}>
        <div className="workflow-node-content">
          <h3>{step.activity || 'No Activity'}</h3>
          <p>Condition: {step.condition || 'No Condition'}</p>
        </div>
        {step.nextActivity && step.nextActivity !== 'No More Activity' && (
          <div className="workflow-children">
            {/* Recursively render children if the next activity is available */}
            {workflow
              .filter(s => s.activity === step.nextActivity)
              .map((nextStep, i) => renderNode(nextStep, i))
            }
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="workflow-tree">
      <h1>Workflow Tree</h1>
      {workflow.length > 0 ? renderNode(workflow[0], 0) : <p>No workflow available</p>}
    </div>
  );
};

export default WorkflowTree;

