import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CurrencyDropDown from "./Dropdowns";
import axios from "axios";

const Converter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1); // amount which must be converted
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null); // result of converting
 

  const fetchCurrencies = async () => {
    try {
      const res = await axios.get("https://www.frankfurter.app/currencies");
      const data = await res.data;    //  conversion answers to data format
      setCurrencies(Object.keys(data)); //  conversion  objects to array
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  console.log(currencies); // just checking dates
  const convertCurrency = async () => {
    if (!amount) {
      return;
    }

    try {
      const res = await axios.get(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json(); // conversion to json format
      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency); // converted amount + converted Currency 
    } catch (error) {
      console.error("Error fetching:", error);
    } 
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-slate-300 rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>

      <div className="grid grid-cols-1  sm:grid-cols-3 gap-3 items-center ">
        <CurrencyDropDown
          currencies={currencies}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          title="From:"
        />
        <div className="flex justify-center">
          <button
            onClick={swapCurrencies}
            className=" p-1 font-semibold bg bg-gray-400 rounded-lg cursor-pointer hover:bg-gray-500"
          >
            Swap
          </button>
        </div>
        <CurrencyDropDown
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          title="To:"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-green-700"
        >
          Amount:{" "}
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="w-full p-2  border border-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2"
        ></input>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >  Convert
        </button>
      </div>
      {convertedAmount && (   //condition && expression   if condition don't have undefined or null value ,  expression will be done  
        <div className="mt-4 text-lg font-medium ">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default Converter;
