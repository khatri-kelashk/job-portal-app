"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Image from "next/image";
import { loginUser } from '../store/slices/authSlice';
import { AppDispatch, RootState, useAppSelector } from '../store';


interface ToastState {
  show: boolean;
  title: string;
  description: string;
  variant: 'success' | 'error';
}

const LoginScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, title: '', description: '', variant: 'success' });
  
  
  const { isLoading, error, isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const showToast = (title: string, description: string, variant: 'success' | 'error' = 'success') => {
    setToast({ show: true, title, description, variant });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      showToast("Error", "Please fill in all fields", "error");
      return;
    }

    if (!acceptTerms) {
      showToast("Error", "Please accept terms and conditions", "error");
      return;
    }

    // const response = await useAppDispatch()(loginUser({ email, password }));
    const response = await dispatch((loginUser({ username:email, password }))).unwrap();
    console.log("Login response:", response);
    
    
    // Simulate API call
    // setTimeout(() => {
    //   setIsLoading(false);
    //   showToast("Success", "Logged in successfully!", "success");
    //   onLogin();
    // }, 1500);
  };
  

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          toast.variant === 'error' 
            ? 'bg-red-500 text-white' 
            : 'bg-green-500 text-white'
        }`}>
          <div className="font-semibold">{toast.title}</div>
          <div className="text-sm opacity-90">{toast.description}</div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Side - Form Section */}
        <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
          <div className="w-full max-w-md space-y-8">
            <div className="flex justify-center mb-8">
              <Image 
                src="/images/logo.png" 
                alt="logoipsum" 
                width={128}
                height={32}
                className="h-8 w-auto"
              />
            </div>

            {/* title */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-slate-800">
                Join our job portal
              </h1>
              <p className="text-slate-600">
                Job seekers apply. Employers post, search, manage.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-slate-700 font-medium">
                  Email
                </label>
                <div className="relative">
                  <Image 
                    src="/icons/mail.svg" 
                    alt="Email icon" 
                    width={20}
                    height={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 h-12 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-slate-700 font-medium">
                  Password
                </label>
                <div className="relative">
                  <Image 
                    src="/icons/key.svg" 
                    alt="Password icon" 
                    width={20}
                    height={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 h-12 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Image 
                      src={showPassword ? "/icons/visibility_off.svg" : "/icons/visibility_on.svg"}
                      alt={showPassword ? "Hide password" : "Show password"}
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                  />
                  <label htmlFor="terms" className="text-slate-600 cursor-pointer">
                    Accept terms and conditions
                  </label>
                </div>
                <button
                  type="button"
                  className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Log in"
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-teal-600 hover:text-teal-700 font-medium transition-colors inline-flex items-center space-x-1"
                >
                  <span>Register a new account</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex-1 relative">
          <Image 
            src="/images/bg.png" 
            alt="Background" 
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-end p-12">
            <blockquote className="text-white text-2xl font-medium leading-relaxed max-w-md">
              {"Here, you can find the right fit for your career or hire talent that fits your company's requirements."}
            </blockquote>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen flex flex-col">
        <div className="relative h-64 flex-shrink-0">
          <Image 
            src="/images/bg.png" 
            alt="Background" 
            width={400}
            height={256}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-end p-6">
            <blockquote className="text-white text-lg font-medium leading-relaxed">
              {"Here, you can find the right fit for your career or hire talent that fits your company's requirements."}
            </blockquote>
          </div>
        </div>

        {/* Bottom Section - Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-8 bg-white">
          <div className="w-full max-w-sm space-y-6">
            <div className="flex justify-center mb-6">
              <Image 
                src="/images/logo.png" 
                alt="logoipsum" 
                width={128}
                height={32}
                className="h-8 w-auto"
              />
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-slate-800">
                Join our job portal
              </h1>
              <p className="text-sm text-slate-600">
                Job seekers apply. Employers post, search, manage.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="mobile-email" className="block text-slate-700 font-medium">
                  Email
                </label>
                <div className="relative">
                  <Image 
                    src="/icons/mail.svg" 
                    alt="Email icon" 
                    width={20}
                    height={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="mobile-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 h-12 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="mobile-password" className="block text-slate-700 font-medium">
                  Password
                </label>
                <div className="relative">
                  <Image 
                    src="/icons/key.svg" 
                    alt="Password icon" 
                    width={20}
                    height={20}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="mobile-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 h-12 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Image 
                      src={showPassword ? "/icons/visibility_off.svg" : "/icons/visibility_on.svg"}
                      alt={showPassword ? "Hide password" : "Show password"}
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    id="mobile-terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                  />
                  <label htmlFor="mobile-terms" className="text-sm text-slate-600 cursor-pointer">
                    Accept terms and conditions
                  </label>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Log in"
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors inline-flex items-center space-x-1"
                >
                  <span>Register a new account</span>
                  <span>→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;