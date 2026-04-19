import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions"));
    if (saved) setTransactions(saved);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);    

  const addTransaction = () => {

    if (!text || !amount) return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: parseFloat(amount)
    };

    setTransactions([newTransaction, ...transactions]);

    setText("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expense;

  return (
    <div className="container">

      <h1> Expense tracker App </h1>
      <h2 style={{textAlign:'center',color:'green'}}>Balance: ₹{balance}</h2>

      

      <div className="summary">
        <p>Income: ₹{income}</p>
        <p>Expense: ₹{expense}</p>
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Enter description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter amount (+add,-subtract)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={addTransaction}>
          Add
        </button>
      </div>

      <ul>
        {transactions.map((t) => (
          <li key={t.id}
              className={t.amount > 0 ? "income" : "expense"}>

            {t.text} : ₹{t.amount}

            <button onClick={() => deleteTransaction(t.id)}>
              ❌
            </button>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
