# Deprecation Policy (Content Hygiene)

## Purpose
Keep the live curriculum clean, avoid stale content, and prevent archived lessons
from being loaded into the database.

## When to Deprecate
- Lesson superseded by a newer version or renamed.
- Legacy structures left from earlier curricula.
- Content is intentionally removed from the public learning path.

## How to Deprecate (Required)
1. **Move, don't delete:**
   - Use `git mv` to move deprecated content to `content/archive/`.
2. **Keep structure:**
   - Preserve original course and lesson folder names inside `content/archive/`.
3. **Update references:**
   - Remove references from any README, roadmap, or docs that point to old paths.
4. **Document in commit:**
   - Mention the archive move in the commit message.

## Forbidden
- Leaving `_archive_*` folders inside `content/courses/`.
- Deleting content without an explicit user request.
- Moving content without updating references.

## Notes
- Archived content should never be loaded into the database.
- If a lesson is renamed, update `meta.json` titles **and** verify DB sync.
