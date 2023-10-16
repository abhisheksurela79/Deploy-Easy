import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DjangoForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ubuntuUsername: "",
    projectName: "",
    projectApp: "",
    directory: "",
    serverIP: "",
    portNumber: "",
    url: "",
  });

  const handleUbuntuUsernameChange = (event) => {
    const value = event.target.value;

    setFormData({
      ...formData,
      ubuntuUsername: value
    });
  };

  const handleProjectNameChange = (event) => {
    const value = event.target.value;

    setFormData({
      ...formData,
      projectName: value,
    });
  };

  const handleProjectAppChange = (event) => {
    const value = event.target.value;

    setFormData({
      ...formData,
      projectApp: value,
      "serviceFile": (value.toLocaleLowerCase()).replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  };

  const handleDirectoryChange = (event) => {
    const value = event.target.value;

    setFormData({
      ...formData,
      directory: value.startsWith('/') ? value : `/${value}`
    });
  };

  const handleServerIPChange = (event) => {
    const value = event.target.value;

    setFormData({
      ...formData,
      serverIP: value,
    });
  };

  const handlePortNumberChange = (event) => {
    const value = event.target.value;

    setFormData({
      ...formData,
      portNumber: value,
    });
  };

  const handleUrlChange = (event) => {
    const value = event.target.value;

    setFormData({
      ...formData,
      url: value,
    });
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    
    navigate("/deploy-django-docs", {state: {formData}})
  }


  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h2 className="mt-5 mb-4">Deploy Your Django Project</h2>
      <form className="mt-5 mb-5 w-50 d-flex flex-column" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="ubuntu-username" className="form-label">
            Ubuntu Username
          </label>
          <input type="text" className="form-control" id="ubuntu-username" onChange={handleUbuntuUsernameChange} required={true}/>
        </div>
        <div className="mb-3">
          <label htmlFor="project-name" className="form-label">
            Project Name
          </label>
          <input type="text" className="form-control" id="project-name" onChange={handleProjectNameChange} required={true}/>
        </div>
        <div className="mb-3">
          <label htmlFor="project-app" className="form-label">
            Project App
          </label>
          <input type="text" className="form-control" id="project-app" onChange={handleProjectAppChange} required={true}/>
        </div>
        <div className="mb-3">
          <label htmlFor="directory" className="form-label">
            Directory
          </label>
          <input type="text" className="form-control" id="directory" onChange={handleDirectoryChange} required={true}/>
        </div>
        <div className="mb-3">
          <label htmlFor="server-ip" className="form-label">
            Server IP
          </label>
          <input type="text" className="form-control" id="server-ip" onChange={handleServerIPChange} required={true}/>
        </div>
        <div className="mb-3">
          <label htmlFor="port-number" className="form-label">
            Port Number
          </label>
          <input type="text" className="form-control" id="port-number" onChange={handlePortNumberChange} required={true}/>
        </div>
        <div className="mb-3">
          <label htmlFor="url" className="form-label">
            URL
          </label>
          <input type="text" className="form-control" id="url" onChange={handleUrlChange} required={true}/>
        </div>
        <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default DjangoForm;
