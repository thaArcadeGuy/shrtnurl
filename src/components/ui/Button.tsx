interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({ 
  children, 
  variant = "primary",
  size = "md", 
  onClick,
  className="",
  disabled = false,
}: ButtonProps) {
  const variants = {
    primary: "bg-[#df2582] text-white hover:bg-[#c01e6f]",
    secondary: "bg-[#FFBF00] text-gray-900 hover:bg-[#e5ac00]",
    outline: "border-2 border-[#A7A8CD] text-gray-700 hover:bg-[#A7A8CD] hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} font-semibold cursor-pointer rounded-lg transition-all duration-200 ${className}`}
    >
      {children}
    </button>
  )
}