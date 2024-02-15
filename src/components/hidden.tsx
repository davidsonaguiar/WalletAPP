import { ReactNode } from 'react';

interface HiddenProps {
  isHidden: boolean;
  element: ReactNode;
}

export function Hidden(props: HiddenProps) {
  return props.isHidden ? null : props.element;
}