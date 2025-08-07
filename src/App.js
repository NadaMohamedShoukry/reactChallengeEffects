// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import React, { useState, useEffect } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [op1, setOp1] = useState("USD");
  const [op2, setOp2] = useState("EUR");
  const [out, setOut] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  function handleInput(input) {
    setAmount(input);
  }
  function handleOP1(input) {
    setOp1(input);
  }
  function handleOP2(input) {
    setOp2(input);
  }
  async function convertCurrency() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${op1}&to=${op2}`
      );
      if (!res.ok) {
        console.log(res);
        console.log("problem");
      }
      const data = await res.json();
      console.log(data.rates[op2]);
      setOut(data.rates[op2]);
    } catch (err) {
      console.log("err");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (op1 === op2) return setOut(amount);
    convertCurrency();
  }, [amount, op1, op2]);
  // console.log(op1);
  // console.log(op2);
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => handleInput(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={op1}
        onChange={(e) => handleOP1(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={op2}
        onChange={(e) => handleOP2(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT</p>
      <p>
        {out} {op2}
      </p>
    </div>
  );
}
