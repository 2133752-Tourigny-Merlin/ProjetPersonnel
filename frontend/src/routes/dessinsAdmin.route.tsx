import DessinsAdmin from '../components/admin/dessinsAdmin.composants';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

export const DessinsAdminRoute = () => {
const [user, loading] = useAuthState(auth);
const navigate = useNavigate();

useEffect(() => {
    // si loading = true, ça veut dire que le firebase n'est pas encore prêt.
    if (loading) return;
    // si user est null, l'utilisateur n'est pas authentifié
    if (!user) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [user, loading]);

return <DessinsAdmin />;
};