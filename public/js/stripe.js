const stripe = Stripe(
  'pk_test_51IM8elDdycUvq4GDf8qIVp8wy30EtrYwknJZ1uv1uLiqHx9lGR0yppnqj4pDzITVDL1pCNtfNRvfz7VtQqQCHIzT0088gLEqDY'
);
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios({
      method: 'GET',
      url: `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    });
    console.log(session);
    console.log();
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
