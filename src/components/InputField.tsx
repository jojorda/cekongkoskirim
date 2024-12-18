"use client";

import React, { useState } from 'react';
import styles from '../styles/ShippingCost.module.scss';

// Komponen Reusable untuk Input
const InputField = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder 
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) => (
  <div className={styles.inputContainer}>
    <label className={styles.label}>{label}</label>
    <input 
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.input}
    />
  </div>
);

// Komponen Utama
const ShippingCostCalculator: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [courier, setCourier] = useState('');
  const [showResults, setShowResults] = useState(false);

  const staticShippingCosts = [
    {
      service: "REG",
      description: "Layanan Regular",
      cost: [{ value: 50000, etd: "2-3" }]
    },
    {
      service: "EXPRESS",
      description: "Layanan Express",
      cost: [{ value: 75000, etd: "1" }]
    },
    {
      service: "EKONOMI",
      description: "Layanan Ekonomi",
      cost: [{ value: 35000, etd: "3-4" }]
    }
  ];

  const handleCalculate = () => {
    setShowResults(true);
  };

  const renderShippingResults = () => {
    if (!showResults) return null;
    
    return (
      <div className={styles.resultContainer}>
        {staticShippingCosts.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <h3>{service.service}</h3>
            <p>Deskripsi: {service.description}</p>
            <p>Biaya: Rp {service.cost[0].value.toLocaleString()}</p>
            <p>Estimasi Pengiriman: {service.cost[0].etd} hari</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <h1>Cek Ongkos Kirim</h1>
      <div className={styles.formContainer}>
        <InputField 
          label="Kota Asal" 
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Masukkan kota asal"
        />
        <InputField 
          label="Kota Tujuan" 
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Masukkan kota tujuan"
        />
        <InputField 
          label="Berat (gram)" 
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Masukkan berat kiriman"
        />
        <InputField 
          label="Kurir" 
          value={courier}
          onChange={(e) => setCourier(e.target.value)}
          placeholder="Masukkan nama kurir"
        />
        <button 
          className={styles.button}
          onClick={handleCalculate}
        >
          Hitung Ongkos Kirim
        </button>
      </div>
      {renderShippingResults()}
    </div>
  );
};

export default ShippingCostCalculator;