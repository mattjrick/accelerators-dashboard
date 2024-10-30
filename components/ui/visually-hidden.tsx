import * as React from 'react';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface VisuallyHiddenComponentProps {
  children: React.ReactNode;
}

const VisuallyHiddenComponent: React.FC<VisuallyHiddenComponentProps> = ({ children }) => {
  return (
    <VisuallyHidden>
      {children}
    </VisuallyHidden>
  );
};

export default VisuallyHiddenComponent;