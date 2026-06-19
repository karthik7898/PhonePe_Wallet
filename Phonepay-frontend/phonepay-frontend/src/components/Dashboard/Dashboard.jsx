import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const userName = currentUser?.name;
  const userUpi = currentUser?.upiId;

  const [balance, setBalance] = useState(0);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [sendData, setSendData] = useState({ upiId: "", amount: "" });

  // 🔒 Safety check
  useEffect(() => {
    if (!userUpi) {
      alert("UPI not found. Please login again.");
      navigate("/login");
    }
  }, [userUpi, navigate]);

  // 💰 Fetch balance
  const fetchBalance = useCallback(async () => {
    try {
      const res = await API.get(`/wallet/${userUpi}`);
      setBalance(res.data.data.balance);
    } catch {
      alert("Failed to fetch balance");
    }
  }, [userUpi]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  // ➕ Add money
  const handleAddMoney = async () => {
    try {
      await API.post("/wallet/add", {
        upiId: userUpi,
        amount: Number(addAmount),
      });

      alert("Money added successfully");
      setAddAmount("");
      setShowAddMoneyModal(false);
      fetchBalance();

    } catch {
      alert("Failed to add money");
    }
  };

  //  Send money
  const handleSendMoney = async (e) => {
    e.preventDefault();

    try {
      await API.post("/transaction/send", {
        senderUpi: userUpi,
        receiverUpi: sendData.upiId,
        amount: Number(sendData.amount),
      });

      alert("Money sent successfully");
      setSendData({ upiId: "", amount: "" });
      fetchBalance();

    } catch {
      alert("Failed to send money");
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      <header className="dashboard-header">
        <h1>MRU PAY</h1>
        <div>
          <span>Welcome, {userName}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <main>
        <section>
          <h2>Your Balance</h2>
          <p>₹{balance.toFixed(2)}</p>
          <button onClick={() => setShowAddMoneyModal(true)}>Add Money</button>
        </section>

        <section>
          <h2>Send Money</h2>
          <form onSubmit={handleSendMoney}>
            <input
              placeholder="Recipient UPI"
              value={sendData.upiId}
              onChange={(e) => setSendData({ ...sendData, upiId: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              value={sendData.amount}
              onChange={(e) => setSendData({ ...sendData, amount: e.target.value })}
            />
            <button type="submit">Send</button>
          </form>
        </section>
      </main>

      {showAddMoneyModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <input
              type="number"
              placeholder="Enter amount"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
            />
            <button onClick={handleAddMoney}>OK</button>
            <button onClick={() => setShowAddMoneyModal(false)}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
