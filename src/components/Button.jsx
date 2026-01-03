export const Button = ({ children, variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-800",
    danger: "bg-red-50 hover:bg-red-100 text-red-600",
    success: "bg-emerald-600 hover:bg-emerald-700 text-white"
  };

  return (
    <button 
      className={`px-4 py-2 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50 ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};