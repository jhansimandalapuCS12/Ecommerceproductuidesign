import { useState } from 'react';
import { ArrowLeft, Mail, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: string) => void;
}

export function ForgotPasswordScreen({ onNavigate }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toast.success('Password reset link sent to your email!');
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 mx-auto" style={{ color: '#10b981' }} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <button
              onClick={() => onNavigate('login')}
              className="w-full py-3 text-white rounded-lg font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: '#375201' }}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="inline-block px-8 py-3 rounded-lg mb-4"
            style={{
              background: 'linear-gradient(135deg, #375201 0%, #F08427 100%)'
            }}
          >
            <h1 className="text-white font-bold text-2xl">ShopHub</h1>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
          <p className="text-gray-600 mt-2">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  style={{ color: '#000000' }}
                  placeholder="you@example.com"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-white rounded-lg font-medium transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: '#375201' }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending Reset Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Back to Login */}
          <button
            onClick={() => onNavigate('login')}
            className="w-full mt-6 py-3 border-2 rounded-lg font-medium transition-all hover:bg-gray-50 flex items-center justify-center gap-2"
            style={{ borderColor: '#375201', color: '#375201' }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
