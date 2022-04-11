Adapted from [ourcade/phaser3-parcel-template](https://github.com/ourcade/phaser3-parcel-template)
## Prerequisites

You'll need [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/), and [Parcel](https://parceljs.org/) installed.

It is highly recommended to use [Node Version Manager](https://github.com/nvm-sh/nvm) (nvm) to install Node.js and npm.

For Windows users there is [Node Version Manager for Windows](https://github.com/coreybutler/nvm-windows).

Install Node.js and `npm` with `nvm`:

```bash
nvm install node

nvm use node
```

Replace 'node' with 'latest' for `nvm-windows`.

Then install Parcel:

```bash
npm install -g parcel-bundler
```

You should probably restart your computer now. Fixed some errors for me!

## Getting Started
If you are using WebStorm, you can clone this repo by going to ``File > New > Project from Version Control``

Once you have cloned the repo, run this command in the terminal of the IDE (or in Powershell as admin in the project directory)
```bash
npm install
```


Once you have run ``npm install``, you can run the game by typing into the built in terminal
```bash
npm run start
```

## Building the Game for Delpoyment
We likely don't need to do this until the very end, but if you find yourself in a situation where you want to, run
```bash
npm run build
```

Then, on the github page, switch to the ``gh-pages`` branch and drag and drop every file from the ``/dist`` folder. Then, after following the prompt, the game should be live shortly here: https://jakenorris1124.github.io/COP3441-Project3-Group1/


## Committing
I don't really know how often we should commit and push, but we should probably do it pretty frequently. I recommend trying to duplicate this repo or setting up your own to try to get a feel for how do it.
