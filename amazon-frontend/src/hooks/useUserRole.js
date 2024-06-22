import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUserRole = (userAddress) => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserRole = async () => {
        try {
          const res = await axios.get(`${NEXT_PUBLIC_}/api/user/details/${userAddress}`, {
            withCredentials: true,
          });
          if (res.data.success) {
            setRole(res.data.user[0]);
          }
        } catch (error) {
          console.error('Failed to fetch user role:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserRole();
    }, [userAddress]);
  
    return { role, loading };
  };
  