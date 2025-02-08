import Image, { ImageProps } from "next/image";

interface ImageComponentProps extends ImageProps {
  className?: string;
}

const CLOUDINARY_BASE_URL =
  "https://res.cloudinary.com/ddsvqayb8/image/upload/";
const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  width = 300,
  height = 400,
  className,
}) => {
  let imageUrl: string;

  if (!src || typeof src !== "string") {
    imageUrl = PLACEHOLDER_IMAGE;
  } else if (src.startsWith("http")) {
    imageUrl = src;
  } else if (src.startsWith("v")) {
    imageUrl = `${CLOUDINARY_BASE_URL}${src}`;
  } else {
    imageUrl = src.startsWith("/images/") ? src : `/images/${src}`;
  }

  return (
    <Image
      src={imageUrl}
      alt={alt || "Image"}
      width={width}
      height={height}
      quality={90}
      className={`rounded-lg object-cover ${className || ""}`}
      priority
    />
  );
};

export default ImageComponent;
