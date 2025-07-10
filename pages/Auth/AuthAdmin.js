import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AuthAdmin = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const [isHydrated, setIsHydrated] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      setIsHydrated(true);

      const token = localStorage.getItem('token');
      const isAdmin = localStorage.getItem('isAdmin');

      if (!token || isAdmin !== 'true') {
        router.push('/'); 
      } else {
        setIsAuthorized(true);
      }
    }, []);

    if (!isHydrated) return null;
    if (!isAuthorized) return null;

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default AuthAdmin;
