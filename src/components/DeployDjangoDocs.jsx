import React from "react";
import { useLocation } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

function DeployDjangoDocs() {
  const location = useLocation();
  const formData = location.state && location.state.formData;
  const data = {
    directory: formData === null? "/path/to/your/project/directory" : formData.directory,
    portNumber: formData === null? "80" : formData.portNumber,
    projectApp: formData === null? "project_app" : formData.projectApp,
    projectName: formData === null? "ProjectName" : formData.projectName,
    serverIP: formData === null? "123.456.7.890" : formData.serverIP,
    serviceFile: formData === null? "projectname" : formData.serviceFile,
    ubuntuUsername: formData === null? "ubuntuUsername" : formData.ubuntuUsername,
    url: formData === null? "yourdomain.com" : formData.url,
  }

  console.log(data)
  return (
    <div className="w-100">
      <div className="mt-5 mb-2">
        <h3>Set up your Ubuntu Server</h3>
        <p className="mt-3">Make sure your server is up to date</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo apt update
sudo apt upgrade`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <h3>Install Required Software</h3>
        <p className="mt-3">Install Python, pip, and virtualenv</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo apt install python3 python3-pip python3-venv`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <h3>Create a Virtual Environment</h3>
        <p className="mt-3">
          Create a virtual environment for your Django app and activate it
        </p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`cd ${data.directory}
python3 -m venv venv
source venv/bin/activate
`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <h3>Install Dependencies</h3>
        <p className="mt-3">Install the required Python packages</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`pip install -r requirements.txt
pip install django gunicorn`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <h3>Configure Gunicorn</h3>
        <p className="mt-3">
          Create a Gunicorn systemd service for your app. Create a file like
          /etc/systemd/system/{data.serviceFile}.service and add the following content,
          adjusting paths and configurations as necessary
        </p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo nano /etc/systemd/system/${data.serviceFile}.service`}
        </SyntaxHighlighter>

        <SyntaxHighlighter language="ini" style={nightOwl} className="rounded">
          {`[Unit]
Description=${data.projectName}
After=network.target

[Service]
User=${data.ubuntuUsername}
Group=${data.ubuntuUsername}
WorkingDirectory=${data.directory}
ExecStart=${data.directory}/venv/bin/gunicorn --workers 3 --bind unix:${data.directory}/${data.serviceFile}.sock ${data.projectApp}.wsgi:application

[Install]
WantedBy=multi-user.target`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <p className="mt-3">Save the file and enable and start the Gunicorn service</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo systemctl enable ${data.serviceFile}
sudo systemctl start ${data.serviceFile}`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <h3>Install and Configure Nginx</h3>
        <p className="mt-3">Install Nginx</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo apt install nginx`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <p className="mt-3">Create an Nginx server block configuration file for your app. Create a file like /etc/nginx/sites-available/{data.serviceFile} and add the following content</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo nano /etc/nginx/sites-available/${data.serviceFile}`}
        </SyntaxHighlighter>

        <SyntaxHighlighter language="nginx" style={nightOwl} className="rounded">
          {`server {
    listen ${data.portNumber};
    server_name ${data.url};

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root ${data.directory};
    }

    location / {
        include proxy_params;
        proxy_pass http://unix:${data.directory}/${data.serviceFile}.sock;
    }
}
`}
        </SyntaxHighlighter>
      </div>



      <div className="mt-5 mb-2">
        <p className="mt-3">Create a symbolic link to enable the Nginx configuration:</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo ln -s /etc/nginx/sites-available/${data.serviceFile} /etc/nginx/sites-enabled`}
        </SyntaxHighlighter>
      </div>


      <div className="mt-5 mb-2">
        <p className="mt-3">Test the Nginx configuration for syntax errors</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo nginx -t`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <p className="mt-3">If there are no syntax errors, reload Nginx to apply the changes</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo systemctl reload nginx`}
        </SyntaxHighlighter>
      </div>

      <div className="mt-5 mb-2">
        <h3>Configure Firewall (if needed)</h3>
        <p className="mt-3">If you have a firewall enabled, make sure to allow traffic on port 80 (HTTP) and 443 (HTTPS)</p>

        <SyntaxHighlighter language="bash" style={nightOwl} className="rounded">
          {`sudo ufw allow ${data.portNumber}/tcp
sudo ufw allow 443/tcp
sudo ufw reload
`}
        </SyntaxHighlighter>
      </div>

    </div>
  );
}

export default DeployDjangoDocs;
