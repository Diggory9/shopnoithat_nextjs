'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export default function Profile() {
  const currentUser = useSelector((state: RootState) => state.auth.login.currentUser);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="mb-2"><strong>Username:</strong> {currentUser.data.userName}</p>
      <p className="mb-2"><strong>Email:</strong> {currentUser.data.email}</p>   
    </div>
  );
}
