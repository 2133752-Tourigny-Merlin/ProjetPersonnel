import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { auth } from '../firebase';
import Modifier from '../components/admin/modifier.composants';

export const ModifierRoute = () => {
const { _id } = useParams<{ _id: string }>();
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate('/');
  }, [user, loading, navigate]);

  if (!_id) {
    return <p>No project ID provided</p>;
  }

  return <Modifier />;
};
