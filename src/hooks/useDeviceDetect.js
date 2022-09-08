import React, { useEffect, useState } from 'react';

const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  const checkEnvironment = () => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const checkMobile = !!userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    );

    setIsMobile(checkMobile);
  };

  useEffect(() => {
    checkEnvironment();

    window.addEventListener('resize', checkEnvironment);

    return () => {
      window.removeEventListener('resize', checkEnvironment);
    };
  }, []);

  return { isMobile };
};

export default useDeviceDetect;
