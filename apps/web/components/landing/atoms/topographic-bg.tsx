/**
 * Stylised topographic contour background. Concentric bezier loops give
 * the feel of elevation lines over the Coffee Region without being a
 * literal map. One contour is volt-tinted; the rest are bone at low alpha.
 */
export function TopographicBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden animate-breathe"
    >
      <svg
        className="absolute -inset-20 h-[calc(100%+10rem)] w-[calc(100%+10rem)]"
        viewBox="0 0 1200 900"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="fadeOut" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="vignette">
            <rect width="100%" height="100%" fill="url(#fadeOut)" />
          </mask>
        </defs>

        <g mask="url(#vignette)" fill="none" strokeWidth="1.2">
          {/* Six concentric contour loops, imperfect bezier shapes. */}
          <path
            d="M600 220 C 820 180, 960 320, 940 480 S 720 720, 520 700 340 560, 380 400 420 240, 600 220 Z"
            stroke="var(--color-bone)"
            strokeOpacity="0.06"
            style={{ ['--dash-length' as string]: '3200' }}
            className="animate-draw-path"
          />
          <path
            d="M600 260 C 780 230, 900 350, 880 480 S 700 680, 540 660 380 540, 420 420 460 280, 600 260 Z"
            stroke="var(--color-bone)"
            strokeOpacity="0.08"
            style={{ ['--dash-length' as string]: '2800', animationDelay: '0.2s' }}
            className="animate-draw-path"
          />
          <path
            d="M600 300 C 740 280, 840 380, 820 480 S 680 640, 560 620 420 520, 460 440 500 320, 600 300 Z"
            stroke="var(--color-bone)"
            strokeOpacity="0.1"
            style={{ ['--dash-length' as string]: '2400', animationDelay: '0.4s' }}
            className="animate-draw-path"
          />
          {/* Volt contour — the "highlighted elevation" */}
          <path
            d="M600 340 C 700 325, 780 400, 760 480 S 660 600, 580 580 460 500, 500 460 540 355, 600 340 Z"
            stroke="var(--color-volt)"
            strokeOpacity="0.35"
            style={{ ['--dash-length' as string]: '2000', animationDelay: '0.6s' }}
            className="animate-draw-path"
          />
          <path
            d="M600 380 C 670 370, 720 420, 710 480 S 640 560, 590 545 505 490, 530 465 560 390, 600 380 Z"
            stroke="var(--color-bone)"
            strokeOpacity="0.09"
            style={{ ['--dash-length' as string]: '1600', animationDelay: '0.8s' }}
            className="animate-draw-path"
          />
          <path
            d="M600 420 C 645 415, 670 445, 665 480 S 625 525, 595 515 540 485, 555 468 575 425, 600 420 Z"
            stroke="var(--color-bone)"
            strokeOpacity="0.07"
            style={{ ['--dash-length' as string]: '1200', animationDelay: '1s' }}
            className="animate-draw-path"
          />
        </g>

        {/* Pin on the "summit" */}
        <g transform="translate(600 470)">
          <circle r="3" fill="var(--color-volt)" />
          <circle r="10" stroke="var(--color-volt)" strokeOpacity="0.35" fill="none" />
          <circle r="20" stroke="var(--color-volt)" strokeOpacity="0.15" fill="none" />
        </g>
      </svg>
    </div>
  );
}
