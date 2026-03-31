'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { motion } from 'framer-motion';

const contactSchema = z.object({
  name:         z.string().min(2, 'Name must be at least 2 characters'),
  email:        z.string().email('Invalid email address'),
  phone:        z.string().optional(),
  service_type: z.string().min(1, 'Please select a service'),
  budget:       z.string().min(1, 'Please select a budget range'),
  requirements: z.string().min(50, 'Please provide at least 50 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const serviceOptions = [
  'Custom Web Application Development',
  'Mobile App Development (iOS & Android)',
  'Domain Registration & Hosting Management',
  'Graphics & Branding Design',
  'Promotional & Corporate Video Production',
  'Social Media Marketing & Post Boosting',
  '3D Animation & Motion Graphics',
  'SEO & Digital Strategy',
  'E-commerce Solutions',
  'API Development & Integrations',
  'Google Business Profile Optimization',
  'Full Digital Transformation Planning',
  'Others',
];

const budgetOptions = [
  'Under $500',
  '$500 - $1,000',
  '$1,000 - $2,000',
  '$2,000 - $4,000',
  '$4,000+',
  'Custom Quote Required',
];

/* ---------- reusable styled input ---------- */
const inputClass =
  'w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all duration-200 placeholder-gray-600';
const inputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
};
const focusStyle = {
  border: '1px solid #3B82F6',
  background: 'rgba(59,130,246,0.06)',
  boxShadow: '0 0 0 3px rgba(59,130,246,0.12)',
};

function DarkInput({
  id, placeholder, type = 'text', registration, error,
}: {
  id: string; placeholder: string; type?: string;
  registration: any; error?: { message?: string };
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <input
        {...registration}
        id={id}
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={inputClass}
        style={focused ? focusStyle : inputStyle}
      />
      {error && <p className="mt-1.5 text-red-400 text-xs">{error.message}</p>}
    </div>
  );
}

function DarkSelect({
  id, placeholder, options, registration, error,
}: {
  id: string; placeholder: string; options: string[];
  registration: any; error?: { message?: string };
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <select
        {...registration}
        id={id}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`${inputClass} appearance-none cursor-pointer`}
        style={focused ? { ...focusStyle, color: '#F1F5F9' } : { ...inputStyle, color: '#94A3B8' }}
      >
        <option value="" style={{ background: '#0F0F1A', color: '#94A3B8' }}>{placeholder}</option>
        {options.map(opt => (
          <option key={opt} value={opt} style={{ background: '#0F0F1A', color: '#F1F5F9' }}>{opt}</option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</div>
      {error && <p className="mt-1.5 text-red-400 text-xs">{error.message}</p>}
    </div>
  );
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      await axios.post(`${apiUrl}/api/inquiry`, data);
      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h3 className="text-white font-bold text-xl mb-1">Send Us a Message</h3>
        <p className="text-gray-500 text-sm">Fill in the form below and we&apos;ll be in touch.</p>
      </div>

      {/* Status messages */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-xl border border-green-500/30 bg-green-500/10"
        >
          <span className="text-green-400 text-lg">✅</span>
          <div>
            <div className="text-green-300 font-semibold text-sm">Message received!</div>
            <p className="text-green-400/70 text-xs mt-0.5">We&apos;ll get back to you within 24 hours.</p>
          </div>
        </motion.div>
      )}
      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10"
        >
          <span className="text-red-400">❌</span>
          <div>
            <div className="text-red-300 font-semibold text-sm">Something went wrong</div>
            <p className="text-red-400/70 text-xs mt-0.5">Please try again or email us directly.</p>
          </div>
        </motion.div>
      )}

      {/* Your Info */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-4 pb-2 border-b border-white/5">
          Your Information
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-gray-400 mb-2">Full Name *</label>
            <DarkInput id="name" placeholder="John Doe" registration={register('name')} error={errors.name} />
          </div>
          <div>
            <label htmlFor="phone" className="block text-xs font-semibold text-gray-400 mb-2">Phone Number</label>
            <DarkInput id="phone" placeholder="+977 98XXXXXXXX" registration={register('phone')} />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="block text-xs font-semibold text-gray-400 mb-2">Email Address *</label>
          <DarkInput id="email" type="email" placeholder="your@email.com" registration={register('email')} error={errors.email} />
        </div>
      </div>

      {/* Project Details */}
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-4 pb-2 border-b border-white/5">
          Project Details
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="service_type" className="block text-xs font-semibold text-gray-400 mb-2">Service Needed *</label>
            <DarkSelect id="service_type" placeholder="Select a service" options={serviceOptions} registration={register('service_type')} error={errors.service_type} />
          </div>
          <div>
            <label htmlFor="budget" className="block text-xs font-semibold text-gray-400 mb-2">Budget Range *</label>
            <DarkSelect id="budget" placeholder="Select budget" options={budgetOptions} registration={register('budget')} error={errors.budget} />
          </div>
        </div>
        <div>
          <label htmlFor="requirements" className="block text-xs font-semibold text-gray-400 mb-2">Project Description *</label>
          <div className="relative">
            <textarea
              {...register('requirements')}
              id="requirements"
              rows={5}
              placeholder="Tell us about your goals, timeline, and requirements... (min. 50 characters)"
              className={`${inputClass} resize-none`}
              style={inputStyle}
              onFocus={e => Object.assign((e.target as HTMLElement).style, focusStyle)}
              onBlur={e  => Object.assign((e.target as HTMLElement).style, inputStyle)}
            />
          </div>
          {errors.requirements && <p className="mt-1.5 text-red-400 text-xs">{errors.requirements.message}</p>}
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
        style={{
          background: isSubmitting
            ? 'rgba(59,130,246,0.5)'
            : 'linear-gradient(135deg, #3B82F6, #2563EB)',
          boxShadow: isSubmitting ? 'none' : '0 0 30px rgba(59,130,246,0.4)',
        }}
        onMouseEnter={e => { if (!isSubmitting) (e.currentTarget as HTMLElement).style.boxShadow = '0 0 50px rgba(59,130,246,0.6)'; }}
        onMouseLeave={e => { if (!isSubmitting) (e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(59,130,246,0.4)'; }}
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
