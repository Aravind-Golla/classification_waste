import React, { useState } from 'react'
import Header from './components/Header'
import ImageUpload from './components/ImageUpload'
import ResultDisplay from './components/ResultDisplay'

// Backend API URL from environment variable (.env file)
// Default: http://localhost:5000
const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'

export default function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [backendConnected, setBackendConnected] = useState(null) // null = checking, true/false

  // Check backend connection on mount
  React.useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/health`, { timeout: 3000 })
        setBackendConnected(res.ok)
      } catch {
        setBackendConnected(false)
      }
    }
    checkBackend()
    // Recheck every 30 seconds
    const interval = setInterval(checkBackend, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleUpload = async (file) => {
    setLoading(true)
    setError(null)
    setResult(null)
    setImagePreview(URL.createObjectURL(file))
    
    try {
      const form = new FormData()
      form.append('image', file)

      const res = await fetch(`${API_BASE}/api/predict`, {
        method: 'POST',
        body: form,
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || 'Server error')
      }
      const json = await res.json()
      setResult(json)
      setBackendConnected(true)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Upload failed')
      setBackendConnected(false)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
    setImagePreview(null)
  }

  return (
    <div className="app-root">
      <Header backendConnected={backendConnected} />
      <main className="container">
        <ImageUpload onUpload={handleUpload} loading={loading} onReset={handleReset} />
        <ResultDisplay 
          result={result} 
          loading={loading} 
          error={error}
        />
      </main>
    </div>
  )
}
