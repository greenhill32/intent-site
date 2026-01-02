module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // WooCommerce credentials
  const WOO_URL = 'https://ecom-greenhill3222-zvwqy.wpcomstaging.com';
  const CONSUMER_KEY = 'ck_30afd36784141d5487844ea28009eca4b7306f7b';
  const CONSUMER_SECRET = 'cs_d496139f55d6070d3a918d8677ce791c44b74e72';

  // Get endpoint from query param (e.g., ?endpoint=/wp-json/wc/v3/products)
  const endpoint = req.query.endpoint || '/wp-json/wc/v3/products';
  
  // Build full WooCommerce URL
  const fullUrl = new URL(WOO_URL + endpoint);
  
  // Add any query params from the agent request
  if (req.query) {
    Object.entries(req.query).forEach(([key, value]) => {
      if (key !== 'endpoint') {
        fullUrl.searchParams.append(key, value);
      }
    });
  }

  // Create Basic Auth header
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');

  try {
    const response = await fetch(fullUrl.toString(), {
      method: req.method || 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: req.body ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();

    // Log the request (optional, for debugging)
    console.log(`[AGENT_REQUEST] ${req.method} ${endpoint} - ${response.status}`);

    return res.status(response.status).json(data);
  } catch (error) {
    console.error('[PROXY_ERROR]', error.message);
    return res.status(500).json({
      error: 'Proxy request failed',
      message: error.message,
    });
  }
};
