import React from 'react';

const SinuLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <img 
      src="https://sinu-csl-site.s3.sa-east-1.amazonaws.com/BRAINSTORMING+SINU+(2).png" 
      alt="Logo SINU" 
      className={`${className} object-contain`}
    />
  );
};

export default SinuLogo;