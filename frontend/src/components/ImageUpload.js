import React, { useRef, useState } from 'react'

export default function ImageUpload({ onUpload, loading, onReset }) {
  const inputRef = useRef()
  const [preview, setPreview] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const onFileChange = (e) => {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    handleFile(f)
  }

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file))
      if (onUpload) onUpload(file)
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

  // Show large image view after upload
  if (preview) {
    return (
      <div className="card upload-card">
        <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{
            fontSize: 20,
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
              padding: '12px'
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
          fontSize: 64,
          marginBottom: 16,
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
        }}>
          📸
        </div>
        <div style={{
          fontSize: 24,
          fontWeight: 700,
          color: 'var(--text-primary)',
          marginBottom: 12,
          letterSpacing: '-0.5px'
        }}>
          Upload Waste Image
        </div>
        <div className="muted" style={{
          fontSize: 15,
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
            padding: '32px 20px',
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
          <div style={{ fontSize: 36, marginBottom: 12 }}>
            {isDragging ? '📥' : '🖼️'}
          </div>
          <div style={{
            fontSize: 16,
            color: 'var(--text-secondary)',
            fontWeight: 600
          }}>
            {isDragging ? 'Drop here' : 'Drag & drop or click'}
          </div>
          <div style={{
            fontSize: 13,
            color: 'var(--text-muted)',
            marginTop: 8
          }}>
            JPG, PNG, WebP
          </div>
        </div>

        <button
          className="btn"
          onClick={() => inputRef.current.click()}
          disabled={loading}
          style={{ width: '100%', justifyContent: 'center', gap: '10px' }}
        >
          <span>📁</span>
          <span>Choose File</span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onFileChange}
        />
      </div>
    </div>
  )
}
