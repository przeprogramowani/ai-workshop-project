#!/bin/bash

# This script updates the local 'master' branch to match a specified checkpoint branch from 'origin'.
# It does NOT push the changes to the remote repository.
#
# --- Compatibility ---
# macOS & Linux: Works out of the box.
# Windows: This script must be run using a bash-compatible shell.
#          Git Bash, which is included with Git for Windows, is recommended.
# ---------------------

# Usage: ./load-checkpoint.sh <checkpoint-branch-name>

# Check if a branch name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <checkpoint-branch-name>"
  exit 1
fi

CHECKPOINT_BRANCH=$1

echo "Updating local 'master' branch from 'origin/$CHECKPOINT_BRANCH'..."

# 1. Fetch the latest updates from origin
echo "Fetching from origin..."
git fetch origin
if [ $? -ne 0 ]; then
    echo "Error: Failed to fetch from origin."
    exit 1
fi

# 2. Check out the master branch
echo "Checking out master..."
git checkout master
if [ $? -ne 0 ]; then
    echo "Error: Failed to checkout master."
    exit 1
fi

# 3. Hard reset master to the checkpoint branch
echo "Resetting master to origin/$CHECKPOINT_BRANCH..."
git reset --hard "origin/$CHECKPOINT_BRANCH"
if [ $? -ne 0 ]; then
    echo "Error: Failed to reset master branch."
    exit 1
fi

echo ""
echo "Successfully updated local 'master' branch to match 'origin/$CHECKPOINT_BRANCH'."