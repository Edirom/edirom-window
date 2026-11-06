# WCAG check: edirom-windows

Manual sample against WCAG 2.2.

| Check | Result |
|---|---|
| 4.1.2 Name and role | WinBox minimise, maximise and close controls are marked `role="button"` with an accessible name when the window is created. |
| 2.1.1 Keyboard | Those controls accept Enter and Space. |
| 2.4.7 Focus visible | Depends on the WinBox stylesheet plus the browser default focus ring on `tabindex="0"`. |
| 1.4.4 Resize | `arrange`, including `grid`, sizes windows from the component box, not from a fixed page width. |
| Licence | This file is MIT. WinBox is loaded from the existing Apache-2.0 fork and is not copied into the repository. |

Events `window-focused`, `window-closed` and `window-minimized` are the outward API. Attribute changes still emit `communicate-windows-*`.
