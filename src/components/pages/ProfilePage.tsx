// src/components/pages/ProfilePage.tsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { updateProfile, storage, ref, uploadBytes, getDownloadURL } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Local state for form inputs
  const [displayName, setDisplayName] = useState<string>(currentUser?.displayName || '');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoURL, setPhotoURL] = useState<string>(currentUser?.photoURL || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (!currentUser) {
    // Redirect to sign-in if user is not authenticated
    navigate('/signin');
    return null;
  }

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setPhotoFile(acceptedFiles[0]);

      // Display a preview
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let newPhotoURL = photoURL;

      // If a new photo is selected, upload it to Firebase Storage
      if (photoFile) {
        const storageRef = ref(storage, `avatars/${currentUser.uid}/${photoFile.name}`);
        const snapshot = await uploadBytes(storageRef, photoFile);
        newPhotoURL = await getDownloadURL(snapshot.ref);
      }

      // Update the user's profile
      await updateProfile(currentUser, {
        displayName,
        photoURL: newPhotoURL,
      });

      setPhotoURL(newPhotoURL);

      // Show success toast
      toast.success('Profile updated successfully!', {
        position: 'top-right',
        autoClose: 5000,
      });
    } catch (err: any) {
      console.error('Error updating profile:', err);
      // Show error toast
      toast.error(err.message || 'Failed to update profile.', {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="displayName" className="block text-sm font-medium mb-1">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Avatar Image</label>
          <div
            {...getRootProps()}
            className={`w-full border-2 border-dashed p-4 rounded cursor-pointer flex flex-col items-center justify-center ${
              isDragActive
                ? 'border-green-500 bg-green-100'
                : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700'
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-green-600">Drop the image here...</p>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">Drag & drop an image here, or click to select one</p>
            )}
          </div>
          {photoURL && (
            <img
              src={photoURL}
              alt="Current Avatar"
              className="mt-4 h-24 w-24 rounded-full object-cover"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </main>
  );
};

export default ProfilePage;
