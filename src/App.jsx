import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

// layout pieces
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import ExpenseForm from "./components/ExpenseForm";

// pages
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

// hooks
import useExpenses from "./hooks/useExpenses";

// services
import { fetchExpensesFromApi } from "./services/mockApi";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const { expenses, addExpense, updateExpense, deleteExpense, setExpenses } =
    useExpenses();

  useEffect(() => {
    if (expenses.length === 0) {
      fetchExpensesFromApi().then((data) => {
        if (data?.length) {
          setExpenses(data);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClearData = () => {
    setExpenses([]);
  };

  const handleEdit = (expense) => {
  setEditingExpense(expense);
  setIsModalOpen(true);
};

  function renderPage() {
    if (activeTab === "Dashboard") {
      return (
        <Dashboard
          expenses={expenses}
          onOpenAddModal={() => setIsModalOpen(true)}
          goToTransactions={() => setActiveTab("Transactions")}
        />
      );
    }

    if (activeTab === "Transactions") {
      return (
        <Transactions
          expenses={expenses}
          onDelete={deleteExpense}
          onEdit={handleEdit}
          onOpenAddModal={() => {
            setEditingExpense(null);
            setIsModalOpen(true);
          }}
        />
      );
    }

    if (activeTab === "Reports") {
      return <Reports expenses={expenses} />;
    }

    if (activeTab === "Settings") {
      return <Settings onClearData={handleClearData} />;
    }

    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center gap-4 bg-white shadow px-4 py-4 sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={28} />
          </button>

          <h1 className="text-lg font-semibold">SpendWise</h1>
        </header>

        <main className="flex-1 p-4 md:p-6">{renderPage()}</main>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingExpense ? "Edit Transaction" : "Add Transaction"}
      >
        <ExpenseForm
  addExpense={addExpense}
  updateExpense={updateExpense}
  editingExpense={editingExpense}
  onDone={() => {
    setEditingExpense(null);
    setIsModalOpen(false);
  }}
/>
      </Modal>
    </div>
  );
}

export default App;
