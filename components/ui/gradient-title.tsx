import React from "react";

type gradientTitleProps = {
  children: React.ReactNode;
  element: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
  className?: string;
};

function GradientTitle({
  children,
  element,
  className = "",
}: gradientTitleProps) {
  const Element = element;
  return (
    <Element
      className={
        "relative text-transparent bg-clip-text bg-ggw-gradient" + className
      }
    >
      {children}
    </Element>
  );
}

export default GradientTitle;
