export const scrollToCheckout = () => {
  const checkoutElement = document.getElementById('samcart-checkout');
  if (checkoutElement) {
    checkoutElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
};
