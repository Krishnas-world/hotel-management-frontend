"use client"
import React, { useState } from 'react';
import { Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useMediaQuery } from '@/app/hooks/useMediaQuery';
import Image from 'next/image';

// Form input component with enhanced features
const FormInput = ({
  label,
  icon,
  error,
  showPasswordToggle = false,
  ...props
}: {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
  showPasswordToggle?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = props.type === 'password' && showPassword ? 'text' : props.type;

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={props.id} className="text-sm font-medium text-slate-700">
          {label}
        </Label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <Input
          className={`bg-white ${icon ? 'pl-10' : ''} ${error ? 'border-red-500 pr-10' : ''} ${
            showPasswordToggle ? 'pr-10' : ''
          }`}
          {...props}
          type={inputType}
        />
        {showPasswordToggle && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            <span className="sr-only">
              {showPassword ? 'Hide password' : 'Show password'}
            </span>
          </Button>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

// Custom hook for form validation
const useForm = (initialState: any) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };
  
  return {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    handleChange
  };
};

const Login: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    handleChange
  } = useForm({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setFormStatus({
        type: 'success',
        message: 'Login successful! Redirecting to dashboard...',
      });
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        // In a real app, you would use router.push('/dashboard') here
        console.log('Redirecting to dashboard...');
      }, 2000);
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Invalid email or password. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="h-14 w-14 bg-transparent rounded-full flex items-center justify-center">
              <Image src="/logo.svg" alt="Logo" height={30} width={30} className="h-8 w-8" />
            </div>
          </div>
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Welcome Back!</h1>
            <p className="text-slate-600 mt-2">
              Sign in to access your personalized dashboard and manage your bookings.
            </p>
          </div>
          
          {/* Status Alert */}
          {formStatus.type && (
            <Alert className={`mb-6 ${formStatus.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
              <AlertDescription>{formStatus.message}</AlertDescription>
            </Alert>
          )}
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormInput
              label="Email"
              type="email"
              name="email"
              id="email"
              placeholder="your@email.com"
              icon={<Mail size={18} />}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              autoComplete="email"
              disabled={isSubmitting}
            />
            
            <FormInput
              label="Password"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              icon={<Lock size={18} />}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
              autoComplete="current-password"
              disabled={isSubmitting}
              showPasswordToggle
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => {
                    handleChange({
                      target: { name: 'rememberMe', value: '', type: 'checkbox', checked: !!checked }
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                  disabled={isSubmitting}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-slate-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <Link 
                  href="/forgot-password" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  tabIndex={isSubmitting ? -1 : 0}
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-amber-400 hover:bg-amber-500 text-slate-800 font-medium"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-50 text-slate-500">
                  or continue with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                type="button" 
                className="flex items-center justify-center bg-white"
                disabled={isSubmitting}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" aria-hidden="true">
                  <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"/>
                  <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"/>
                  <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"/>
                  <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"/>
                </svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                type="button" 
                className="flex items-center justify-center bg-white"
                disabled={isSubmitting}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.365 1.43c0 1.14-.46 2.26-1.2 3.1-.74.85-1.95 1.5-3.1 1.4-.15-1.1.35-2.3 1.1-3.1.8-.85 2.1-1.5 3.2-1.4zM20.5 16.5c-.45.95-.95 1.8-1.55 2.6-.8 1.05-1.65 2.1-2.85 2.1-1.2 0-1.55-.75-2.9-.75-1.35 0-1.8.75-2.9.8-1.2.05-2.1-1.1-2.9-2.15-1.6-2.25-2.85-6.35-1.2-9.15.8-1.3 2.2-2.1 3.6-2.1 1.15 0 2.25.8 2.9.8.65 0 1.85-.9 3.2-.8.55.05 2.1.25 3.1 1.9-.05.05-1.85 1.05-1.8 3.15.05 2.5 2.3 3.35 2.35 3.4z" />
                </svg>
                Apple
              </Button>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-sm text-slate-600">
                Don't have an account?{' '}
                <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      
      {/* Right side - Illustration */}
      <div className="hidden md:block md:w-1/2 bg-blue-400 relative overflow-hidden">
        {/* Illustration/Image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          opacity: 0.85
        }}></div>
      </div>
    </div>
  );
};

export default Login;