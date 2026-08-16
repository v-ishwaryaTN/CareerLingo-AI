const axios = require('axios');

(async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/resume/analyze', { resumeText: 'Experienced software engineer with 5 years in full-stack development.' }, { headers: { 'Content-Type': 'application/json' }, timeout: 60000 });
    console.log('STATUS', res.status);
    console.log('DATA', JSON.stringify(res.data, null, 2));
  } catch (err) {
    if (err.response) {
      console.error('RESPONSE STATUS', err.response.status);
      console.error('RESPONSE DATA', err.response.data);
    } else {
      console.error('ERROR', err.message);
    }
    process.exit(1);
  }
})();
