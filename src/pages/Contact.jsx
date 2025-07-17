import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  Users,
  Building,
  Music
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const { toast } = useToast();

  const showHelp = (feature) => {
    toast({
      title: "Help Information",
      description: `🚧 Help for ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: `🚧 Contact form submission isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help with your account, billing, or technical issues",
      contact: "support@micfights.com",
      availability: "24/7 Response",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+1 (555) 123-4567",
      availability: "Mon-Fri 9AM-6PM EST",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant help for quick questions",
      contact: "Available on website",
      availability: "Mon-Fri 9AM-9PM EST",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const departments = [
    {
      title: "General Support",
      description: "Account help, billing questions, general inquiries",
      icon: HelpCircle,
      email: "support@micfights.com"
    },
    {
      title: "Artist Relations",
      description: "Artist onboarding, competition questions, career support",
      icon: Music,
      email: "artists@micfights.com"
    },
    {
      title: "Venue Partnerships",
      description: "Venue onboarding, subscription management, technical support",
      icon: Building,
      email: "venues@micfights.com"
    },
    {
      title: "Business Development",
      description: "Partnerships, enterprise solutions, custom integrations",
      icon: Users,
      email: "business@micfights.com"
    }
  ];

  const faqs = [
    {
      question: "How do I upgrade my subscription?",
      answer: "You can upgrade your subscription anytime from your account settings or contact our support team for assistance."
    },
    {
      question: "How does the Micfights competition work?",
      answer: "Venues nominate artists, who then create hero pages and submit performances for review and community voting."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period."
    },
    {
      question: "How do I become a venue partner?",
      answer: "Visit our venue portal to learn about partnership opportunities and subscription plans designed for venues."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help! Whether you have questions, need support, or want to explore partnership opportunities, 
            our team is ready to assist you.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div key={index} className="glass-effect rounded-2xl p-6 ios-shadow text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <div className="space-y-2">
                  <p className="font-medium text-gray-800">{method.contact}</p>
                  <div className="flex items-center justify-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{method.availability}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-effect rounded-2xl p-8 ios-shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => showHelp('contact form')}
                  className="text-gray-600 hover:text-orange-600"
                >
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="general">General Support</option>
                    <option value="artist">Artist Relations</option>
                    <option value="venue">Venue Partnerships</option>
                    <option value="business">Business Development</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Subscriptions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    placeholder="Please provide details about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-3"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Department Contacts */}
            <div className="glass-effect rounded-2xl p-6 ios-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Department Contacts</h3>
              <div className="space-y-4">
                {departments.map((dept, index) => {
                  const Icon = dept.icon;
                  return (
                    <div key={index} className="bg-white/50 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{dept.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">{dept.description}</p>
                          <a 
                            href={`mailto:${dept.email}`}
                            className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                          >
                            {dept.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Office Information */}
            <div className="glass-effect rounded-2xl p-6 ios-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Office Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Headquarters</h4>
                    <p className="text-gray-600">
                      123 Music Avenue<br />
                      Nashville, TN 37203<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Business Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                      Saturday: 10:00 AM - 4:00 PM EST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="glass-effect rounded-2xl p-6 ios-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white/50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{faq.question}</h4>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => showHelp('view all FAQs')}
                className="w-full mt-4 border-gray-300"
              >
                View All FAQs
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Response Time Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="glass-effect rounded-2xl p-6 ios-shadow">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Response Times</h3>
            <p className="text-gray-600">
              We typically respond to all inquiries within 24 hours during business days. 
              For urgent technical issues, please use our live chat or phone support for immediate assistance.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;