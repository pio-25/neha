# Task Progress: Fix footer spacing in project files

## Issue

Five project files had `<br />` inside `.cs-body` instead of outside it, causing the footer to float too close to the Next/Related buttons.

## Files Fixed

- [x] Strategic BIM Adoption Plan AEC Firm Implementation.html
  - Added missing `</div>` to close `.cs-sec` around `.c2.learn`
  - Moved `<br />` from inside `.cs-body` to before `<footer>`
- [x] Advancing Construction Through Additive Manufacturing.html
  - Moved `<br />` from inside `.cs-body` to before `<footer>`
- [x] BIM and Digital Transformation Four Studies.html
  - Moved `<br />` from inside `.cs-body` to before `<footer>`
- [x] Residential Bungalow and Community Landscape.html
  - Moved `<br />` from inside `.cs-body` to before `<footer>`
  - Fixed corrupted `<!doctype html>` declaration
- [x] Fashion Institute Where fashion finds its form.html
  - Moved `<br />` from inside `.cs-body` to before `<footer>`

## Result

All 5 project files now have consistent footer spacing matching the correctly structured files (Ongrid MEP, Federated Clash-Free Model, Architectural AI Visualisation).
