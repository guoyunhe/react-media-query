import cn from 'classnames';
import { CSSProperties, ReactNode } from 'react';
import './index.css';

export interface ReactMediaQueryProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function ReactMediaQuery({ children, className, style }: ReactMediaQueryProps) {
  return (
    <div className={cn('react-media-query', className)} style={style}>
      {children}
    </div>
  );
}
