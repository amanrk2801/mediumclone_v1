// src/pages/WritePage.tsx
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bold, Italic, Link, Type, Quote, Image as ImageIcon } from "lucide-react"; // Corrected ImageIcon import
import mediumIcon from '../../assets/medium-icon.svg'; 
import medium_white from '../../assets/medium-white.svg'; 
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase"; 
import ReactMarkdown from 'react-markdown';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDarkMode } from '@/contexts/DarkModeContext';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { darkMode } = useDarkMode(); // Removed setDarkMode if not used

  // Handle formatting based on the selected format
  const handleFormatting = (format: string) => {
    let newContent = content;
    const cursorPosition = textareaRef.current?.selectionStart || 0;

    switch (format) {
      case 'bold':
        newContent = 
          content.slice(0, cursorPosition) + 
          '**Bold Text**' + 
          content.slice(cursorPosition);
        break;
      case 'italic':
        newContent = 
          content.slice(0, cursorPosition) + 
          '*Italic Text*' + 
          content.slice(cursorPosition);
        break;
      case 'link':
        newContent = 
          content.slice(0, cursorPosition) + 
          '[Link Text](https://example.com)' + 
          content.slice(cursorPosition);
        break;
      case 'header':
        newContent = 
          content.slice(0, cursorPosition) + 
          '\n# Header\n' + 
          content.slice(cursorPosition);
        break;
      case 'quote':
        newContent = 
          content.slice(0, cursorPosition) + 
          '\n> Quote\n' + 
          content.slice(cursorPosition);
        break;
      default:
        break;
    }

    setContent(newContent);
  };

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload a valid image file.");
      return;
    }

    setUploading(true);
    toast.info("Uploading image...");

    try {
      const storageRef = ref(storage, `images/${Date.now()}-${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Insert the image markdown at the cursor position
      const cursorPosition = textareaRef.current?.selectionStart || content.length;
      const markdownImage = `![Alt Text](${downloadURL})`;
      const newContent = 
        content.slice(0, cursorPosition) + 
        markdownImage + 
        content.slice(cursorPosition);
      setContent(newContent);

      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Trigger the hidden file input when the image button is clicked
  const triggerImageUpload = () => {
    if (fileInputRef.current && !uploading) {
      fileInputRef.current.click();
    }
  };

  // Handle publish action
  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content cannot be empty.");
      return;
    }

    try {
      const articlesCollection = collection(db, "articles");
      await addDoc(articlesCollection, {
        title,
        content,
        createdAt: serverTimestamp(),
      });
      toast.success("Article published successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error publishing article:", error);
      toast.error("Failed to publish article. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Toast Container for Notifications */}
      <ToastContainer />

      {/* Header Section */}
      <header className="flex justify-between items-center mb-8">
        <img 
          src={darkMode ? medium_white : mediumIcon}  
          alt="Medium Logo" 
          className="h-12 w-12" 
        />
        <Button 
          variant="outline" 
          onClick={handlePublish}
          className="bg-transparent text-green-600 dark:text-green-400 border-green-600 dark:border-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-500 dark:hover:text-white transition-colors duration-200"
        >
          Publish
        </Button>
      </header>

      {/* Title Input */}
      <Input 
        type="text" 
        placeholder="Title" 
        className="text-3xl font-semibold mb-6 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors duration-200"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Formatting Buttons */}
      <div className="flex space-x-2 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleFormatting('bold')}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="Bold"
        >
          <Bold className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleFormatting('italic')}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="Italic"
        >
          <Italic className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleFormatting('link')}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="Link"
        >
          <Link className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleFormatting('header')}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="Header"
        >
          <Type className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleFormatting('quote')}
          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="Quote"
        >
          <Quote className="h-5 w-5" />
        </Button>
        {/* Image Upload Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={triggerImageUpload}
          className={`text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${uploading ? 'cursor-not-allowed opacity-50' : ''}`}
          aria-label="Insert Image"
          disabled={uploading}
        >
          <ImageIcon className="h-5 w-5" />
        </Button>
        {/* Hidden File Input */}
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          className="hidden" 
        />
      </div>

      {/* Content Textarea */}
      <textarea
        ref={textareaRef}
        className="w-full h-80 p-4 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none transition-colors duration-200"
        placeholder="Tell your story..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Markdown Preview */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Preview</h2>
        <div className="prose p-6 rounded shadow-lg bg-white dark:bg-gray-800 transition-colors duration-200">
          <ReactMarkdown className="text-gray-900 dark:text-gray-200">
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
