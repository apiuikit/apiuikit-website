/**
 * Height of the sticky site header in pixels, passed to apiuikit as
 * `sidePanel.topOffset` so a component-contained side panel opens below the
 * navbar instead of underneath it.
 *
 * Measured height is ~61px (py-3 around a 36px control row, plus the 1px
 * bottom border); 64 leaves a little clearance. Keep this in step with
 * Header.tsx if that padding ever changes.
 */
export const HEADER_HEIGHT = 64;
