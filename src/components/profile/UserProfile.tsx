
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
  username?: string;
  phone?: string;
  updated_at?: string;
};

export default function UserProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  async function fetchProfile() {
    try {
      if (!user) return;
      
      const profileRef = doc(db, 'profiles', user.uid);
      const profileSnap = await getDoc(profileRef);
      
      if (profileSnap.exists()) {
        const profileData = profileSnap.data() as Profile;
        setProfile({
          id: profileSnap.id,
          ...profileData
        });
        setUsername(profileData.username || '');
        setPhone(profileData.phone || '');
      } else {
        // Create profile if it doesn't exist
        const newProfile = {
          id: user.uid,
          username: '',
          phone: '',
          updated_at: new Date().toISOString()
        };
        await setDoc(profileRef, newProfile);
        setProfile(newProfile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      if (!user) throw new Error('No user');

      const profileRef = doc(db, 'profiles', user.uid);
      
      const updates = {
        username,
        phone,
        updated_at: new Date().toISOString(),
      };

      await setDoc(profileRef, updates, { merge: true });

      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Error updating profile',
      });
    } finally {
      setLoading(false);
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
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
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
