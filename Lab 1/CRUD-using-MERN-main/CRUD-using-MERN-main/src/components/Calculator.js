import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Calculator = () => {
  const [credentials, setCredentials] = useState({ operand1: '', operand2: '', operation: '+' });
  const [calculations, setCalculations] = useState([]);

  //The `useEffect` hook is used to load any previously saved calculations from a cookie when the component mounts.
  useEffect(() => {
    // uses the `Cookies` library to save the calculation history in a cookie named `"calculatorCalculations"`. This allows the calculations to persist even after the user refreshes the page or closes the browser.
    const savedCalculations = Cookies.get('calculatorCalculations');
    if (savedCalculations) {
      setCalculations(JSON.parse(savedCalculations));
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = () => {
    let result = 0;
    if (credentials.operation === '+') {
      result = Number(credentials.operand1) + Number(credentials.operand2);
    } else if (credentials.operation === '-') {
      result = Number(credentials.operand1) - Number(credentials.operand2);
    }
    else if (credentials.operation === '*') {
      result = Number(credentials.operand1) * Number(credentials.operand2);
    }
    else if (credentials.operation === '/') {
      result = Number(credentials.operand1) / Number(credentials.operand2);
    }

    // Save the current calculation in the calculations array
    const newCalculation = {
      operand1: credentials.operand1,
      operand2: credentials.operand2,
      operation: credentials.operation,
      result
    };

    // Update the state with the new calculation
    setCalculations([...calculations, newCalculation]);

    // Saves all calculations in the cookie
    Cookies.set('calculatorCalculations', JSON.stringify([...calculations, newCalculation]));

    // Clear the input fields
    setCredentials({ operand1: '', operand2: '', operation: '' });
  }

  return (
    <>
      <div className='calcMain'>
        <div className='calcContainer'>
          <div className='operandMain'>
            <label htmlFor='operand1'>Operand 1</label>
            <input value={credentials.operand1} onChange={handleChange} name='operand1' id='operand1' type='number' className='operand' />
          </div>
          <div className='operandMain'>
            <label htmlFor='operation'>Operation</label>
            <select value={credentials.operation} onChange={handleChange} name='operation' id='operation'>
              <option value='+'>+</option>
              <option value='-'>-</option>
              <option value='*'>*</option>
              <option value='/'>/</option>
            </select>
          </div>
          <div className='operandMain'>
            <label htmlFor='operand2'>Operand 2</label>
            <input value={credentials.operand2} onChange={handleChange} name='operand2' id='operand2' type='number' className='operand' />
          </div>
          <div className='cal-btn-Main'>
            <button onClick={handleSubmit} className='btn'>
              CALCULATE
            </button>
          </div>
        </div>
      </div>

      <div className='tableContainer'>
        <table>
          <thead>
            <tr>
              <th>Operand 1</th>
              <th>Operation</th>
              <th>Operand 2</th>
              <th>Calculation</th>
            </tr>
          </thead>
          <tbody>
  {calculations.map((calculation, index) => (
    <tr key={index}>
      <td>{calculation.operand1}</td>
      <td>{calculation.operation}</td>
      <td>{calculation.operand2}</td>
      <td>{Number(calculation.result).toFixed(2)}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </>
  );
}

export default Calculator;
