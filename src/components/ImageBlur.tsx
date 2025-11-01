import Image from "next/image";

export default function ImageBlur({
  src,
  classname,
  width = 200,
  height = 200,
}: {
  src: string;
  classname?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div>
      <Image
        src={src}
        width={width}
        height={height}
        alt="My Picture Blurred"
        className={`rounded-3xl blur-md scale-110 ${classname}`} // افکت بلور و کمی بزرگتر
        data-parallax-item
        data-strength="3" // حرکت سریع
      />
      {/* ۳. عکس اصلی روی سایه با حرکت آرام‌تر */}
      <Image
        src={src}
        width={width}
        height={height}
        alt="My Picture"
        className={`rounded-3xl ${classname}`}
        data-parallax-item
        data-strength="2" // حرکت آرام
      />
    </div>
  );
}
