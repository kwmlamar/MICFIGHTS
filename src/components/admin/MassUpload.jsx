
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, HelpCircle, File, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const MassUpload = ({ onUploadSuccess }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      id: `${file.name}-${file.lastModified}`,
      status: 'pending',
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac']
    },
    maxSize: 62914560, // 60 MB
  });

  const handleUpload = async () => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to upload songs.",
        variant: "destructive",
      });
      return;
    }
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to upload.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    const uploadPromises = files.map(async (file) => {
      if (file.status !== 'pending') return file;

      const filePath = `${user.id}/${Date.now()}-${file.name}`;
      
      const { error: uploadError } = await supabase.storage
        .from('song_files')
        .upload(filePath, file);

      if (uploadError) {
        toast({
          title: `Upload failed for ${file.name}`,
          description: uploadError.message,
          variant: "destructive",
        });
        return { ...file, status: 'error' };
      }
      
      const { data: { publicUrl } } = supabase.storage.from('song_files').getPublicUrl(filePath);

      const { error: dbError } = await supabase.from('songs').insert({
        title: file.name.split('.').slice(0, -1).join('.'),
        artist: 'Unknown Artist',
        supabase_storage_path: filePath,
        source_url: publicUrl,
        uploaded_by: user.id,
        source_type: 'upload'
      });

      if (dbError) {
        toast({
          title: `Database entry failed for ${file.name}`,
          description: dbError.message,
          variant: "destructive",
        });
        return { ...file, status: 'error' };
      }

      return { ...file, status: 'success' };
    });

    const results = await Promise.all(uploadPromises);
    setFiles(results);
    setUploading(false);
    toast({
      title: "Upload Complete",
      description: "All files have been processed.",
    });
    onUploadSuccess(); // Callback to refresh the song list
  };

  const showHelp = (feature) => {
    toast({
      title: "Help Information",
      description: `🚧 Help for ${feature} isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀`,
      duration: 3000,
    });
  };

  return (
    <div className="glass-effect rounded-2xl p-6 ios-shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Mass Song Upload</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-800 mb-2">Upload Multiple Songs</h4>
            <p className="text-gray-600 text-sm mb-4">
              Drag and drop audio files or click to browse
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-800">Upload Guidelines</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Supported formats: MP3, WAV, FLAC</li>
            <li>• Maximum file size: 60MB per song</li>
            <li>• Metadata will be extracted if available</li>
            <li>• Karaoke tracks should be in a separate folder</li>
            <li>• High-quality audio recommended (320kbps+)</li>
          </ul>
          
          <Button
            variant="outline"
            onClick={() => showHelp('upload guidelines')}
            className="w-full border-gray-300"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            View Detailed Guidelines
          </Button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-800 mb-4">Selected Files ({files.length})</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between bg-white/50 p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <File className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-800 truncate">{file.name}</span>
                </div>
                <div>
                  {file.status === 'pending' && <span className="text-xs text-gray-500">Pending</span>}
                  {file.status === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {file.status === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
                </div>
              </div>
            ))}
          </div>
          <Button onClick={handleUpload} disabled={uploading} className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
            {uploading ? 'Uploading...' : `Upload ${files.length} File(s)`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default MassUpload;
