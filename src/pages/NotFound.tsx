
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4">
        <Card className="w-full max-w-md border-primary/10 shadow-lg" data-aos="fade-up">
          <CardContent className="pt-6 pb-8 px-8">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertCircle className="h-12 w-12 text-destructive" />
                </div>
              </div>
              
              <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-destructive to-destructive/70 bg-clip-text text-transparent">404</h1>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
              
              <p className="text-muted-foreground mb-6">
                Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
              </p>
              
              <div className="text-xs text-muted-foreground/70 px-4 py-2 bg-muted rounded-md mb-6">
                <code>{location.pathname}</code>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" asChild>
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" /> Return to Home
                  </Link>
                </Button>
                <Button variant="outline" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NotFound;