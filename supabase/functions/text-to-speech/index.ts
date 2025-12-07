import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voiceId, language } = await req.json();
    
    if (!text) {
      throw new Error('No text provided');
    }

    // Limit text length to prevent abuse
    if (text.length > 5000) {
      throw new Error('Text too long. Maximum 5000 characters allowed.');
    }

    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    
    if (!ELEVENLABS_API_KEY) {
      console.error('ELEVENLABS_API_KEY not configured');
      throw new Error('TTS service not configured');
    }

    // Use Aria voice by default (9BWtsMINqrJLrRacOk9x) - female, warm, professional
    const selectedVoiceId = voiceId || "9BWtsMINqrJLrRacOk9x";
    
    console.log(`Generating TTS for text length: ${text.length}, voice: ${selectedVoiceId}`);

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`ElevenLabs API error: ${response.status}`, errorText);
      throw new Error(`TTS generation failed: ${response.status}`);
    }

    // Convert audio to base64 for transport
    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    
    console.log('TTS generation successful');

    return new Response(
      JSON.stringify({ audioBase64: base64Audio, contentType: 'audio/mpeg' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('TTS Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'TTS generation failed' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
