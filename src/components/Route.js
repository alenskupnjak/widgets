import React, { useEffect, useState } from 'react';

const Route = ({ path, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // change path location
  const onLocationChange = () => {
    setCurrentPath(window.location.pathname);
  };

  useEffect(() => {
    window.addEventListener('popstate', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  // if catch route catch this
  return currentPath === path ? children : null;
};

export default Route;