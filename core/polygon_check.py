"""Polygon address reporter.

Prints the configured public Polygon address. Does NOT query balances; add
`web3` as a dependency and extend this module when on-chain queries are needed.
"""

from __future__ import annotations

POLYGON_ADDRESS = "0xA9487a4a6A98722d6Cd7d6FF3e59b741a0E87198"


def main() -> None:
    print("🔗 Polygon Account 7 bağlı")
    print(f"Adres: {POLYGON_ADDRESS}")


if __name__ == "__main__":
    main()
