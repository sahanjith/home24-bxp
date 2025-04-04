import logo from '@/assets/home24-logo.jpg';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white px-8 py-10 rounded-2xl shadow-lg w-full max-w-sm text-center border border-gray-300">
        <img src={logo} alt="Home24 Logo" className="w-28 mx-auto mb-6" />
        <LoginForm />
      </div>
    </div>
  );
}
