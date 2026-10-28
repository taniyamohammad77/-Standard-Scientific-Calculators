# Run the calculator in VS Code

Install Node.js 24.18.0 or newer within Node 24 and Git on your computer. Clone this repository and open its root folder in VS Code. If you already cloned it, pull the latest main branch first, preserving any local changes.

Open **Terminal → Run Task → Start calculator**. The task installs locked dependencies with npm ci and starts Vite on port 5173. Open the localhost address printed in that terminal in your browser. The task binds to your own computer's loopback interface. Stop it with Ctrl+C in the task terminal before starting it again.

If port 5173 is occupied, stop the previous calculator server or run npm run dev manually and use the address it prints. The task intentionally fails instead of silently switching ports.

This workflow runs on your computer. A server started inside the separate cloud workspace is not your computer's localhost. VS Code was not installed or remotely opened on your machine by the assistant; these are checked-in task instructions. The tasks JSON was validated, but execution through the VS Code interface has not been tested in this cloud environment.
