import * as React from 'react';

type TemplateProps = {
  children: string | JSX.Element | JSX.Element[]
}

export const TemplatePage = ({ children } : TemplateProps ) => {
  return (
    <>
      <div className='content'>
        {children}
      </div>
    </>
  )
}