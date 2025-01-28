import { ReactNode } from "react";

interface CardContainerProps {
  children: ReactNode;
}

export default function CardContainer({ children }: CardContainerProps) {
  return (
    <div className="border-gray-200 bg-white px-4 py-3 mb-4 rounded-md shadow-md">
      {children}
    </div>
  );
}
