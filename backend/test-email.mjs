import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  console.log('🧪 Test envoi email Resend...');
  console.log(`API Key: ${process.env.RESEND_API_KEY?.substring(0,15)}...`);
  console.log('');
  
  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'hachem_alaoui@yahoo.fr',
      subject: 'Test email',
      html: '<p>Ceci est un test</p>'
    });
    
    console.log('✅ Email envoyé!');
    console.log(`ID: ${result.id}`);
  } catch (err) {
    console.log('❌ Erreur:');
    console.log(err.message);
  }
}

test();
