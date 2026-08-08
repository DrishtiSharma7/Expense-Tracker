import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Settings,
  Wallet,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Transactions", icon: Receipt },
  { name: "Reports", icon: PieChart },
  { name: "Settings", icon: Settings },
];

function Sidebar({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
}) {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          w-64 bg-gray-900 text-gray-300
          h-screen flex flex-col p-4
          transform transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }
          lg:translate-x-0 lg:static lg:flex
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end lg:hidden mb-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 px-2">
          <Wallet className="text-indigo-400" size={22} />
          <span className="font-semibold text-white text-lg">
            SpendWise
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => handleTabClick(item.name)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm text-left transition
                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-800"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="mt-auto flex items-center gap-2 px-2 pt-4 border-t border-gray-800">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
            DS
          </div>

          <div>
            <p className="text-sm text-white leading-none">
              Drishti Sharma
            </p>
            <p className="text-xs text-gray-500">
              User Account
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;