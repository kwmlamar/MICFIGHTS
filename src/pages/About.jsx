import React from 'react';
import { motion } from 'framer-motion';
import { 
  Music, 
  Users, 
  Trophy, 
  Heart,
  Star,
  MapPin,
  Zap,
  Shield,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const About = () => {
  const { toast } = useToast();

  const showHelp = (feature) => {
    toast({
      title: "Help Information",
      description: `🚧 Help for ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  const handleFeature = (feature) => {
    toast({
      title: feature,
      description: `🚧 ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  const features = [
    {
      icon: Music,
      title: "Dynamic Music Player",
      description: "Revolutionary resizable player that adapts to your needs with playlist management and library organization.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Venue Management",
      description: "Complete portal for venues to manage subscriptions, events, and customer experiences.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Trophy,
      title: "Micfights Competitions",
      description: "Artist discovery platform with competitions, hero pages, and fan funding opportunities.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Heart,
      title: "Artist Support",
      description: "Crowdfunding system that helps artists achieve their dreams with community support.",
      color: "from-red-500 to-pink-500"
    }
  ];

  const stats = [
    { label: "Active Users", value: "50,000+", icon: Users },
    { label: "Partner Venues", value: "1,200+", icon: MapPin },
    { label: "Songs Available", value: "100,000+", icon: Music },
    { label: "Artists Supported", value: "5,000+", icon: Star }
  ];

  const team = [
    {
      name: "Alex Rodriguez",
      role: "CEO & Founder",
      bio: "Former music industry executive with 15 years of experience in artist development and venue management.",
      expertise: "Business Strategy, Music Industry"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "Tech innovator specializing in audio streaming and dynamic user interfaces with background from Spotify.",
      expertise: "Technology, Audio Engineering"
    },
    {
      name: "Marcus Johnson",
      role: "Head of Artist Relations",
      bio: "Grammy-nominated producer who understands the challenges artists face in building their careers.",
      expertise: "Artist Development, Music Production"
    },
    {
      name: "Emily Davis",
      role: "VP of Venue Partnerships",
      bio: "Former venue owner with deep understanding of entertainment business and customer experience.",
      expertise: "Venue Operations, Customer Experience"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold gradient-text mb-6">About Micfights</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing the music industry by connecting artists, venues, and fans through 
            innovative technology and community-driven experiences. Our platform empowers everyone 
            in the music ecosystem to thrive.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-effect rounded-2xl p-8 ios-shadow mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To democratize music discovery and artist development by providing cutting-edge tools 
              that connect talent with opportunity, venues with audiences, and fans with their next favorite artist.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Empower Artists",
                description: "Give emerging artists the tools and platform they need to showcase their talent and build sustainable careers.",
                icon: Star,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Support Venues",
                description: "Help venues enhance their entertainment offerings and build stronger connections with their communities.",
                icon: MapPin,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Connect Fans",
                description: "Create meaningful connections between music lovers and the artists they support through interactive experiences.",
                icon: Heart,
                color: "from-red-500 to-pink-500"
              }
            ].map((mission, index) => {
              const Icon = mission.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${mission.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{mission.title}</h3>
                  <p className="text-gray-600">{mission.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Platform Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Platform Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how Micfights is making a difference in the music community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="glass-effect rounded-2xl p-6 ios-shadow text-center"
                >
                  <Icon className="w-8 h-8 text-orange-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Makes Us Different</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Innovative features designed to transform how music is discovered, shared, and supported
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="glass-effect rounded-2xl p-6 ios-shadow"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate music industry veterans and tech innovators working together to transform the music experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="glass-effect rounded-2xl p-6 ios-shadow text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-3">{member.bio}</p>
                <div className="bg-orange-50 rounded-lg p-2">
                  <p className="text-orange-700 text-xs font-medium">{member.expertise}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Micfights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "We constantly push boundaries to create new possibilities for music discovery and artist development.",
                icon: Zap,
                color: "from-yellow-500 to-orange-500"
              },
              {
                title: "Community",
                description: "We believe in the power of community to support and elevate artists, venues, and music lovers alike.",
                icon: Users,
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Integrity",
                description: "We operate with transparency, fairness, and respect for all members of our music ecosystem.",
                icon: Shield,
                color: "from-blue-500 to-cyan-500"
              }
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="glass-effect rounded-2xl p-6 ios-shadow text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="glass-effect rounded-2xl p-8 ios-shadow">
            <h2 className="text-3xl font-bold gradient-text mb-4">Join the Micfights Community</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Whether you're an artist looking to share your talent, a venue wanting to enhance your entertainment, 
              or a music lover seeking new discoveries, Micfights has something for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handleFeature('Get started')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-3"
              >
                Get Started Today
              </Button>
              <Button
                variant="outline"
                onClick={() => showHelp('learn more')}
                className="border-gray-300 px-8 py-3"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;