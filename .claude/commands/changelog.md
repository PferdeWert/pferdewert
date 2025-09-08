---
description: Update CHANGELOG.md with latest changes - shows recent commits and updates date
---

```bash
git log --oneline -5 && echo '\n--- Updating CHANGELOG.md with latest changes ---' && date '+%Y-%m-%d' | read TODAY && sed -i '' "s/## \\[Unreleased\\] - .*/## [Unreleased] - $TODAY/" /Users/benjaminreder/Library/CloudStorage/Dropbox/Startups\ -\ Business/PferdeWert/Code\ Repository/pferdewert/CHANGELOG.md && echo 'Changelog updated successfully. Please add the most important changes from the commits above to the Recent Changes section.'
```