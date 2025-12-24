# Incident Report: mentor-openblas-libmtmd
**Date:** 2025-12-23
**Severity:** Medium
**Status:** Resolved

## What Happened?
Mentor services restarted with exit code 127 after switching to a custom llama.cpp OpenBLAS image. The mentor endpoints returned 503 (mentor offline).

## Root Cause Analysis (5 Whys)
1. Why were mentor services restarting? The llama-server binary failed to start.
2. Why did it fail to start? Missing shared library: libmtmd.so.0.
3. Why was the library missing? The custom image did not copy libmtmd*.so* from the build stage.
4. Why was the image custom? Needed OpenBLAS for CPU performance.
5. Why not caught earlier? No ldd check or smoke test for the custom image before swapping containers.

## Resolution
- Added libcurl4-openssl-dev to build stage to satisfy CMake.
- Added libcurl4 to runtime image.
- Copied libmtmd*.so* into /app alongside other llama libraries.
- Rebuilt image and recreated mentor containers.
- Verified /health on ports 8081-8083 and backend /mentor/health.

## Prevention (Action Items)
- [ ] Add a lightweight ldd check for the custom image in the mentor build workflow.
- [ ] Add a mentor smoke call in release checklist to catch startup regressions.
