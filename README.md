# Moralis NFT Marketplace

This is a Frontend application for the `NFT Marketplace` project using [Nextjs](https://nextjs.org/) and [Moralis Server](https://moralis.io).

# Key Features and Notes

1. Home Page:
   Show recently listed NFTs

- If you own the NFT, you can update the listing: create an update modal when you click the NFT
- If not, you can buy the listing

2. Sell Page:
   You can list your NFTs on the marketplace

3. Moralis: How to tell Moralis server to listen to events?

- Connect it to the blockchain
- Which contract, which events, and what to do when it hears those events

# Setup The Project

## 1. Clone this repository

```
git clone git@github.com:nvtrinh2001/nextjs-moralis-nft-marketplace.git
cd nextjs-moralis-nft-marketplace
yarn
```

### IMPORTANT

Due to the error of the old moralis package used in this project, after cloning this repository, you will see in `package.json` file:

`"react-moralis": "^1.3.5"`

If you run the application, there will be some errors appear.

Run this line to fix:

`yarn add react-moralis@1.3.5`

## 2. Start your node

Clone this repository:

```
git clone git@github.com:nvtrinh2001/hardhat-nft-marketplace.git
cd hardhat-nft-marketplace
yarn
```

And run:

`yarn hardhat node`

## 3. Connect your Codebase to your Moralis Server

Create a new Moralis Server on their website.

Once setup, create your `.env` file based on `.env.example`

Then, in your `./package.json` update the following lines:

```
"moralis:sync": "moralis-admin-cli connect-local-devchain --chain hardhat --moralisSubdomain XXX.usemoralis.com --frpcPath ./frp/frpc",
"moralis:cloud": "moralis-admin-cli watch-cloud-folder  --moralisSubdomain XXX.usemoralis.com --autoSave 1 --moralisCloudfolder ./cloudFunctions",
"moralis:logs": "moralis-admin-cli get-logs --moralisSubdomain XXX.usemoralis.com"
```

Replace the `XXX.usemoralis.com` with your subdomain, like `4444acatycat.usemoralis.com` and update the `moralis:sync` script's path to your instance of `frp` (downloaded as part of the Moralis "Devchain Proxy Server" instructions mentioned below)

## 4. Install `moralis-admin-cli` globally

`yarn global add moralis-admin-cli

## 5. Setup Moralis Reverse Proxy

> Optionally: On your server, click on "View Details" and then "Devchain Proxy Server" and follow the instructions. You'll want to use the `hardhat` connection.

- Download the latest reverse proxy code from [FRP](https://github.com/fatedier/frp/releases) and add the binary to `./frp/frpc`.
- Replace your content in `frpc.ini`, based on your devchain. You can find the information on the `DevChain Proxy Server` tab of your moralis server.

Once you've got all this, you can run:

```
yarn moralis:sync
```

You'll know you've done it right when you can see a green `connected` button after hitting the refresh symbol next to `DISCONNECTED`. _You'll want to keep this connection running_.

### IMPORTANT

Anytime you reset your hardhat node, you'll need to press the `RESET LOCAL CHAIN` button on your UI!

## 6. Setup your Cloud functions

In a separate terminal (you'll have a few up throughout these steps)

Run `yarn moralis:cloud` in one terminal, and run `yarn moralis:logs` in another.

> Note: You can stop these after running them once if your server is at max CPU capactity.

## 7. Add your event listeners

### You can do this programatically by running:

```
node addEvents.js
```

### Or, if you want to do it manually

Finally, go to `View Details` -> `Sync` and hit `Add New Sync` -> `Sync and Watch Contract Events`

## 8. Mint and List your NFT

Back in the main directory, run:

```
yarn hardhat run scripts/mint-and-list-item.js --network localhost
```

And you'll now have an NFT listed on your marketplace.

## 9. Start your front end

At this point, you'll have a few terminals running:

- Your Hardhat Node
- Your Hardhat Node syncing with your moralis server
- Your Cloud Functions syncing
- Your Moralis Logging

And you're about to have one more for your front end.

```
yarn run dev
```

And you'll have your front end, indexing service running, and blockchain running.
