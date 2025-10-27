import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

const Layouts = () => {
  const navbarHeight = 82;   // hauteur Navbar
  const sidebarWidth = 240;   // largeur Sidebar

  return (
    <>
      {/* Navbar fixe en haut */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: `${navbarHeight}px`,
          zIndex: 1000,
          width: '100%',
        }}
      >
        <Navbar />
      </Box>

      {/* Container principal : Sidebar + Contenu */}
      <Box
        sx={{
          display: 'flex',
          marginTop: `${navbarHeight}px`, // décale sous Navbar
          height: `calc(100vh - ${navbarHeight}px)`,
        }}
      >
        {/* Sidebar à gauche */}
        <Box
          sx={{
            width: `${sidebarWidth}px`,
            flexShrink: 0,
            height: '100%',
            overflowY: 'auto',
            backgroundColor: '#e83f6fff', // optionnel pour distinguer
          }}
        >
          <Sidebar />
        </Box>

        {/* Contenu principal */}
        <Box
          sx={{
            flexGrow: 1,
            height: '100%',
            overflowY: 'auto',
            padding: 0,
            backgroundColor: '#f5f2f2ff',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Layouts;
