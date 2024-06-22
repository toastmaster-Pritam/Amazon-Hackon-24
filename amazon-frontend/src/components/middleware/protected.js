import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserRole } from '@/hooks/useUserRole';
import { useIsAdmin } from '@/hooks/useIsAdmin';

const withRoleProtection = (WrappedComponent, requiredRole, userAddress) => {
    return (props) => {
      const { role, loading: roleLoading } = useUserRole(userAddress);
      const { isAdmin, loading: adminLoading } = useIsAdmin(userAddress);
      const router = useRouter();
  
      useEffect(() => {
        if (!roleLoading && !adminLoading) {
          if (requiredRole !== role && !isAdmin) {
            router.push('/unauthorized');
          }
        }
      }, [roleLoading, adminLoading, role, isAdmin]);
  
      if (roleLoading || adminLoading) {
        return <p>Loading...</p>;
      }
  
      return <WrappedComponent {...props} />;
    };
  };

export default withRoleProtection;