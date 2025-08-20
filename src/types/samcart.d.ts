declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sc-checkout': {
        product: string;
        subdomain: string;
        coupon: string;
      };
    }
  }
}

export {};
