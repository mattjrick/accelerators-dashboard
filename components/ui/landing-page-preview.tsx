import React, { useRef, useEffect } from 'react';

const LandingPagePreview = ({ content }: { content: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(content);
        doc.close();
      }
    }
  }, [content]);

  return (
    <iframe
      ref={iframeRef}
      className="border rounded-lg p-4 mt-4 bg-white shadow-sm"
      style={{ width: '100%', height: '100%', minHeight: '300px', maxHeight: '500px' }}
    />
  );
};

export default LandingPagePreview;