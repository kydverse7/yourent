import Image from 'next/image';
import { FRAME_DESKTOP, FRAME_MOBILE } from './constants';

type LandingImageSlideProps = {
  src: string;
  alt: string;
  isMobile: boolean;
};

/**
 * Slides 2+ — standard image slide.
 *
 * Independent from the 3D component. Same visible frame size,
 * but no oversample wrapper: just a clean next/image.
 */
export function LandingImageSlide({
  src,
  alt,
  isMobile,
}: LandingImageSlideProps) {
  const frame = isMobile ? FRAME_MOBILE : FRAME_DESKTOP;

  return (
    <div
      className="lp-media-frame"
      style={{ width: frame.width, height: frame.height }}
    >
      <div className="lp-media-inner lp-image-inner">
        <Image
          src={src}
          alt={alt}
          fill
          className="lp-slide-image"
          sizes={`(max-width: 768px) ${FRAME_MOBILE.width}px, ${FRAME_DESKTOP.width}px`}
        />
      </div>
    </div>
  );
}
