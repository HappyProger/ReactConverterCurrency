import React from "react";

const CurrencyDropDown = ({
  currencies,
  currency,          // props
  setCurrency,
  title = "",
}) => {
  return (
    <div>
      <label htmlFor={title} 
      className="block text-lg font-medium text-gray-950">{title}</label>
      <div>
        <select value={currency}
        onChange={(e)=>{setCurrency(e.target.value)}}   // e is event that gets the value of the selected element
        className="w-full p-2  border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
          {" "}
          {currencies.map((currency) => {
            return (
              <option value={currency} key={currency}>
                {" "}
                {currency}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
export default CurrencyDropDown;
