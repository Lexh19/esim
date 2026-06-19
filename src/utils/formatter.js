/**
 * Formats a number into Indonesian Rupiah currency format.
 * @param {number} value - The number to format
 * @param {boolean} showDecimals - Whether to display decimal places (,00)
 * @returns {string} Formatted price string
 */
export const formatPrice = (value, showDecimals = false) => {
  if (value === undefined || value === null) return 'Rp0';
  
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(value);

  // Replace IDR with Rp
  return formatted.replace('IDR', 'Rp').trim();
};
