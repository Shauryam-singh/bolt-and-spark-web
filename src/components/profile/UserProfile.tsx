import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/integrations/firebase/firebase';

type Profile = {
  id: string;
  username: string;
  phone: string;
  updated_at: string;
};

export default function UserProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (user?.uid) {
      fetchProfile();
    }
  }, [user?.uid]);

  async function fetchProfile() {
    try {
      const profileRef = doc(db, 'profiles', user!.uid);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        const data = profileSnap.data() as Profile;
        setProfile({ id: profileSnap.id, ...data });
        setUsername(data.username || '');
        setPhone(data.phone || '');
      } else {
        const newProfile: Profile = {
          id: user!.uid,
          username: '',
          phone: '',
          updated_at: new Date().toISOString(),
        };
        await setDoc(profileRef, newProfile);
        setProfile(newProfile);
        setUsername('');
        setPhone('');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch profile',
      });
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error('User not logged in');
  
      if (phone.length !== 10) {
        toast({
          variant: 'destructive',
          title: 'Invalid Phone Number',
          description: 'Phone number must be exactly 10 digits.',
        });
        return;
      }
  
      const profileRef = doc(db, 'profiles', user.uid);
  
      const updates = {
        username,
        phone,
        updated_at: new Date().toISOString(),
      };
  
      await setDoc(profileRef, updates, { merge: true });
  
      // Fetch the latest profile again
      await fetchProfile();
  
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update profile',
      });
    } finally {
      setLoading(false);
    }
  }  

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value.replace(/\D/g, ''); // remove non-numeric characters
    if (input.length <= 10) {
      setPhone(input);
    }
  }

  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input type="text" value={user?.email || ''} disabled />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Username</label>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone</label>
          <div className="flex items-center gap-2">
            <span className="text-sm">+91</span>
            <Input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter 10-digit number"
              maxLength={10}
            />
          </div>
        </div>
        <Button
          onClick={updateProfile}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  );
}
