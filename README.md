# @niteowl/ui

Shared presentation package for NiteOwl web applications.

This repository owns reusable UI behavior and presentation, including the shared application shell, header, sidebar, navigation rendering, branding, page-heading treatment, and shared shadcn-derived primitives as they are consolidated.

It intentionally does not own application definitions, URLs, route trees, or authorization policy. Those belong in `@niteowl/app-config` or the consuming application.

## Design rule

`@niteowl/ui` must not import `@niteowl/app-config`. A consuming application imports both packages and passes resolved navigation/configuration into the UI layer.

App-specific feature components remain in their application repositories.
