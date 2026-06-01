const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
    {Icon && (
      <div className="w-16 h-16 rounded-2xl bg-slate-700/50 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-slate-500" />
      </div>
    )}
    <h3 className="font-display font-semibold text-lg text-slate-300 mb-1">{title}</h3>
    {description && <p className="text-slate-500 text-sm mb-6 max-w-xs">{description}</p>}
    {action}
  </div>
);

export default EmptyState;
