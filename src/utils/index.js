export const formatCurrency = (text = '') => {
  return text.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};