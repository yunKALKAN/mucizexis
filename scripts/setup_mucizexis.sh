#!/bin/bash
# MucizeXIS 3.2 + META-XIS Master Setup
# Creates folder structure, writes core Python modules, and runs a smoke test.
# Idempotent: safe to re-run.

set -e

echo "🔥 M u c i z eXIS 3.2 + META-XIS Master Setup başlatılıyor..."
echo "==================================================="

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Resolve repo root (parent of scripts/)
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="${ROOT}/mucizexis-core"

echo -e "${BLUE}📁 Klasör yapısı oluşturuluyor: ${TARGET}${NC}"
mkdir -p "${TARGET}/core" "${TARGET}/meta" "${TARGET}/polygon" "${TARGET}/logs"

# Core file is version-controlled under core/ — don't overwrite if user modified it.
if [ ! -f "${TARGET}/core/MucizeXIS.py" ]; then
  cp "${ROOT}/core/MucizeXIS.py" "${TARGET}/core/MucizeXIS.py"
fi
if [ ! -f "${TARGET}/meta/META_XIS.py" ]; then
  cp "${ROOT}/core/META_XIS.py" "${TARGET}/meta/META_XIS.py"
fi
if [ ! -f "${TARGET}/polygon/check.py" ]; then
  cp "${ROOT}/core/polygon_check.py" "${TARGET}/polygon/check.py"
fi

echo -e "${GREEN}✅ Tüm çekirdek dosyalar yerleştirildi.${NC}"

echo -e "${YELLOW}🚀 Smoke test çalıştırılıyor...${NC}"
python3 "${TARGET}/core/MucizeXIS.py"
python3 "${TARGET}/meta/META_XIS.py"

echo ""
echo "==================================================="
echo "🎉 M u c i z eXIS + META-XIS kurulumu tamamlandı!"
echo "Konum: ${TARGET}"
echo "Ana komut: python3 ${TARGET}/core/MucizeXIS.py"
