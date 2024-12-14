import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axiosClient from '@/app/lib/axiosClient';

const withAuth = (WrappedComponent: React.ComponentType) => {
    return (props: any) => {
        const router = useRouter();
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            const verifyToken = async () => {
                try {
                    await axiosClient.get('/api/auth'); // Пытаемся обновить токен
                    setIsAuthenticated(true);
                } catch {
                    router.push('/login');
                }
            };

            verifyToken();
        }, [router]);

        if (!isAuthenticated) {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
