# 🎟️ TokenMaster Clone

A modernized clone of [TokenMaster by dApp University](https://github.com/dappuniversity/tokenmaster/)  
✨ Built with an up-to-date tech stack + code improvements for easier development.

---

## 🚀 Tech Stack

- 🟦 **TypeScript** → Core language (not 100% pure, but mostly used)
- 🟨 **JavaScript** → Configuration & tooling
- ⛓️ **Solidity** → Smart contracts
- 🛠️ **Hardhat** → Ethereum dApp development & testing
- ⚡ [**Ethers.js v6**](https://docs.ethers.io/v6/) → Frontend ↔ blockchain bridge
- ⚛️ **React** → Frontend library
- 🦊 [**MetaMask**](https://metamask.io/) → Wallet & provider

---

## 📋 Requirements

Make sure you have these before running the project:

- [Node.js](https://nodejs.org/) **v22+** (recommended)  
  👉 Download from [here](https://nodejs.org/id/download)
- [MetaMask browser extension](https://metamask.io/)  
  👉 You’ll need this to connect your wallet.

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Anifyuli/tokenmaster-clone.git
cd tokenmaster-clone
````

### 2. Install dependencies

We recommend using **pnpm** (faster + disk space efficient), but npm/yarn also works.

```bash
# With pnpm (recommended)
pnpm install

# Or with npm
npm install
```

### 3. Start Hardhat node

This will spin up a local Ethereum blockchain for development.

```bash
npx hardhat node
```

### 4. Deploy contracts

In a separate terminal:

```bash
npm run contract:deploy
```

Actually, this command is shorthand for `npx hardhat run scripts/deploy.js --network localhost`, you can check on [package.json](package.json) for details.

### 5. Start the frontend

```bash
pnpm dev
# or
npm run dev
```

Now open 👉 [http://localhost:5173](http://localhost:5173) in your browser!

---

## 🧪 Testing the Contracts

Run automated tests with Hardhat:

```bash
npx hardhat test
```

---

## 🦊 Connecting with MetaMask

1. Open MetaMask → Add network → **http://127.0.0.1:8545**
2. Import an account using a private key from the Hardhat node output
3. Refresh the frontend → connect wallet → you're ready 🎉

---

## 📖 Notes

* This project is for **learning & experimentation**.
* Don’t use it on mainnet with real funds unless you’ve audited the code ⚠️.

---

## 🤝 Contributing

Found a bug 🐞? Got an idea 💡?
Feel free to open an issue or PR — contributions are welcome!

---

## 📜 License

MIT License © 2025 — Happy coding & building 🚀
