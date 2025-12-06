# Module: Learning Basics (MVP)

## Scope
The fundamental capability to serve educational content and track completion.

## Features
- [ ] List all available lessons.
- [ ] View a single lesson (content + metadata).
- [ ] Mark lesson as complete (manual or via quiz).

## API Requirements
- `GET /api/lessons`: List summary of lessons.
- `GET /api/lessons/{id}`: Full lesson detail.
- `POST /api/lessons/{id}/complete`: Mark as done (optional for Day 4).

## Test Checklist
- [ ] Endpoint returns 200 OK for existing lesson.
- [ ] Endpoint returns 404 Not Found for non-existent lesson.
- [ ] Data structure matches Pydantic schema.
