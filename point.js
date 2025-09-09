import React, { useState, useMemo } from 'react';

// Mock data to simulate fetching from an API.
const MOCK_VOUCHERS = [
  {
    id: '1',
    brandName: 'Caring Pharmacy',
    brandLogoUrl: 'https://placehold.co/100x50/34D399/FFFFFF?text=Logo',
    voucherName: 'Caring Pharmacy E-Voucher',
    voucherValue: 'RM 50',
    pointTiers: [{ points: 5000, code: 'CP50' }],
    category: 'Healthcare',
  },
  {
    id: '2',
    brandName: 'Starbucks',
    brandLogoUrl: 'https://placehold.co/100x50/00704A/FFFFFF?text=Logo',
    voucherName: 'Starbucks Coffee Voucher',
    voucherValue: 'RM 10',
    pointTiers: [{ points: 1500, code: 'SB10' }],
    category: 'Food & Beverage',
  },
  {
    id: '3',
    brandName: 'Shopee',
    brandLogoUrl: 'https://placehold.co/100x50/F53D2D/FFFFFF?text=Logo',
    voucherName: 'Shopee E-Voucher',
    voucherValue: 'RM 100',
    pointTiers: [{ points: 9500, code: 'SP100' }],
    category: 'Shopping',
  },
  {
    id: '4',
    brandName: 'TGV Cinemas',
    brandLogoUrl: 'https://placehold.co/100x50/000000/FFFFFF?text=Logo',
    voucherName: 'TGV Cinemas Movie Ticket',
    voucherValue: '1 Ticket',
    pointTiers: [{ points: 3000, code: 'TGV1' }],
    category: 'Entertainment',
  },
  {
    id: '5',
    brandName: 'Zalora',
    brandLogoUrl: 'https://placehold.co/100x50/C67D6F/FFFFFF?text=Logo',
    voucherName: 'Zalora Gift Card',
    voucherValue: 'RM 200',
    pointTiers: [{ points: 18000, code: 'ZL200' }],
    category: 'Shopping',
  },
  {
    id: '6',
    brandName: 'GrabFood',
    brandLogoUrl: 'https://placehold.co/100x50/00B140/FFFFFF?text=Logo',
    voucherName: 'GrabFood Voucher',
    voucherValue: 'RM 20',
    pointTiers: [{ points: 2500, code: 'GRAB20' }],
    category: 'Food & Beverage',
  },
  {
    id: '7',
    brandName: 'Watsons',
    brandLogoUrl: 'https://placehold.co/100x50/003399/FFFFFF?text=Logo',
    voucherName: 'Watsons E-Voucher',
    voucherValue: 'RM 30',
    pointTiers: [{ points: 3500, code: 'WT30' }],
    category: 'Healthcare',
  },
  {
    id: '8',
    brandName: 'Lazada',
    brandLogoUrl: 'https://placehold.co/100x50/1C0F66/FFFFFF?text=Logo',
    voucherName: 'Lazada E-Voucher',
    voucherValue: 'RM 50',
    pointTiers: [{ points: 4500, code: 'LZD50' }],
    category: 'Shopping',
  },
];

// Helper component for a single voucher card.
const VoucherCard = ({ voucher }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Brand Logo and Name */}
      <div className="w-24 h-12 mb-4 flex items-center justify-center">
        <img
          src={voucher.brandLogoUrl}
          alt={`${voucher.brandName} Logo`}
          className="max-h-full max-w-full rounded"
          onError={(e) => { e.target.src = 'https://placehold.co/100x50/E2E8F0/A0AEC0?text=Logo'; }} // Fallback
        />
      </div>
      <h3 className="font-semibold text-lg text-gray-800 mb-2">{voucher.voucherName}</h3>
      <p className="text-gray-600 mb-4">{voucher.voucherValue}</p>

      {/* Points Tiers */}
      <div className="w-full bg-gray-100 rounded-lg p-3 mt-auto">
        <p className="text-sm font-medium text-gray-700">Redeem with:</p>
        {voucher.pointTiers.map((tier, index) => (
          <div key={index} className="flex items-center justify-center mt-1">
            <span className="text-blue-600 font-bold text-lg">{tier.points}</span>
            <span className="text-gray-500 text-sm ml-2">Points</span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button
        className="mt-6 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => alert(`Redeem functionality for ${voucher.voucherName}`)}
      >
        Redeem Now
      </button>
    </div>
  );
};

// Main page component
const RewardsPage = () => {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('low-to-high');

  // Use useMemo to efficiently filter and sort the vouchers.
  const filteredAndSortedVouchers = useMemo(() => {
    let result = [...MOCK_VOUCHERS];

    // Apply category filter
    if (filter !== 'all') {
      result = result.filter(v => v.category === filter);
    }

    // Apply points sort
    if (sort === 'low-to-high') {
      result.sort((a, b) => a.pointTiers[0].points - b.pointTiers[0].points);
    } else if (sort === 'high-to-low') {
      result.sort((a, b) => b.pointTiers[0].points - a.pointTiers[0].points);
    }

    return result;
  }, [filter, sort]);

  // Alert function to replace 'alert()'
  const showAlert = (message) => {
    // You'd replace this with a custom modal component in a real app.
    console.log(message);
    window.alert(message);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased text-gray-900 p-6 sm:p-8 md:p-12">
      <style>{`
        body { font-family: 'Inter', sans-serif; }
      `}</style>
      <div className="max-w-7xl mx-auto">
        {/* Page Title and Filter/Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 md:mb-0">
            Rewards Redemption
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Filter */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 rounded-lg py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="all">All Categories</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Shopping">Shopping</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Entertainment">Entertainment</option>
            </select>
            {/* Sort Order */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 rounded-lg py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="low-to-high">Points: Low to High</option>
              <option value="high-to-low">Points: High to Low</option>
            </select>
          </div>
        </div>

        {/* Vouchers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedVouchers.map((voucher) => (
            <VoucherCard key={voucher.id} voucher={voucher} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredAndSortedVouchers.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            <p>No vouchers found for the selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardsPage;
