import React from 'react';
import { MainLayout } from '../layouts';
import AddTask from '../components/core/AddTask/AddTask';

function HomePage() {
  return (
    <MainLayout>
      <AddTask />
    </MainLayout>
  );
}

export default HomePage;
