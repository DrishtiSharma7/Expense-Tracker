function Chip({ label, colorClasses, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition
        ${isActive ? "ring-2 ring-offset-1 ring-indigo-500" : ""}
        ${colorClasses}`}
    >
      {label}
    </button>
  );
}

export default Chip;
