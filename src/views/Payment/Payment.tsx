import React, { useState } from 'react'
import Page from './Page'

import './index.css'

const Payment: React.FC = () => {
  const [currency, setCurrency] = useState('USD')
  const [amount, setAmount] = useState(0.1)

  const onCurrencyChange = (event: any) => {
    setCurrency(event.target.value)
  }

  const onAmountChange = (event: any) => {
    setAmount(event.target.value)
  }

  const onBtnClick = () => {
    // alert(`Currency: ${currency} Amount: ${amount}`)
  }

  return (
    <Page>
      <div style={{ display: 'flex', marginTop: '200px' }}>
        <select value={currency} onChange={onCurrencyChange} className="minimal">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
        </select>

        <input type="number" value={amount} onChange={onAmountChange} />
        <button type="button" onClick={onBtnClick}>
          Button
        </button>
      </div>
    </Page>
  )
}

export default Payment
