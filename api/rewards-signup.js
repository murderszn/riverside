// Vercel API endpoint for Riverside Rewards signup
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, phone, terms } = req.body;

    // Validate required fields
    if (!email || !name || !terms) {
      return res.status(400).json({ 
        error: 'Missing required fields: email, name, and terms agreement are required' 
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Prepare data for PostgREST
    const signupData = {
      email: email.toLowerCase().trim(),
      name: name.trim(),
      phone: phone ? phone.trim() : null,
      terms_accepted: terms,
      signup_date: new Date().toISOString(),
      status: 'pending' // pending, active, etc.
    };

    // PostgREST API endpoint from environment variables
    const postgrestUrl = process.env.POSTGREST_URL;
    const apiKey = process.env.POSTGREST_API_KEY;

    if (!postgrestUrl || !apiKey) {
      console.error('Missing PostgREST configuration');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Insert into PostgREST
    const response = await fetch(`${postgrestUrl}/rewards_signups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'apikey': apiKey,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(signupData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('PostgREST error:', errorText);
      return res.status(500).json({ 
        error: 'Failed to save signup data',
        details: errorText
      });
    }

    // Optional: Send confirmation email (you can integrate with SendGrid, Mailgun, etc.)
    // await sendConfirmationEmail(email, name);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Successfully signed up for Riverside Rewards!',
      data: {
        email: signupData.email,
        name: signupData.name,
        signupDate: signupData.signup_date
      }
    });

  } catch (error) {
    console.error('Rewards signup error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong. Please try again.'
    });
  }
}
