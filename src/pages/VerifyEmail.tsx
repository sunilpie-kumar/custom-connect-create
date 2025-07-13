import { useEffect, useState } from 'react';

const VerifyEmail = () => {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');

    fetch(`/api/v1/providers/verify-email?token=${token}&email=${encodeURIComponent(email)}`)
      .then(res => {
        if (res.ok) setStatus('success');
        else setStatus('error');
      })
      .catch(() => setStatus('error'));
  }, []);

  if (status === 'verifying') return <div>Verifying your email...</div>;
  if (status === 'success') return <div>Email verified! You can now log in.</div>;
  return <div>Verification failed or link expired.</div>;
};

export default VerifyEmail; 