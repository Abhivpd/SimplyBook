import { useEffect } from "react";

type ToastType = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastType) => {
  const backroundColor = type === "SUCCESS" ? "bg-green-600" : "bg-red-600";

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-8 right-8 z-50 p-4 rounded-md text-white max-w-md ${backroundColor}`}
    >
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
