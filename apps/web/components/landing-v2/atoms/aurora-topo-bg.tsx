/**
 * Topographic contour background for the v2 opener. Concentric bezier loops
 * in violet/blue at low alpha, draw-in on mount. One contour highlighted in
 * violet-deep — the "you-are-here" elevation.
 */
export function AuroraTopoBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden animate-breathe"
    >
      <svg
        className="absolute -inset-20 h-[calc(100%+10rem)] w-[calc(100%+10rem)]"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="auroraVignette" cx="50%" cy="55%" r="62%">
            <stop offset="0%" stopColor="white" stopOpacity="0.95" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="auroraMask">
            <rect width="100%" height="100%" fill="url(#auroraVignette)" />
          </mask>
        </defs>

        <g mask="url(#auroraMask)" fill="none" strokeWidth="1.2">
          <path
            d="M600 220 C 820 180, 960 320, 940 480 S 720 720, 520 700 340 560, 380 400 420 240, 600 220 Z"
            stroke="var(--color-aurora-blue)"
            strokeOpacity="0.16"
            style={{ ['--dash-length' as string]: '3200' }}
            className="animate-draw-path"
          />
          <path
            d="M600 260 C 780 230, 900 350, 880 480 S 700 680, 540 660 380 540, 420 420 460 280, 600 260 Z"
            stroke="var(--color-aurora-blue)"
            strokeOpacity="0.22"
            style={{ ['--dash-length' as string]: '2800', animationDelay: '0.2s' }}
            className="animate-draw-path"
          />
          <path
            d="M600 300 C 740 280, 840 380, 820 480 S 680 640, 560 620 420 520, 460 440 500 320, 600 300 Z"
            stroke="var(--color-aurora-blue)"
            strokeOpacity="0.28"
            style={{ ['--dash-length' as string]: '2400', animationDelay: '0.4s' }}
            className="animate-draw-path"
          />
          {/* Highlighted elevation */}
          <path
            d="M600 340 C 700 325, 780 400, 760 480 S 660 600, 580 580 460 500, 500 460 540 355, 600 340 Z"
            stroke="var(--color-aurora-deep)"
            strokeOpacity="0.55"
            style={{ ['--dash-length' as string]: '2000', animationDelay: '0.6s' }}
            className="animate-draw-path"
          />
          <path
            d="M600 380 C 670 370, 720 420, 710 480 S 640 560, 590 545 505 490, 530 465 560 390, 600 380 Z"
            stroke="var(--color-aurora-blue)"
            strokeOpacity="0.32"
            style={{ ['--dash-length' as string]: '1600', animationDelay: '0.8s' }}
            className="animate-draw-path"
          />
          <path
            d="M600 420 C 645 415, 670 445, 665 480 S 625 525, 595 515 540 485, 555 468 575 425, 600 420 Z"
            stroke="var(--color-aurora-blue)"
            strokeOpacity="0.24"
            style={{ ['--dash-length' as string]: '1200', animationDelay: '1s' }}
            className="animate-draw-path"
          />
        </g>

        {/* Pin on the "summit" */}
        <g transform="translate(600 470)">
          <circle r="3" fill="var(--color-aurora-deep)" />
          <circle r="10" stroke="var(--color-aurora-deep)" strokeOpacity="0.4" fill="none" />
          <circle r="20" stroke="var(--color-aurora-deep)" strokeOpacity="0.18" fill="none" />
        </g>
      </svg>
    </div>
  );
}
