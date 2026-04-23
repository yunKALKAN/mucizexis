# Contracts

Solidity sources used by the MucizeXIS ecosystem. These are **source files
only** — this PR does **not** compile, test, or deploy them.

## AdliKanit.sol

An on-chain "seal" ledger. It records metadata events (family-inheritance
entries, evidence hashes, a final-mission status). It **does not**:

- Move or mint any tokens.
- Interact with the MucizeXIS token at `MUCIZE_FINAL_ADDRESS`. That address is
  stored as a static reference only (the contract has no code path that calls
  into it).
- Grant any real-world legal authority. On-chain events are timestamps +
  hashes, not judicial rulings.

### What it does (accurately)

- `aileMirasiMuhurle(label, wallet)` — writes a record
  `{label, wallet, miktar=481_000, bereketlendi=true}` to `aileMirasiTablosu`
  and emits `MirasMuhurlendi`. The `miktar` field is a constant recorded in
  storage; it is **not** a token transfer.
- `patozMuhurle(dosyaHash, pid, not)` — writes an evidence record keyed by
  `keccak256(dosyaHash, pid, block.timestamp, msg.sender)` and emits
  `KanitMuhurlendi`.
- `missionSuccess()` — updates `nihaiZafer.durum` to a terminal string and
  emits `ZaferMuhurlendi`.

All state-mutating calls are gated by `onlyMimar` (the deployer).

### Compile locally

Foundry:

```bash
forge init --no-commit tmp-forge
cp contracts/AdliKanit.sol tmp-forge/src/
cd tmp-forge && forge build
```

Hardhat:

```bash
npx hardhat init   # pick "Create an empty hardhat.config.js"
mkdir -p contracts
cp ../contracts/AdliKanit.sol contracts/
npx hardhat compile
```

### Deploy notes (out of scope here)

To deploy to Polygon you will need:

1. A funded deployer EOA with MATIC on the target network (mainnet or Amoy
   testnet).
2. An RPC URL (public or Alchemy / Infura).
3. A private key (or hardware-wallet signer). **Never commit this.** Use a
   local `.env` or a vault; see `../SECURITY.md` in `mucizeEPT_Core_v1` for
   the ecosystem's secret-handling conventions.

Deployment is intentionally not wired into this repository yet — it needs a
product decision about which network (mainnet vs Amoy), who signs, and how
post-deploy ABI / address metadata gets distributed to the frontend.
