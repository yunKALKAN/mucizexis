"""MucizeXIS 3.2 core module.

Provides a minimal `MucizeXIS` class with a deterministic, auditable "ethical
matrix" based scoring function for decision approval. No external dependencies.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Iterable


DEFAULT_ETHICAL_MATRIX: dict[str, float] = {
    "zarar_verme": 0.35,
    "adalet": 0.30,
    "mahremiyet": 0.25,
    "manipulasyon": 0.10,
}

DEFAULT_SUBSYSTEMS: tuple[str, ...] = (
    "SIBERIXIS 6.2",
    "FATİH 1453 v4.2",
    "WEBXIS 2.9",
    "BIXI$ 5.6",
)

POLYGON_ADDRESS = "0xA9487a4a6A98722d6Cd7d6FF3e59b741a0E87198"


@dataclass
class MucizeXIS:
    name: str = "M u c i z eXIS 3.2"
    meta_active: bool = True
    subsystems: tuple[str, ...] = DEFAULT_SUBSYSTEMS
    polygon_address: str = POLYGON_ADDRESS
    ethical_matrix: dict[str, float] = field(
        default_factory=lambda: dict(DEFAULT_ETHICAL_MATRIX)
    )

    def conscience_score(self, risks: Iterable[str]) -> float:
        """Return a score in [0.0, 1.0]. Lower = more risky."""
        score = 1.0
        for risk in risks:
            score -= self.ethical_matrix.get(risk, 0.0)
        return max(0.0, score)

    def decide(self, decision: Any, risks: Iterable[str] | None = None) -> dict[str, Any]:
        """Evaluate a decision against the ethical matrix."""
        risks = list(risks) if risks is not None else []
        score = self.conscience_score(risks)
        if score < 0.5:
            return {
                "status": "RED",
                "score": score,
                "reason": "Etik eşik aşıldı",
                "risks": risks,
            }
        return {
            "status": "APPROVED",
            "score": score,
            "decision": decision,
            "risks": risks,
        }


def main() -> None:
    m = MucizeXIS()
    print("✅ M u c i z eXIS 3.2 + META-XIS aktif")
    print(f"Polygon Adres: {m.polygon_address}")
    print(f"Aktif Sistemler: {list(m.subsystems)}")

    demo = m.decide("Örnek karar", risks=["adalet"])
    print(f"Demo karar: {demo}")


if __name__ == "__main__":
    main()
