# Windows Bouncer ThreatMapper Readme

This is a helper tool to visualize malicious actors captured with the Windows Bouncer tool on a map.

## How to use

*  In order to obtain IP information, get an api key from ipdata.co & place it into the LiteDBExtractor tool's appsettings.json config file.
*  Run the LiteDBExtractor interactive console app. You will get an output file in JSON format.
*  Place this file at the root of the "backend" app.
*  Run the backend app with the command npm start
*  Run the frontend app with the command ng serve & navigate to localhost:4200 on your browser