// src/components/AuthForm.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp, signInWithGoogle } from "@/lib/auth";
import { auth } from "@/integrations/firebase/firebase"; // Make sure you import your Firebase auth instance
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FcGoogle } from "react-icons/fc";

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Listen for auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        navigate("/"); // Redirect if already logged in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
      } else {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "Logged in successfully.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: "Welcome!",
        description: "Signed in with Google successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google Sign-In Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // While user is logged in
  if (user) {
    return (
      <div className="max-w-md mx-auto w-full p-6 bg-white rounded-lg shadow-lg text-center space-y-6">
        <h1 className="text-2xl font-bold">You are already logged in</h1>
        <p className="text-gray-500">{user.email}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h1>
        <p className="text-gray-500">
          {isSignUp ? "Sign up to start using the app" : "Sign in to continue"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>

      <div className="flex items-center gap-2">
        <div className="flex-grow border-t" />
        <p className="text-gray-400 text-xs">or</p>
        <div className="flex-grow border-t" />
      </div>

      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <FcGoogle className="h-5 w-5" />
        Continue with Google
      </Button>

      <div className="text-center">
        <Button
          variant="link"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-sm"
          disabled={isLoading}
        >
          {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
        </Button>
      </div>
    </div>
  );
}
