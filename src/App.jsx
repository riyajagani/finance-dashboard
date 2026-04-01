import { useState } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import { useSidebar } from './hooks/useSidebar';
import { useFinance } from './context/FinanceContext';
import TransactionModal from './components/ui/TransactionModal';
import ConfirmDialog from './components/ui/ConfirmDialog';
import Toast from './components/ui/Toast';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const { collapsed, toggle, mobileOpen, openMobile, closeMobile } = useSidebar();
  
  // App now becomes incredibly thin, purely delegating logic to context.
  const { 
    modalOpen, closeModal, saveForm, editingTxn,
    confirmOpen, closeConfirm, confirmDeleteAction,
    toast, setToast
  } = useFinance();

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':    return <Dashboard />;
      case 'transactions': return <Transactions />;
      case 'insights':     return <Insights />;
      default:             return <Dashboard />;
    }
  };

  return (
    <>
      <Layout
        activePage={activePage}
        onNavigate={setActivePage}
        collapsed={collapsed}
        onToggle={toggle}
        mobileOpen={mobileOpen}
        onOpenMobile={openMobile}
        onCloseMobile={closeMobile}
      >
        {renderPage()}
      </Layout>

      {/* Global Overlays */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={saveForm}
        initialData={editingTxn}
      />
      
      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Transaction"
        description="Are you sure you want to delete this transaction? This action cannot be undone."
        onConfirm={confirmDeleteAction}
        onCancel={closeConfirm}
      />
      
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </>
  );
}
