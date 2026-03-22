#!/bin/bash
# Compare old vs new component rendering
# Requires both playground servers running:
#   - New: http://localhost:5173 (apps/playground)
#   - Old: http://localhost:5174 (apps/playground-old)

B=~/.claude/skills/gstack/browse/dist/browse
OUT_DIR="/tmp/compare-screenshots"
mkdir -p "$OUT_DIR"

# Components that exist in both old and new
COMPONENTS=(
  button alert anchor avatar badge breadcrumb
  card checkbox collapse divider drawer dropdown
  empty flex form grid input input-number
  list menu modal pagination popconfirm popover
  progress radio rate result segmented select
  skeleton slider space spin statistic steps
  switch tabs tag tooltip transfer tree
  typography upload
)

for comp in "${COMPONENTS[@]}"; do
  echo "Comparing: $comp"

  # Screenshot from new playground
  $B goto "http://localhost:5173/$comp" 2>/dev/null
  sleep 2
  $B screenshot "$OUT_DIR/${comp}-new.png" 2>/dev/null

  # Screenshot from old playground
  $B goto "http://localhost:5174/$comp" 2>/dev/null
  sleep 2
  $B screenshot "$OUT_DIR/${comp}-old.png" 2>/dev/null

  echo "  Done: $OUT_DIR/${comp}-{new,old}.png"
done

echo ""
echo "All screenshots saved to $OUT_DIR"
echo "Compare visually or use image diff tools."
