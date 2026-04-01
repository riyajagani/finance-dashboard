import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { transactions as initialTransactions } from '../data/mockData';

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  // 1. Role State
  const [role, setRole] = useState('Admin');

  // 2. Transactions Data State
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransactions(initialTransactions);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const addTransaction = (txn) => {
    setTransactions(prev => [{ ...txn, id: `txn-${Date.now()}` }, ...prev]);
  };
  const editTransaction = (txn) => {
    setTransactions(prev => prev.map(t => t.id === txn.id ? txn : t));
  };
  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  // 3. Filters & Search State
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ field: 'date', dir: 'desc' });

  const hasFilters = search !== '' || category !== 'All' || typeFilter !== 'all';

  const resetFilters = () => {
    setSearch('');
    setCategory('All');
    setTypeFilter('all');
    setSortConfig({ field: 'date', dir: 'desc' });
  };

  const setSort = (field) => {
    setSortConfig(prev =>
      prev.field === field
        ? { field, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { field, dir: 'desc' }
    );
  };

  // Memoized filtered & sorted transactions
  const processedTransactions = useMemo(() => {
    let data = transactions.filter(txn => {
      const q = search.toLowerCase();
      const matchSearch = !q || txn.name.toLowerCase().includes(q) || txn.category.toLowerCase().includes(q);
      const matchCategory = category === 'All' || txn.category === category;
      const matchType = typeFilter === 'all' || txn.type === typeFilter;
      return matchSearch && matchCategory && matchType;
    });

    data = [...data].sort((a, b) => {
      if (sortConfig.field === 'date') {
        const diff = new Date(a.date) - new Date(b.date);
        return sortConfig.dir === 'asc' ? diff : -diff;
      }
      if (sortConfig.field === 'amount') {
        const diff = Math.abs(a.amount) - Math.abs(b.amount);
        return sortConfig.dir === 'asc' ? diff : -diff;
      }
      return 0;
    });

    return data;
  }, [search, category, typeFilter, sortConfig, transactions]);

  // 4. Global UI & Overlay Action State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTxn, setEditingTxn] = useState(null);
  
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingTxnId, setDeletingTxnId] = useState(null);

  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => setToast({ message, type });

  const openAdd = () => { setEditingTxn(null); setModalOpen(true); };
  const openEdit = (txn) => { setEditingTxn(txn); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  const saveForm = (txnData) => {
    if (editingTxn) {
      editTransaction(txnData);
      showToast('Transaction updated successfully');
    } else {
      addTransaction(txnData);
      showToast('Transaction added successfully');
    }
    setModalOpen(false);
  };

  const openDelete = (id) => { setDeletingTxnId(id); setConfirmOpen(true); };
  const closeConfirm = () => setConfirmOpen(false);
  
  const confirmDeleteAction = () => {
    deleteTransaction(deletingTxnId);
    setConfirmOpen(false);
    showToast('Transaction deleted', 'error');
  };

  // 5. Theme & Export
  const [theme, setTheme] = useState(() => localStorage.getItem('zorvyn_theme') || 'dark');
  useEffect(() => {
    if (theme === 'light') document.documentElement.classList.add('light-mode');
    else document.documentElement.classList.remove('light-mode');
    localStorage.setItem('zorvyn_theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const exportCSV = () => {
    const headers = ['ID', 'Merchant', 'Category', 'Type', 'Date', 'Amount', 'Status'];
    const rows = processedTransactions.map(t => 
      [t.id, `"${t.name}"`, t.category, t.type, t.date, t.amount, t.status].join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('CSV Exported Successfully');
  };

  const value = {
    role, setRole, theme, toggleTheme,
    transactions, processedTransactions, exportCSV,
    search, setSearch, category, setCategory, typeFilter, setTypeFilter,
    sortConfig, setSort, hasFilters, resetFilters,
    
    // UI Logic
    modalOpen, editingTxn, openAdd, openEdit, closeModal, saveForm,
    confirmOpen, openDelete, closeConfirm, confirmDeleteAction,
    toast, setToast, isLoading
  };

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance must be used within a FinanceProvider');
  return context;
}
