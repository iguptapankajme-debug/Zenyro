/**
 * Shared, non-React state for the hero sculpture. Scroll sets the target (0 = Build, 1 = Grow,
 * 2 = Convert) and the WebGL loop reads it every frame, so scrolling never re-renders React.
 */
export const heroState = { target: 0 };

export function setHeroTarget(value: number) {
  heroState.target = value;
}
