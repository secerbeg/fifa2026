Final updated build
- fixed broken translation entry in I18N
- improved EN/BS toggle
- replaced Median with Best 100s
- translated more popup labels and pagination
- stricter Best 100s parsing
- kept section loader, coverage, and search


Full loader metadata build:
- discovers sections from captured response/config data first
- combines response-discovered sections with DOM-discovered sections as fallback
- tracks section loading using request/response metadata in background service worker
- waits for section load completion by watching real seat responses instead of fixed timeout only
- marks coverage complete only when every discovered section has returned seat data

- fixed category click so it only filters; it no longer auto-loads sections
- added explicit 'Load this category' button
- hid detailed coverage pills and kept only compact coverage summary
- safer section clicking now avoids navigation links
