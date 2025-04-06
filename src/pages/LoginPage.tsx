import logo from '@/assets/home24-logo.jpg';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white px-10 py-12 rounded-2xl shadow-lg w-full max-w-sm text-center border border-gray-300 min-h-[28rem] flex flex-col justify-center">
        <img src={logo} alt="Home24 Logo" className="w-28 mx-auto mb-6" />
        <LoginForm />
      </div>
    </div>
  );
}
