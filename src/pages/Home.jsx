import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Music, 
  Mic, 
  MapPin, 
  Trophy, 
  Upload,
  Move,
  RotateCcw,
  Volume2,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Home = () => {
  const [draggedItems, setDraggedItems] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef(null);
  const { toast } = useToast();

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newItem = {
          id: Date.now() + index,
          type: 'image',
          src: e.target.result,
          x: Math.random() * 300,
          y: Math.random() * 200,
          width: 200,
          height: 150
        };
        setDraggedItems(prev => [...prev, newItem]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData('text/plain'));
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setDraggedItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, x, y } : item
      )
    );
  };

  const playMusic = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: "Music Sample",
      description: "🚧 Music playback isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      duration: 3000,
    });
  };

  const showHelp = (feature) => {
    toast({
      title: "Help Information",
      description: `🚧 Help for ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Drag & Drop */}
      <section 
        className="relative min-h-screen hero-section overflow-hidden"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Draggable Items */}
        {draggedItems.map((item) => (
          <motion.div
            key={item.id}
            className="absolute cursor-move z-10"
            style={{ 
              left: item.x, 
              top: item.y,
              width: item.width,
              height: item.height
            }}
            drag
            dragMomentum={false}
            whileDrag={{ scale: 1.1, zIndex: 50 }}
          >
            <img 
              src={item.src} 
              alt="Draggable content"
              className="w-full h-full object-cover rounded-xl shadow-2xl"
              draggable={false}
            />
            <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
              <Move className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        ))}

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Welcome to
                <span className="block bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                  Micfights
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                The ultimate music competition platform for artists, venues, and fans.
              </p>
            </motion.div>

            {/* Upload Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Customize Your Experience</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => showHelp('drag and drop functionality')}
                  className="text-white/70 hover:text-white"
                >
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 h-16"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Images
                </Button>
                
                <Button
                  onClick={playMusic}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white h-16"
                >
                  {isPlaying ? <Volume2 className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                  {isPlaying ? 'Playing Sample' : 'Play Music Sample'}
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <p className="text-white/70 text-sm">
                Upload images and drag them around to create your perfect layout. Experience our dynamic music samples and discover what makes Micfights special.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/compete">
                <Button className="bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-700 hover:to-yellow-600 text-white px-8 py-4 text-lg rounded-xl shadow-2xl">
                  Join a Competition
                </Button>
              </Link>
              <Link to="/songs">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg rounded-xl">
                  Explore Music
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              The Ultimate Stage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From dynamic music players to venue management and artist competitions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Music,
                title: "Dynamic Player",
                description: "Resizable, customizable music player with playlists and libraries",
                link: "/songs",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Mic,
                title: "Karaoke Mode",
                description: "Professional karaoke tracks with the same dynamic player",
                link: "/karaoke",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: MapPin,
                title: "Venue Portal",
                description: "Complete venue management with subscription tiers",
                link: "/venue",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Trophy,
                title: "Micfights Competition",
                description: "Artist competitions with hero pages and funding",
                link: "/compete",
                color: "from-orange-500 to-red-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={feature.link}>
                  <div className="glass-effect rounded-2xl p-8 card-hover ios-shadow">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Visualizer Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Feel the Beat
            </h2>
            
            <div className="flex justify-center items-center space-x-2 mb-8">
              <div className="music-visualizer">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="music-bar" style={{ animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            </div>

            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Experience music with our revolutionary dynamic player that adapts to your needs
            </p>

            <Link to="/songs">
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl shadow-2xl">
                Try the Player Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;