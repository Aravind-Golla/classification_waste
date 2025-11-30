import React, { useState, useEffect } from 'react'

export default function Header({ backendConnected }) {
  const [darkMode, setDarkMode] = useState(false)

  // Load dark mode preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved) {
      const isDark = JSON.parse(saved)
      setDarkMode(isDark)
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    }
  }, [])

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light')
    localStorage.setItem('darkMode', JSON.stringify(newMode))
  }

  const getStatusIcon = () => {
    if (backendConnected === null) return '⏳'
    return backendConnected ? '🟢' : '🔴'
  }

  const getStatusText = () => {
    if (backendConnected === null) return 'Checking...'
    return backendConnected ? 'Connected' : 'Disconnected'
  }

  // Detect mobile for responsive sizing
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  return (
    <>
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: isMobile ? '16px 0' : '20px 0',
        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: 1600,
          margin: '0 auto',
          padding: isMobile ? '0 12px' : '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          gap: isMobile ? '8px' : '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '10px' : '16px',
            flex: '1 1 auto',
            minWidth: 0
          }}>
            <div style={{
              fontSize: isMobile ? '24px' : '36px',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              flexShrink: 0
            }}>
              ♻️
            </div>
            <div style={{ minWidth: 0 }}>
              <h1 style={{
                margin: 0,
                fontSize: isMobile ? 20 : 26,
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.5px',
                whiteSpace: isMobile ? 'nowrap' : 'normal'
              }}>
                Waste Classifier
              </h1>
              <div style={{
                fontSize: isMobile ? 10 : 14,
                color: 'rgba(255, 255, 255, 0.9)',
                marginTop: isMobile ? 2 : 4,
                fontWeight: 500,
                whiteSpace: 'nowrap'
              }}>
                {isMobile ? 'AI Recognition' : 'AI-Powered Recognition'}
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '6px' : '10px',
            background: backendConnected
              ? 'rgba(16, 185, 129, 0.25)'
              : 'rgba(239, 68, 68, 0.25)',
            padding: isMobile ? '6px 10px' : '10px 18px',
            borderRadius: '24px',
            backdropFilter: 'blur(10px)',
            fontSize: isMobile ? 11 : 14,
            color: '#fff',
            fontWeight: 600,
            border: '1px solid rgba(255, 255, 255, 0.3)',
            flexShrink: 0,
            whiteSpace: 'nowrap'
          }}>
            <span style={{ fontSize: isMobile ? 12 : 16 }}>{getStatusIcon()}</span>
            <span style={{ display: isMobile ? 'none' : 'inline' }}>Backend: </span>
            <span>{getStatusText()}</span>
          </div>
        </div>
      </header>

      {/* Floating Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        style={{
          position: 'fixed',
          bottom: isMobile ? '20px' : '32px',
          right: isMobile ? '20px' : '32px',
          width: isMobile ? '48px' : '56px',
          height: isMobile ? '48px' : '56px',
          borderRadius: '50%',
          background: darkMode
            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isMobile ? '22px' : '26px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1000,
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)'
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(102, 126, 234, 0.6)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.4)'
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'scale(0.95)'
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)'
        }}
        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        <span style={{
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
          transition: 'transform 0.3s ease'
        }}>
          {darkMode ? '☀️' : '🌙'}
        </span>
      </button>
    </>
  )
}
