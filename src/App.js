// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import WorkflowDesigner from "./WorkflowDesigner";
import PersonInputPage from "./PersonInputPage";
import WorkflowTree from "./WorkflowTree";

function App() {
  const [workflow, setWorkflow] = useState([]);
  const [userData, setUserData] = useState({});

  // Wrapper to handle navigation and pass handlers as props
  const NavigateWrapper = ({ children, onWorkflowSave, onUserDataSubmit }) => {
    const navigate = useNavigate();

    return React.cloneElement(children, {
      onWorkflowSave: (data) => {
        setWorkflow(data);
        navigate("/person-input");
      },
      onUserDataSubmit: (data) => {
        setUserData(data);
        navigate("/workflow-tree");
      },
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <NavigateWrapper>
              <WorkflowDesigner />
            </NavigateWrapper>
          }
        />
        <Route
          path="/person-input"
          element={
            <NavigateWrapper>
              <PersonInputPage />
            </NavigateWrapper>
          }
        />
        <Route
          path="/workflow-tree"
          element={<WorkflowTree workflow={workflow} personData={userData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
