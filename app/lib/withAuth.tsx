import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axiosClient from '@/app/lib/axiosClient';

const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

        useEffect(() => {
            const verifyToken = async () => {
                try {
                    await axiosClient.get('/api/auth');
                    setIsAuthenticated(true);
                } catch {
                    setIsAuthenticated(false);
                    router.push('/login');
                }
            };

            verifyToken();
        }, [router]);

        if (isAuthenticated === null) {
            return <div>Loading...</div>;
        }

        return isAuthenticated ? <WrappedComponent {...props} /> : null;
    };
};


export default withAuth;
