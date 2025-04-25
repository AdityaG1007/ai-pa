import React from 'react'
import Provider from './provider';
import { Toaster } from '@/components/ui/sonner';
import Header from './_components/Header';

function WorkspaceLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div>
      <Provider>
        {children}
      </Provider>
      <Toaster/>

    </div>
  )
}

export default WorkspaceLayout
