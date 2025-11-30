import React from 'react'

export default function Header({ backendConnected }) {
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
        flexWrap: 'nowrap', // Keep everything on one line
        gap: isMobile ? '8px' : '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '10px' : '16px',
          flex: '1 1 auto', // Allow to shrink on mobile
          minWidth: 0 // Prevent overflow
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
  )
}
