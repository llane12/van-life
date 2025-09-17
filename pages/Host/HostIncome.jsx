import { useState, useEffect } from "react";

import incomeImageUrl from "../../assets/images/income.png";
import { getHostAllTransactions } from "./api";
import "./host.css";

export default function HostIncome() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // TOOD: Hard-coded host Id
    const hostId = "123";

    useEffect(() => {
        async function getTransactions() {
            try {
                const data = await getHostAllTransactions(hostId);
                setTransactions(data);
                setError(null);
            } catch (err) {
                console.log(err);
                setError(err);
            }
            setLoading(false);
        }
        getTransactions();
    }, []);

    const total = transactions.reduce((sum, transaction) => {
        return sum + transaction.amount;
    }, 0);

    const transactionElements = transactions.map(transaction => (
        <li key={transaction.id} className="host-income-transaction-card">
            <p>{`$${transaction.amount}`}</p>
            <p>{transaction.date}</p>
        </li>
    ));    

    function renderPlaceholder() {
        if (loading) {
            return <h2 aria-live="polite">Loading...</h2>;
        } else if (error) {
            return <h2 aria-live="assertive">Unable to load transactions</h2>;
        } else {
            return null;
        }
    }

    return (
        <div className="host-income-container">
            <h1>Income</h1>
            <p className="host-income-period">Last <span>30 days</span></p>
            {renderPlaceholder() ?? (<p className="host-income-total">{`$${total}`}</p>)}
            <img src={incomeImageUrl} />
            <div className="host-income-transactions-card">
                <p className="host-income-transactions-title">Your transactions {(loading || error) ? "" : `(${transactions.length})`}</p>
                <p className="host-income-period">Last <span>30 days</span></p>
            </div>
            <ul className="host-income-transactions-list">
                {renderPlaceholder() ?? transactionElements}
            </ul>
        </div>
    );
}
