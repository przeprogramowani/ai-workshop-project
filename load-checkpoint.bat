@ECHO OFF

:: This script updates the local 'master' branch to match a specified checkpoint branch from 'origin'.
:: It is designed for Windows and can be run from the standard Command Prompt (cmd.exe).
:: It does NOT push the changes to the remote repository.

:: Usage: load-checkpoint.bat <checkpoint-branch-name>

:: Check if a branch name is provided
IF [%1]==[] (
    ECHO Usage: %0 ^<checkpoint-branch-name^>
    EXIT /B 1
)

SET CHECKPOINT_BRANCH=%1

ECHO Updating local 'master' branch from 'origin/%CHECKPOINT_BRANCH%'...

:: 1. Fetch the latest updates from origin
ECHO Fetching from origin...
git fetch origin
IF ERRORLEVEL 1 (
    ECHO Error: Failed to fetch from origin.
    EXIT /B 1
)

:: 2. Check out the master branch
ECHO Checking out master...
git checkout master
IF ERRORLEVEL 1 (
    ECHO Error: Failed to checkout master.
    EXIT /B 1
)

:: 3. Hard reset master to the checkpoint branch
ECHO Resetting master to origin/%CHECKPOINT_BRANCH%...
git reset --hard "origin/%CHECKPOINT_BRANCH%"
IF ERRORLEVEL 1 (
    ECHO Error: Failed to reset master branch.
    EXIT /B 1
)

ECHO.
ECHO Successfully updated local 'master' branch to match 'origin/%CHECKPOINT_BRANCH%'.

EXIT /B 0