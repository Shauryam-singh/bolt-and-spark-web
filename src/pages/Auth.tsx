
import Layout from "@/components/layout/Layout";
import AuthForm from "@/components/auth/AuthForm";

export default function Auth() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <AuthForm />
      </div>
    </Layout>
  );
}
