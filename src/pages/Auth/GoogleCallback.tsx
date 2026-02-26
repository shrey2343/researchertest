import { useEffect } from 'react';

export default function GoogleCallback() {
  useEffect(() => {
    // Parse the hash fragment from URL
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    
    const idToken = params.get('id_token');
    const accessToken = params.get('access_token');
    
    if (idToken) {
      // Send token to parent window
      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'GOOGLE_AUTH_SUCCESS',
            idToken,
            accessToken,
          },
          window.location.origin
        );
        
        // Close popup after sending message
        setTimeout(() => {
          window.close();
        }, 500);
      }
    } else {
      // Error case
      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'GOOGLE_AUTH_ERROR',
            error: 'No ID token received',
          },
          window.location.origin
        );
      }
      setTimeout(() => {
        window.close();
      }, 2000);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-700 text-lg">Completing sign in...</p>
        <p className="text-gray-500 text-sm mt-2">This window will close automatically</p>
      </div>
    </div>
  );
}
