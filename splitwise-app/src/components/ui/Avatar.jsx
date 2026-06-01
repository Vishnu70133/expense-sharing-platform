const colors = [
  "from-brand-500 to-green-600",
  "from-blue-500 to-cyan-600",
  "from-purple-500 to-pink-600",
  "from-orange-500 to-red-600",
  "from-yellow-500 to-amber-600",
];

const Avatar = ({ name = "?", size = "md", className = "" }) => {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const colorIndex = name.charCodeAt(0) % colors.length;
  const sizes = { xs: "w-6 h-6 text-xs", sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-12 h-12 text-base", xl: "w-16 h-16 text-xl" };
  return (
    <div className={`${sizes[size]} rounded-xl bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center font-display font-bold text-white shrink-0 ${className}`}>
      {initials}
    </div>
  );
};

export default Avatar;
