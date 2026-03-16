#!/usr/bin/env bash
#
# local-install.sh
# Installs dependencies without VPN by redirecting to the public npm registry.
# Usage: bash custom-claude-scripts/local-install.sh

set -uo pipefail

INTERNAL_REGISTRY="https://registry.devops.etat-ge.ch/ctinexus/repository/npmjs/"
PUBLIC_REGISTRY="https://registry.yarnpkg.com/"

# --- Pre-checks ---

if [[ ! -f "package.json" || ! -f "yarn.lock" ]]; then
  echo "Error: package.json or yarn.lock not found. Run this script from the project root."
  exit 1
fi

if ! command -v yarn &>/dev/null; then
  echo "Error: yarn is not installed."
  exit 1
fi

# --- Cleanup function (always runs) ---

cleanup() {
  echo ""
  echo "Restoring yarn.lock..."
  git checkout -- yarn.lock
  echo "Removing temporary .npmrc..."
  rm -f .npmrc
}

trap cleanup EXIT

# --- Main ---

echo "Creating temporary .npmrc pointing to public registry..."
echo "registry=https://registry.npmjs.org/" > .npmrc

echo "Rewriting yarn.lock to use public registry..."
sed -i "s|${INTERNAL_REGISTRY}|${PUBLIC_REGISTRY}|g" yarn.lock

echo "Running yarn install..."
if yarn install; then
  echo ""
  echo "Success! Dependencies installed."
else
  exit_code=$?
  echo ""
  echo "Error: yarn install failed (exit code ${exit_code})."
  exit "${exit_code}"
fi
