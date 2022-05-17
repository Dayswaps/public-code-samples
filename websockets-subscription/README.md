## Installation

* Clone this repository and enter the `websockets-subscription` folder, or simply copy the three files to your preferred location: `package.json`, `package-lock.json` and `index.js`.
* Run `npm install` in the `websocket-subscription` folder to get the dependencies.
* Change the values of constants `API_KEY` and `WORKSPACE_ID` in the `index.js` file to the values obtained from Daywaps.

## Running the example

* Run `npm run subscribe` or `node index.js` from the `websocket-subscription` folder and keep the script running.
* Try changing some shifts and unavailabilities in your workspace via Dayswaps web app. Every change should be immediately displayed by the script in its commandline window.
* You can use this whole example when implementin your own websockets subscription, or just take a look at the GraphQL queries inside `index.js` and use that.