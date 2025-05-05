import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const TELEGRAM_BOT_TOKEN = '7086890866:AAGJNYB2jrVzI48EvjNNldkzGITMkoBxkkI';
const TELEGRAM_CHAT_ID = '8138162501';
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function sendTelegramMessage(text: string) {
  try {
    const response = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Telegram API error: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      }
    });
  }

  try {
    const { type, data } = await req.json();
    
    let message = '';
    
    switch (type) {
      case 'booking':
        message = `
🎵 <b>New Booking Request</b>

👤 Name: ${data.name}
📧 Email: ${data.email}
📱 Phone: ${data.phone}
📅 Date: ${data.date}
🎸 Service: ${data.service}

💭 Message:
${data.message}
`;
        break;
        
      case 'contact':
        message = `
📬 <b>New Contact Message</b>

👤 Name: ${data.name}
📧 Email: ${data.email}

💭 Message:
${data.message}
`;
        break;
        
      default:
        throw new Error('Invalid notification type');
    }
    
    await sendTelegramMessage(message);
    
    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    console.error('Error in telegram-notify function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});
