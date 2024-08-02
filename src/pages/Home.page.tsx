import React from 'react';
import TaskList from '../components/core/TaskList';
import { MainLayout } from '../layouts';

function HomePage() {
  return (
    <MainLayout>
      {/* import task list  */}
      <TaskList />
    </MainLayout>
  );
}

export default HomePage;
