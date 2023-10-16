import React from "react";
import { useLocation } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

function DeployReactJsDocs() {

  const location = useLocation();
  const formData = location.state && location.state.formData;
  const data = {
    directory: formData === null? "/path/to/your/project/directory" : formData.directory,
    portNumber: formData === null? "80" : formData.portNumber,
    projectName: formData === null? "ProjectName" : formData.projectName,
    serverIP: formData === null? "123.456.7.890" : formData.serverIP,
    url: formData === null? "yourdomain.com" : formData.url,
  }
  return (
    <div className="w-100">
      <div className="mt-5 mb-2">
        <h3>Update System Packages</h3>
        <p className="mt-3">It's a good practice to update your system packages</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo apt update
sudo apt upgrade`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <h3>Install Node.js and npm</h3>
        <p className="mt-3">If you haven't installed Node.js, you can do so using the following commands</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo snap install node --classic`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <h3>Install Dependencies</h3>
        <p className="mt-3">Change to the app's directory and install the required Node.js packages.</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`cd ${data.directory}
sudo npm install`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <h3>Build Your React App</h3>
        <p className="mt-3">Build the React app for production.</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo npm run build`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <h3>Install and Configure Nginx</h3>
        <p className="mt-3">If Nginx isn't already installed, you can install it</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo apt install nginx`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <h3>Create an Nginx Configuration File</h3>
        <p className="mt-3">Create a new Nginx configuration file for your app.</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo nano /etc/nginx/sites-available/${(data.projectName).toLocaleLowerCase()}`}
        </SyntaxHighlighter>

        <p className="mt-3">Inside the configuration file, add the following content:</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`server {
    listen ${data.portNumber};
    server_name ${data.url};

    location / {
        root ${data.directory}/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <h3>Enable the Nginx Configuration</h3>
        <p className="mt-3">Create a symbolic link to enable the configuration.</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo ln -s /etc/nginx/sites-available/${(data.projectName).toLocaleLowerCase()} /etc/nginx/sites-enabled/`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <h3>Test Nginx Configuration</h3>
        <p className="mt-3">Test the Nginx configuration to make sure it's valid</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo nginx -t`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <h3>Restart Nginx</h3>
        <p className="mt-3">If the configuration test is successful, restart Nginx to apply the changes.</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo systemctl restart nginx`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <h3>Firewall Configuration</h3>
        <p className="mt-3">If you have a firewall enabled (like UFW), make sure to open the port {data.portNumber} for incoming traffic.</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo ufw allow ${data.portNumber}
sudo ufw reload`}
        </SyntaxHighlighter>
      </div>


    </div>
  )
}

export default DeployReactJsDocs