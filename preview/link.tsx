/**
 * Preview-only stand-in for next/link, used by the static artifact preview build
 * (PREVIEW_EXPORT=1). It renders a plain anchor so each page loads as its own file.
 */
import { forwardRef, type AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; prefetch?: boolean; scroll?: boolean; replace?: boolean };

const Link = forwardRef<HTMLAnchorElement, Props>(function Link(props, ref) {
  const rest: AnchorHTMLAttributes<HTMLAnchorElement> = { ...props };
  for (const key of ["prefetch", "scroll", "replace"]) delete (rest as Record<string, unknown>)[key];
  return <a ref={ref} {...rest} />;
});

export default Link;
