
exports.calculateIncomeTax = (taxableIncome) => {
    if (taxableIncome <= 2000) return 0;
    if (taxableIncome <= 4000) return (taxableIncome * 0.15) - 300;
    if (taxableIncome <= 7000) return (taxableIncome * 0.20) - 500;
    if (taxableIncome <= 10000) return (taxableIncome * 0.25) - 850;
    if (taxableIncome <= 14000) return (taxableIncome * 0.30) - 1350;
    return (taxableIncome * 0.35) - 2050;
};

exports.calculateTaxableIncome = (basicSalary, transportAllowance, mobileAllowance, unpaidDeduction) => {
    const adjustedBasic = Math.max(0, basicSalary - unpaidDeduction);
    
    const taxableTransport = transportAllowance > 600 ? transportAllowance - 600 : 0;
    
    const taxableIncome = adjustedBasic + taxableTransport + mobileAllowance;
    return Math.max(0, taxableIncome);
};