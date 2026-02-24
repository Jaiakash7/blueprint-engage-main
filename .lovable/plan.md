

## Plan: Add Swipeable Second Home Screen Page

Based on the reference image, the user wants a **multi-page home screen** (like iOS/Android launcher pages) where swiping horizontally on the home screen reveals a second page. This second page contains:
- **Prizes** and **Schedule** icon buttons at the top
- A **Title Sponsor** card in the center
- The same bottom dock at the bottom

### Architecture

The HomeScreen will become a horizontally swipeable container with two "pages" inside it. The existing home content stays on page 1, and a new page 2 slides in from the right when the user swipes left.

### Implementation Details

**1. Modify `HomeScreen.tsx`**
- Wrap the main content area (between StatusBar and BottomDock) in a horizontal snap-scroll container with two full-width pages.
- Page 1: Current content (carousel, nav grid, CTA).
- Page 2: New content matching the reference — Prizes icon, Schedule icon, and a Title Sponsor card.
- Add page indicator dots between the content and the bottom dock.

**2. Create `HomePageTwo.tsx`** (new component)
- Two icon buttons at the top: "PRIZES" (yellow, trophy icon) and "SCHEDULE" (purple/blue, clock icon).
- A large frosted-glass **Title Sponsor** card in the center with sponsor name "MechCorp Industries" (keeping the mechanical theme), a diamond icon, "TITLE SPONSOR" label, and a "LEARN MORE ↗" link.
- The layout matches the reference: icons top-left, sponsor card centered below.

**3. Page dots indicator**
- Small dot indicators (similar to the carousel dots) showing which home page is active, placed just above the bottom dock.

### Files Changed
| File | Change |
|------|--------|
| `src/components/HomePageTwo.tsx` | **New** — Second home screen page content |
| `src/components/HomeScreen.tsx` | Wrap content in horizontal snap-scroll, add page 2 and page dots |

