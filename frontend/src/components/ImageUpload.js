import React, { useRef, useState } from 'react'

export default function ImageUpload({ onUpload, loading, onReset }) {
  const inputRef = useRef()
  const cameraRef = useRef()
  const [preview, setPreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showGuide, setShowGuide] = useState(false)

  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    handleFile(f)
  }

  const checkImageQuality = async (file) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const quality = {
          isGood: img.width >= 224 && img.height >= 224,
          width: img.width,
          height: img.height,
          warning: img.width < 224 || img.height < 224 ? 'Image resolution is low. For best results, use higher quality images.' : null
        }
        resolve(quality)
      }
      img.src = URL.createObjectURL(file)
    })
  }

  const handleFile = async (file) => {
    if (file && file.type.startsWith('image/')) {
      const quality = await checkImageQuality(file)

      setPreview(URL.createObjectURL(file))
      if (onUpload) onUpload(file, quality)
    }
  }

  const handleReset = () => {
    setPreview(null)
    if (onReset) onReset()
  }

  const onDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const f = e.dataTransfer.files && e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  // Category examples for guide
  const exampleCategories = [
    { name: 'Plastic', emoji: '♻️', examples: 'Bottles, bags, containers' },
    { name: 'Paper', emoji: '📄', examples: 'Newspapers, cardboard boxes' },
    { name: 'Glass', emoji: '🫙', examples: 'Bottles, jars, windows' },
    { name: 'Metal', emoji: '🪙', examples: 'Cans, foil, batteries' },
    { name: 'Organic', emoji: '🌱', examples: 'Food waste, plants' },
    { name: 'Textile', emoji: '👕', examples: 'Clothes, fabric, shoes' }
  ]

  // Show large image view after upload
  if (preview) {
    return (
      <div className="card upload-card">
        <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{
            fontSize: isMobile ? 18 : 20,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 16,
            letterSpacing: '-0.3px'
          }}>
            Uploaded Image
          </div>

          {/* Large image display */}
          <div style={{
            position: 'relative',
            borderRadius: 16,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
            marginBottom: 16,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
          }}>
            <img
              src={preview}
              alt="Uploaded"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>

          {/* Choose Another Button */}
          <button
            onClick={handleReset}
            className="btn"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
              boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              width: '100%',
              justifyContent: 'center',
              padding: isMobile ? '10px' : '12px'
            }}
          >
            <span>🔄</span>
            <span>Choose Another</span>
          </button>

          {loading && (
            <div style={{ marginTop: 12 }}>
              <div className="loading-spinner" />
              <div style={{
                fontSize: 13,
                color: 'var(--text-secondary)',
                marginTop: 8,
                fontWeight: 500
              }}>
                Analyzing...
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Initial upload state
  return (
    <div className="card upload-card">
      <div style={{ textAlign: 'center', width: '100%', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
        <div style={{
          fontSize: isMobile ? 48 : 64,
          marginBottom: 16,
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
        }}>
          📸
        </div>
        <div style={{
          fontSize: isMobile ? 20 : 24,
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: 12,
          letterSpacing: '-0.5px'
        }}>
          Upload Waste Image
        </div>
        <div className="muted" style={{
          fontSize: isMobile ? 13 : 15,
          lineHeight: 1.6,
          maxWidth: 380,
          margin: '0 auto 24px',
          color: 'var(--text-secondary)'
        }}>
          Take or choose a photo of waste material for AI classification
        </div>

        <div
          style={{
            border: isDragging ? '3px dashed var(--accent)' : '2px dashed #d1d5db',
            borderRadius: 16,
            padding: isMobile ? '24px 16px' : '32px 20px',
            marginBottom: 20,
            background: isDragging ? 'rgba(102, 126, 234, 0.05)' : 'rgba(249, 250, 251, 0.8)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => inputRef.current.click()}
        >
          <div style={{ fontSize: isMobile ? 28 : 36, marginBottom: 12 }}>
            {isDragging ? '📥' : '🖼️'}
          </div>
          <div style={{
            fontSize: isMobile ? 14 : 16,
            color: 'var(--text-secondary)',
            fontWeight: 600
          }}>
            {isDragging ? 'Drop here' : 'Drag & drop or click'}
          </div>
          <div style={{
            fontSize: isMobile ? 11 : 13,
            color: 'var(--text-muted)',
            marginTop: 8
          }}>
            JPG, PNG, WebP (Min 224x224)
          </div>
        </div>

        {/* Action buttons */}
        {isMobile ? (
          // Mobile: Two buttons in grid
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginBottom: 16
          }}>
            <button
              className="btn"
              onClick={() => inputRef.current.click()}
              disabled={loading}
              style={{ justifyContent: 'center', gap: '10px' }}
            >
              <span>📁</span>
              <span>Choose File</span>
            </button>

            <button
              className="btn"
              onClick={() => cameraRef.current.click()}
              disabled={loading}
              style={{
                justifyContent: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
              }}
            >
              <span>📷</span>
              <span>Take Photo</span>
            </button>
          </div>
        ) : (
          // Desktop: Single button full width
          <button
            className="btn"
            onClick={() => inputRef.current.click()}
            disabled={loading}
            style={{ width: '100%', justifyContent: 'center', gap: '10px', marginBottom: 16 }}
          >
            <span>📁</span>
            <span>Choose File</span>
          </button>
        )}

        {/* Guide button */}
        <button
          onClick={() => setShowGuide(!showGuide)}
          style={{
            background: 'transparent',
            border: '1px solid var(--accent)',
            color: 'var(--accent)',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 600,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent)'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--accent)'
          }}
        >
          {isMobile && showGuide ? '✕ Close Guide' : '❓ What can I classify?'}
        </button>

        {/* Mobile: Inline category guide */}
        {isMobile && showGuide && (
          <div style={{
            marginTop: 16,
            padding: 16,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
            borderRadius: 12,
            border: '1px solid rgba(102, 126, 234, 0.2)',
            textAlign: 'left',
            animation: 'slideInUp 0.3s ease',
            maxHeight: '300px',
            overflowY: 'auto'
          }}>
            <div style={{
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 12,
              color: 'var(--text-primary)'
            }}>
              📋 Supported Categories
            </div>
            <div style={{
              display: 'grid',
              gap: 8,
              fontSize: 12
            }}>
              {exampleCategories.map((cat, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: 8,
                  background: 'var(--card-bg)',
                  borderRadius: 8,
                  border: '1px solid rgba(0,0,0,0.05)'
                }}>
                  <span style={{ fontSize: 20 }}>{cat.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {cat.name}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                      {cat.examples}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hidden inputs */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
      </div>

      {/* Desktop: Modal popup for category guide */}
      {!isMobile && showGuide && (
        <div
          onClick={() => setShowGuide(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: 20,
            animation: 'fadeIn 0.3s ease',
            backdropFilter: 'blur(4px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--card-bg)',
              borderRadius: 20,
              padding: 32,
              maxWidth: 500,
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              animation: 'bounceIn 0.5s ease'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24
            }}>
              <div style={{
                fontSize: 22,
                fontWeight: 700,
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}>
                <span style={{ fontSize: 28 }}>📋</span>
                <span>Supported Categories</span>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.05)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none'
                  e.currentTarget.style.color = 'var(--text-muted)'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              display: 'grid',
              gap: 12,
              marginBottom: 20
            }}>
              {exampleCategories.map((cat, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: 14,
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                  borderRadius: 12,
                  border: '1px solid rgba(102, 126, 234, 0.15)',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.15)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <span style={{ fontSize: 32 }}>{cat.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      fontSize: 15,
                      marginBottom: 4
                    }}>
                      {cat.name}
                    </div>
                    <div style={{
                      color: 'var(--text-secondary)',
                      fontSize: 13,
                      lineHeight: 1.5
                    }}>
                      {cat.examples}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowGuide(false)}
              className="btn"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
