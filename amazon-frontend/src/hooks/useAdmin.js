import { useState, useEffect } from 'react';
import axios from 'axios';

export const useIsAdmin = (userAddress) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIsAdmin = async () => {
      try {
        const res = await axios.get(`${NEXT_PUBLIC_BACKEND_URL}/api/user/isAdmin/${userAddress}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setIsAdmin(res.data.admin);
        }
      } catch (error) {
        console.error('Failed to fetch admin status:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIsAdmin();
  }, [userAddress]);

  return { isAdmin, loading };
};