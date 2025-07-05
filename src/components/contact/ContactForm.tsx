import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFirebase } from '../../context/FirebaseContext';

const ContactForm: React.FC = () => {
  const { saveContactMessage } = useFirebase();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      await saveContactMessage(
        formData.name,
        formData.email,
        formData.message
      );
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error saving contact message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const renderSubmitMessage = () => {
    if (submitStatus === 'success') {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-900/30 border border-green-700 text-green-200 p-4 rounded-md mb-6"
        >
          Your message has been sent successfully! We'll get back to you soon.
        </motion.div>
      );
    }
    
    if (submitStatus === 'error') {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-900/30 border border-red-700 text-red-200 p-4 rounded-md mb-6"
        >
          There was an error sending your message. Please try again or contact us directly.
        </motion.div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="glass-card p-8">
      <h3 className="text-2xl font-display font-bold mb-6">Get In Touch</h3>
      
      {renderSubmitMessage()}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-onyx-dark border border-onyx-light rounded-md focus:outline-none focus:ring-2 focus:ring-fire-red"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 bg-onyx-dark border border-onyx-light rounded-md focus:outline-none focus:ring-2 focus:ring-fire-red"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full p-3 bg-onyx-dark border border-onyx-light rounded-md focus:outline-none focus:ring-2 focus:ring-fire-red"
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`button-primary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;