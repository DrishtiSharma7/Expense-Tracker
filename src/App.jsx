import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import ExpenseForm from "./components/ExpenseForm";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";

import useExpenses from "./hooks/useExpenses";

import { fetchExpensesFromApi } from "./services/mockApi";

function App() {
  // ------------------------------------------------------------
  // 2a. STATE – everything the app needs to remember
  // ------------------------------------------------------------

  // Which page is currently visible? (Dashboard, Transactions, Reports)
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Should the "Add / Edit" modal be open?
  const [isModalOpen, setIsModalOpen] = useState(false);

  // On mobile, the sidebar is hidden behind a hamburger menu.
  // This toggles its visibility.
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Which expense are we editing? null means we are adding a new one.
  const [editingExpense, setEditingExpense] = useState(null);

  // All expenses, plus functions to add, update, delete, and replace them.
  // These come from our custom hook (which uses localStorage).
  const { expenses, addExpense, updateExpense, deleteExpense, setExpenses } =
    useExpenses();

  // ------------------------------------------------------------
  // 2b. EFFECTS – things that happen automatically
  // ------------------------------------------------------------

  // On first mount, if we have no expenses yet, fetch some sample data
  // from the mock API and store it.
  useEffect(() => {
    if (expenses.length === 0) {
      fetchExpensesFromApi().then((data) => {
        // Only set if we actually got data back
        if (data?.length) {
          setExpenses(data);
        }
      });
    }
    // The empty dependency array [] means this runs only once, when the
    // component first mounts. We intentionally omit 'expenses' and 'setExpenses'
    // to avoid re‑running the effect every time they change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ------------------------------------------------------------
  // 2c. EVENT HANDLERS – functions that respond to user actions
  // ------------------------------------------------------------

  /**
   * Clears ALL expenses from the app (and localStorage).
   * Called from the Settings page (via a prop).
   */
  const handleClearData = () => {
    setExpenses([]);
  };

  /**
   * Opens the modal in "edit" mode for a specific expense.
   * The modal will show the form pre‑filled with that expense's data.
   */
  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  /**
   * Closes the modal and resets the "editing" state.
   * Used when the user clicks Cancel or after a successful save.
   */
  const handleCloseModal = () => {
    setEditingExpense(null);
    setIsModalOpen(false);
  };

  /**
   * Opens the modal in "add" mode (empty form).
   * Used when the user clicks the "+ Add" button.
   */
  const handleOpenAddModal = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  // ------------------------------------------------------------
  // 2d. PAGE RENDERER – decides which page to show based on activeTab
  // ------------------------------------------------------------

  /**
   * Renders the correct page component and passes it the props it needs.
   * - Dashboard: needs expenses + a way to open the modal + navigate to Transactions
   * - Transactions: needs expenses + delete/edit functions + a way to open the modal
   * - Reports: only needs expenses to build charts
   */
  function renderPage() {
    switch (activeTab) {
      case "Dashboard":
        return (
          <Dashboard
            expenses={expenses}
            onOpenAddModal={handleOpenAddModal}
            goToTransactions={() => setActiveTab("Transactions")}
          />
        );

      case "Transactions":
        return (
          <Transactions
            expenses={expenses}
            onDelete={deleteExpense}
            onEdit={handleEdit}
            onOpenAddModal={handleOpenAddModal}
          />
        );

      case "Reports":
        return <Reports expenses={expenses} />;

      default:
        return null; // fallback, should never happen
    }
  }

  // ------------------------------------------------------------
  // 2e. RENDER – the actual JSX that appears on screen
  // ------------------------------------------------------------

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 
        SIDEBAR – visible on large screens, hidden behind a hamburger on mobile.
        It receives the current tab and a function to change it.
      */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main content area – takes the remaining width */}
      <div className="flex-1 flex flex-col">
        {/* 
          MOBILE HEADER – only shows on small screens (< lg).
          Contains the hamburger button and the app name.
        */}
        <header className="lg:hidden flex items-center gap-4 bg-white shadow px-4 py-4 sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={28} />
          </button>
          <h1 className="text-lg font-semibold">SpendWise</h1>
        </header>

        {/* 
          MAIN CONTENT – the actual page (Dashboard, Transactions, or Reports).
          Padding adjusts responsively.
        */}
        <main className="flex-1 p-4 md:p-6">{renderPage()}</main>
      </div>

      {/* 
        MODAL – pops up over everything else.
        It is controlled by isModalOpen and displays the ExpenseForm inside.
      */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingExpense ? "Edit Transaction" : "Add Transaction"}
      >
        <ExpenseForm
          addExpense={addExpense}
          updateExpense={updateExpense}
          editingExpense={editingExpense}
          onDone={handleCloseModal} // closes the modal after save/cancel
        />
      </Modal>
    </div>
  );
}

// ============================================================
// 3. EXPORT – makes this component available to other files
// ============================================================
export default App;