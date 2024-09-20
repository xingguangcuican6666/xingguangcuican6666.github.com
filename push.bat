@echo off
echo ===================
git tag
echo ===================
set /p name="tag name:"

set /p commit="commit:"
git add . -v
git commit -v -m "%commit%"
git push -v


git tag -a "%name%" -m "%commit%"

git push --tags -v
