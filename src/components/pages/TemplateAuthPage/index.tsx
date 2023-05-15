import * as React from 'react';
import './index.css';

type TemplateProps = {
  children: string | JSX.Element | JSX.Element[]
}

export const TemplateAuthPage = ({ children } : TemplateProps) => {
  return (
    <>
      <div className='content'>
        {children}
      </div>
    </>
  )
}