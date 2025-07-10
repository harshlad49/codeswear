import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Auth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const [isHydrated, setIsHydrated] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      setIsHydrated(true); // Ensures this runs only on the client

      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      } else {
        setIsAuthorized(true);
      }
    }, []);

    if (!isHydrated) {
      return null; 
    }

    if (!isAuthorized) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default Auth;
