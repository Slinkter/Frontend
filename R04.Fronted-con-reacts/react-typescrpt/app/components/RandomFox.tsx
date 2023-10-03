import React, { ImgHTMLAttributes, useEffect, useRef, useState } from "react";
type LazeImageProps = { src: string; alt: string };
type ImageNative = ImgHTMLAttributes<HTMLIFrameElement>;
type Props = LazeImageProps & ImageNative;
const urlImgDefault =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="; //

const LazeImage = ({ src, ...imgProps }: Props): JSX.Element => {
  //
  const node = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState(urlImgDefault);
  //
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !node.current) {
          return;
        } else {
          setCurrentSrc(src);
        }
      });
    });

    if (node.current) {
      observer.observe(node.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [src]);

  //
  return <img ref={node} src={currentSrc} {...imgProps} />;
};

export default LazeImage;
