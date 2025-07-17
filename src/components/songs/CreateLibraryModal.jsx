import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const CreateLibraryModal = ({ onClose, onLibraryCreated }) => {
  const [name, setName] = useState('');
  const { toast } = useToast();

  const handleCreate = () => {
    if (!name.trim()) {
      toast({ title: "Library name cannot be empty", variant: "destructive" });
      return;
    }
    const newLibrary = { id: Date.now(), name, songs: [] };
    onLibraryCreated(newLibrary);
    toast({ title: `Library "${name}" created!` });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-white mb-4">Create New Library</h3>
        <input
          type="text"
          placeholder="Library name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
        />
        <div className="flex gap-3">
          <Button onClick={handleCreate} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">Create</Button>
          <Button onClick={onClose} variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">Cancel</Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateLibraryModal;