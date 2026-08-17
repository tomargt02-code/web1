import { AuroraCanvas } from "./AuroraCanvas";
import { NeuralCore } from "./NeuralCore";

/**
 * Single persistent background layer for the whole app shell.
 * Mounted once in __root.tsx so the animation never restarts between
 * sections or route changes.
 */
export function SiteBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <AuroraCanvas className="absolute inset-0 h-full w-full opacity-50" />
      <NeuralCore className="absolute left-1/2 top-1/2 h-[130%] w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-90" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/80 to-transparent" />
    </div>
  );
}
