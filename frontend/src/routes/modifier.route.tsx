import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from '../firebase';
import Modifier from '../components/admin/modifier.composants';

export const ModifierRoute = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    // si loading = true, ça veut dire que le firebase n'est pas encore prêt.
    if (loading) return;
    // si user est null, l'utilisateur n'est pas authentifié
    if (!user) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, navigate]);

  return <Modifier />;
};
