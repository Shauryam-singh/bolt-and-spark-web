// src/components/AuthForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp, signInWithGoogle } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { FcGoogle } from "react-icons/fc"; // Install react-icons if not installed

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      } else {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
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
        description: "Logged in with Google successfully.",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google Sign-In Failed",
        description: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full mx-auto space-y-6 p-6 bg-white rounded-lg shadow-lg">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h1>
        <p className="text-gray-500">
          {isSignUp ? "Sign up to start shopping" : "Sign in to access your account"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
        >
          {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
        </Button>
      </div>
    </div>
  );
}
