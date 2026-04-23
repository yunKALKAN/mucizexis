// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AdliKanit
 * @notice On-chain anchor for MucizeXIS integration events and evidence hashes.
 * @dev This contract records metadata ("seals") on-chain. It does NOT move
 *      tokens, transfer value, or interact with the MucizeXIS token at
 *      MUCIZE_FINAL_ADDRESS — that address is recorded as a static reference
 *      only. To transfer tokens, use the MucizeXIS token's own interface.
 *
 *      Ownership/authority model: the deployer becomes `mimar` (single-owner).
 *      All state-mutating functions are gated by `onlyMimar`. No ownership
 *      transfer / renounce function is exposed in this revision.
 */
contract AdliKanit {
    address public mimar;

    /// @notice Static reference to the MucizeXIS token contract. Set at compile
    ///         time; this contract cannot call that contract.
    address public constant MUCIZE_FINAL_ADDRESS =
        0xf06A8832d048a6d500CDDb2aE4100C3Bc79e34AC;

    /// @notice Reference constants. These are stored for public reading only;
    ///         they are not enforced as invariants on any token supply.
    uint256 public constant TOPLAM_MZC_ARZI = 1_000_000_000;
    uint256 public constant AILE_BEREKET_MIKTARI = 481_000;

    struct ZaferKaydi {
        uint256 zaman;
        string bildirgeKodu;
        string durum;
        bool muhurlu;
    }

    struct AileMirasi {
        address cuzdan;
        string isim;
        uint256 miktar;
        bool bereketlendi;
    }

    struct Kanit {
        uint256 zaman;
        string dosyaHash;
        uint256 sonPID;
        string aciklama;
        bool muhurlu;
    }

    ZaferKaydi public nihaiZafer;
    mapping(string => AileMirasi) public aileMirasiTablosu;
    mapping(bytes32 => Kanit) public kanitlar;

    uint256 public toplamKanitCount;
    uint256 public toplamMirasCount;

    event ZaferMuhurlendi(string durum, uint256 zaman);
    event MirasMuhurlendi(string isim, address indexed cuzdan, uint256 miktar);
    event KanitMuhurlendi(bytes32 indexed kanitID, string dosyaHash, uint256 pid);

    error YetkisizErisim();
    error BosEtiket();

    modifier onlyMimar() {
        if (msg.sender != mimar) revert YetkisizErisim();
        _;
    }

    constructor() {
        mimar = msg.sender;
        nihaiZafer = ZaferKaydi({
            zaman: block.timestamp,
            bildirgeKodu: "481-FINAL-TRIUMPH",
            durum: "ETERNAL_PEACE_481",
            muhurlu: true
        });
        emit ZaferMuhurlendi("ETERNAL_PEACE_481", block.timestamp);
    }

    /**
     * @notice Record a family-inheritance entry. Does NOT transfer any tokens.
     * @param _etiket Non-empty label (e.g. "Zubeyde_Anne").
     * @param _cuzdan Recorded recipient address.
     */
    function aileMirasiMuhurle(string calldata _etiket, address _cuzdan) external onlyMimar {
        if (bytes(_etiket).length == 0) revert BosEtiket();
        aileMirasiTablosu[_etiket] = AileMirasi({
            cuzdan: _cuzdan,
            isim: _etiket,
            miktar: AILE_BEREKET_MIKTARI,
            bereketlendi: true
        });
        unchecked {
            toplamMirasCount++;
        }
        emit MirasMuhurlendi(_etiket, _cuzdan, AILE_BEREKET_MIKTARI);
    }

    /**
     * @notice Record an evidence hash ("patoz" seal).
     */
    function patozMuhurle(
        string calldata _dosyaHash,
        uint256 _pid,
        string calldata _not
    ) external onlyMimar returns (bytes32 kanitID) {
        kanitID = keccak256(abi.encodePacked(_dosyaHash, _pid, block.timestamp, msg.sender));
        kanitlar[kanitID] = Kanit({
            zaman: block.timestamp,
            dosyaHash: _dosyaHash,
            sonPID: _pid,
            aciklama: _not,
            muhurlu: true
        });
        unchecked {
            toplamKanitCount++;
        }
        emit KanitMuhurlendi(kanitID, _dosyaHash, _pid);
    }

    /**
     * @notice Mark the final victory entry as a terminal status.
     */
    function missionSuccess() external onlyMimar {
        nihaiZafer.durum = "MISSION_SUCCESS_ELHAMDULILLAH";
        emit ZaferMuhurlendi("MISSION_SUCCESS_ELHAMDULILLAH", block.timestamp);
    }
}
