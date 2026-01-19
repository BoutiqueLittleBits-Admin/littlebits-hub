// app/api/checkout/route.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { items, shippingRate, shippingAddress } = await request.json();

    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => {
      return sum + (parseFloat(item.price) * item.quantity);
    }, 0);

    // Determine shipping cost (FREE over $50)
    let shippingCost = 0;
    let shippingLabel = 'FREE Shipping';
    
    if (subtotal < 50 && shippingRate) {
      shippingCost = shippingRate.price;
      shippingLabel = `${shippingRate.service} (${shippingRate.estimatedDays} days)`;
    }

    // Build line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(parseFloat(item.price) * 100),
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item if not free
    if (shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Shipping - ${shippingLabel}`,
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.boutiquelittlebits.com'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.boutiquelittlebits.com'}/cart`,
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      metadata: {
        shippingService: shippingRate?.service || 'FREE',
        shippingCost: shippingCost.toString(),
        packageType: shippingRate?.packageType || 'standard',
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
