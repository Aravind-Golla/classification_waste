import React, { useState, useEffect } from 'react'

const getRiskBadge = (risk) => {
  const map = {
    low: { emoji: '✅', class: 'badge-success', label: 'Low Risk' },
    medium: { emoji: '⚠️', class: 'badge-warning', label: 'Medium Risk' },
    high: { emoji: '🚨', class: 'badge-danger', label: 'High Risk' }
  }
  return map[risk] || map.low
}

const getCategoryIcon = (category) => {
  const map = {
    paper: '📄',
    plastic: '♻️',
    glass: '🫙',
    metal: '🪙',
    organic: '🌱',
    textile: '👕',
    unknown: '❓'
  }
  return map[category?.toLowerCase()] || '🗑️'
}

// Confetti component
const Confetti = () => {
  const colors = ['#667eea', '#764ba2', '#10b981', '#f59e0b', '#ef4444']
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)]
  }))

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {pieces.map(piece => (
        <div
          key={piece.id}
          style={{
            position: 'absolute',
            left: `${piece.left}%`,
            top: '-10px',
            width: '10px',
            height: '10px',
            background: piece.color,
            animation: `confettiFall 3s ease-out ${piece.delay}s forwards`,
            opacity: 0
          }}
        />
      ))}
    </div>
  )
}

// Learn More Modal
const LearnMoreModal = ({ category, onClose }) => {
  const recyclingInfo = {
    paper: {
      tips: ['Remove plastic tape and staples', 'Keep paper dry', 'Flatten boxes to save space'],
      facts: 'Recycling 1 ton of paper saves 17 trees and 7,000 gallons of water!',
      recyclable: true
    },
    plastic: {
      tips: ['Check recycling number (1-7)', 'Rinse containers', 'Remove caps', 'Avoid contaminated plastics'],
      facts: 'Only 9% of plastic waste ever produced has been recycled worldwide.',
      recyclable: true
    },
    glass: {
      tips: ['Rinse clean', 'Remove lids', 'Separate by color if required', 'Don\'t mix with ceramics'],
      facts: 'Glass can be recycled endlessly without loss of quality!',
      recyclable: true
    },
    metal: {
      tips: ['Rinse cans clean', 'Crush to save space', 'Keep lids attached', 'Aluminum is highly valuable'],
      facts: 'Recycling aluminum saves 95% of the energy needed to make new aluminum.',
      recyclable: true
    },
    organic: {
      tips: ['Compost at home', 'Separate from non-organics', 'Use organic bins', 'Avoid meat/dairy in home compost'],
      facts: 'Food waste in landfills produces methane, a potent greenhouse gas.',
      recyclable: false
    },
    textile: {
      tips: ['Donate wearable items', 'Repurpose old fabric', 'Find textile recycling centers', 'Avoid throwing away'],
      facts: 'Only 15% of textiles are recycled; the rest end up in landfills.',
      recyclable: true
    }
  }

  const info = recyclingInfo[category?.toLowerCase()] || recyclingInfo.paper

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        animation: 'fadeIn 0.3s ease'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: '32px',
          maxWidth: '500px',
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
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <span style={{ fontSize: 32 }}>{getCategoryIcon(category)}</span>
            <span style={{ textTransform: 'capitalize' }}>{category}</span>
          </div>
          <button
            onClick={onClose}
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
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          padding: 16,
          borderRadius: 12,
          marginBottom: 20,
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          <div style={{
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--accent)',
            marginBottom: 8
          }}>
            💡 Did you know?
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {info.facts}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontSize: 16,
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: 12
          }}>
            ♻️ Recycling Tips
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10
          }}>
            {info.tips.map((tip, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 10,
                fontSize: 14,
                color: 'var(--text-secondary)',
                padding: 12,
                background: 'rgba(249, 250, 251, 0.8)',
                borderRadius: 8,
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>✓</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="btn"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          Got it!
        </button>
      </div>
    </div>
  )
}

export default function ResultDisplay({ result, loading, error }) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showLearnMore, setShowLearnMore] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  // Show confetti on successful classification
  useEffect(() => {
    if (result && !loading) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }, [result, loading])

  // Share functionality
  const handleShare = async () => {
    const text = `I classified ${result.predicted_class} waste using AI! Confidence: ${(result.confidence * 100).toFixed(1)}% 🌱♻️`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Waste Classification Result',
          text: text,
          url: window.location.href
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text)
      alert('Result copied to clipboard!')
    }
  }

  // Download result as text
  const handleDownload = () => {
    const data = {
      class: result.predicted_class,
      confidence: `${(result.confidence * 100).toFixed(1)}%`,
      category: result.category,
      biodegradable: result.degradable ? 'Yes' : 'No',
      riskLevel: result.risk_level,
      disposalTip: result.disposal_tip,
      timestamp: new Date().toLocaleString()
    }

    const content = `WASTE CLASSIFICATION RESULT
============================
Class: ${data.class}
Confidence: ${data.confidence}
Category: ${data.category}
Biodegradable: ${data.biodegradable}
Risk Level: ${data.riskLevel}
Disposal Tip: ${data.disposalTip}
Classified on: ${data.timestamp}
============================
Generated by AI Waste Classifier`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `waste-classification-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading && !result) {
    return (
      <div className="card result-card fade-in">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 300,
          gap: 20
        }}>
          <div className="loading-spinner" />
          <div style={{
            fontSize: isMobile ? 18 : 20,
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.3px'
          }}>
            Analyzing image...
          </div>
          <div style={{
            fontSize: isMobile ? 13 : 15,
            color: 'var(--text-muted)',
            textAlign: 'center',
            maxWidth: 320,
            lineHeight: 1.6
          }}>
            Our AI is identifying the waste type and checking disposal guidelines
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    // Improved error handling with specific messages
    const getErrorMessage = () => {
      if (error.includes('Model not loaded')) {
        return {
          icon: '🤖',
          title: 'Model Not Ready',
          message: 'The AI model is still loading. Please wait a moment and try again.',
          suggestion: 'Check the backend connection status above'
        }
      } else if (error.includes('Failed to fetch') || error.includes('Network')) {
        return {
          icon: '🌐',
          title: 'Connection Error',
          message: 'Unable to connect to the backend server.',
          suggestion: 'Check if the backend is running and try again'
        }
      } else if (error.includes('image')) {
        return {
          icon: '🖼️',
          title: 'Invalid Image',
          message: 'The uploaded file is not a valid image.',
          suggestion: 'Please upload a JPG, PNG, or WebP image'
        }
      } else {
        return {
          icon: '⚠️',
          title: 'Analysis Failed',
          message: error,
          suggestion: 'Please try uploading a different, clearer image'
        }
      }
    }

    const errorInfo = getErrorMessage()

    return (
      <div className="card result-card fade-in">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          padding: isMobile ? '32px 16px' : '48px 24px'
        }}>
          <div style={{ fontSize: isMobile ? 60 : 72 }}>{errorInfo.icon}</div>
          <div style={{
            fontSize: isMobile ? 20 : 22,
            fontWeight: 600,
            color: 'var(--danger)',
            letterSpacing: '-0.3px'
          }}>
            {errorInfo.title}
          </div>
          <div style={{
            fontSize: isMobile ? 13 : 15,
            color: 'var(--text-secondary)',
            textAlign: 'center',
            maxWidth: 360,
            lineHeight: 1.6
          }}>
            {errorInfo.message}
          </div>
          <div style={{
            fontSize: isMobile ? 12 : 14,
            color: 'var(--text-muted)',
            marginTop: 8,
            padding: 12,
            background: 'rgba(239, 68, 68, 0.05)',
            borderRadius: 8,
            border: '1px solid rgba(239, 68, 68, 0.1)',
            textAlign: 'center'
          }}>
            💡 {errorInfo.suggestion}
          </div>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="card result-card">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 20,
          padding: '24px'
        }}>
          <div style={{
            fontSize: isMobile ? 64 : 80,
            opacity: 0.3,
            animation: 'pulse 3s ease-in-out infinite'
          }}>
            📊
          </div>
          <div style={{
            fontSize: isMobile ? 20 : 22,
            fontWeight: 700,
            color: 'var(--text-primary)',
            textAlign: 'center',
            letterSpacing: '-0.3px'
          }}>
            Ready to Classify
          </div>
          <div style={{
            fontSize: isMobile ? 13 : 15,
            color: 'var(--text-muted)',
            textAlign: 'center',
            maxWidth: 340,
            lineHeight: 1.7
          }}>
            Upload an image to see AI-powered waste classification and recycling recommendations
          </div>
          <div style={{
            display: 'flex',
            gap: 16,
            marginTop: 12,
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {['♻️', '🌱', '📦', '🗑️'].map((emoji, i) => (
              <div key={i} style={{
                fontSize: isMobile ? 28 : 32,
                opacity: 0.2,
                animation: `pulse 2s ease-in-out infinite ${i * 0.2}s`
              }}>
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const riskInfo = getRiskBadge(result.risk_level)
  const categoryIcon = getCategoryIcon(result.category)
  const confidence = result.confidence
    ? (result.confidence * 100).toFixed(1)
    : result.confidence_percentage?.toFixed(1) || '0.0'

  return (
    <>
      {showConfetti && <Confetti />}
      {showLearnMore && <LearnMoreModal category={result.category} onClose={() => setShowLearnMore(false)} />}

      <div className="card result-card fade-in">
        {/* Header with main result */}
        <div style={{
          background: 'var(--gradient-primary)',
          margin: isMobile ? '-18px -18px 16px' : '-24px -24px 20px',
          padding: isMobile ? '24px 18px' : '32px 24px',
          borderRadius: isMobile ? '14px 14px 0 0' : '16px 16px 0 0',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Animated background pattern */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              fontSize: isMobile ? 40 : 48,
              marginBottom: 12,
              textAlign: 'center',
              animation: 'bounceIn 0.6s ease'
            }}>
              {categoryIcon}
            </div>
            <div style={{
              fontSize: isMobile ? 24 : 28,
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: 12,
              textTransform: 'capitalize',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              letterSpacing: '-0.5px'
            }}>
              {result.predicted_class}
            </div>

            {/* Confidence progress bar */}
            <div style={{
              marginBottom: 12,
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: isMobile ? 13 : 14,
                marginBottom: 8,
                opacity: 0.9,
                fontWeight: 600
              }}>
                Confidence: {confidence}%
              </div>
              <div style={{
                height: isMobile ? 6 : 8,
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 12,
                overflow: 'hidden',
                maxWidth: isMobile ? 200 : 240,
                margin: '0 auto'
              }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,1) 100%)',
                  borderRadius: 12,
                  width: `${confidence}%`,
                  animation: 'expandWidth 0.8s ease-out',
                  boxShadow: '0 0 12px rgba(255,255,255,0.6)'
                }} />
              </div>
            </div>

            <div style={{
              marginTop: 16,
              display: 'flex',
              justifyContent: 'center',
              gap: 10,
              flexWrap: 'wrap'
            }}>
              <div className={`badge ${riskInfo.class}`} style={{
                background: 'rgba(255, 255, 255, 0.25)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontSize: isMobile ? 11 : 13,
                padding: isMobile ? '5px 12px' : '6px 14px',
                borderRadius: '20px',
                fontWeight: 600
              }}>
                <span style={{ marginRight: '6px' }}>{riskInfo.emoji}</span>
                <span>{riskInfo.label}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category & Degradable Info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: isMobile ? 10 : 12,
          marginBottom: isMobile ? 14 : 16,
          animation: 'slideInUp 0.5s ease 0.2s both'
        }}>
          <div style={{
            padding: isMobile ? 10 : 12,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(102, 126, 234, 0.02) 100%)',
            borderRadius: isMobile ? 8 : 10,
            border: '1px solid rgba(102, 126, 234, 0.15)',
            transition: 'all 0.3s ease',
            cursor: 'default',
            position: 'relative',
            overflow: 'hidden'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
            <div style={{
              position: 'absolute',
              top: -10,
              right: -10,
              fontSize: isMobile ? 40 : 50,
              opacity: 0.1
            }}>
              {categoryIcon}
            </div>
            <div style={{
              fontSize: isMobile ? 10 : 12,
              color: 'var(--text-muted)',
              marginBottom: isMobile ? 4 : 6,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              position: 'relative',
              zIndex: 1
            }}>
              Category
            </div>
            <div style={{
              fontSize: isMobile ? 16 : 18,
              fontWeight: 700,
              color: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? 6 : 8,
              position: 'relative',
              zIndex: 1
            }}>
              <span style={{ fontSize: isMobile ? 20 : 24 }}>{categoryIcon}</span>
              <span>{result.category}</span>
            </div>
          </div>

          <div style={{
            padding: isMobile ? 10 : 14,
            background: result.degradable
              ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%)'
              : 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0.02) 100%)',
            borderRadius: isMobile ? 8 : 10,
            border: `1px solid ${result.degradable
              ? 'rgba(16, 185, 129, 0.15)'
              : 'rgba(239, 68, 68, 0.15)'}`,
            transition: 'all 0.3s ease',
            cursor: 'default',
            position: 'relative',
            overflow: 'hidden'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = result.degradable
                ? '0 4px 12px rgba(16, 185, 129, 0.15)'
                : '0 4px 12px rgba(239, 68, 68, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
            <div style={{
              position: 'absolute',
              top: -10,
              right: -10,
              fontSize: isMobile ? 40 : 50,
              opacity: 0.1
            }}>
              {result.degradable ? '🌱' : '⚠️'}
            </div>
            <div style={{
              fontSize: isMobile ? 10 : 12,
              color: 'var(--text-muted)',
              marginBottom: isMobile ? 4 : 6,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              position: 'relative',
              zIndex: 1
            }}>
              Biodegradable
            </div>
            <div style={{
              fontSize: isMobile ? 16 : 18,
              fontWeight: 700,
              color: result.degradable ? 'var(--success)' : 'var(--danger)',
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? 6 : 8,
              position: 'relative',
              zIndex: 1
            }}>
              <span style={{ fontSize: isMobile ? 18 : 20 }}>{result.degradable ? '✅' : '❌'}</span>
              <span>{result.degradable ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>

        {/* Disposal tip */}
        <div style={{
          marginTop: isMobile ? 16 : 20,
          padding: isMobile ? 14 : 18,
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)',
          borderRadius: isMobile ? 12 : 14,
          border: '1px solid rgba(102, 126, 234, 0.2)',
          position: 'relative',
          overflow: 'hidden',
          animation: 'slideInUp 0.5s ease 0.4s both'
        }}>
          <div style={{
            position: 'absolute',
            top: -20,
            right: -20,
            fontSize: isMobile ? 60 : 70,
            opacity: 0.05,
            transform: 'rotate(-15deg)'
          }}>
            💡
          </div>
          <div style={{
            fontSize: isMobile ? 13 : 15,
            fontWeight: 600,
            marginBottom: 8,
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            position: 'relative',
            zIndex: 1
          }}>
            <span style={{
              animation: 'pulse 2s ease-in-out infinite',
              display: 'inline-block',
              fontSize: isMobile ? 16 : 18
            }}>💡</span>
            <span>Disposal Tip</span>
          </div>
          <div style={{
            fontSize: isMobile ? 12 : 14,
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            position: 'relative',
            zIndex: 1
          }}>
            {result.disposal_tip || (result.degradable
              ? 'This material is biodegradable. Consider composting or dispose in organic waste bins.'
              : `This is non-biodegradable ${result.category?.toLowerCase()} waste. Please dispose in appropriate recycling bins.`)}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{
          marginTop: isMobile ? 16 : 20,
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? 8 : 12,
          animation: 'slideInUp 0.5s ease 0.6s both'
        }}>
          <button
            onClick={() => setShowLearnMore(true)}
            style={{
              padding: isMobile ? '10px 16px' : '12px 20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: isMobile ? 8 : 10,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: isMobile ? 12 : 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}
          >
            <span>📚</span>
            <span>Learn More</span>
          </button>

          <button
            onClick={handleShare}
            style={{
              padding: isMobile ? '10px 16px' : '12px 20px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: isMobile ? 8 : 10,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: isMobile ? 12 : 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
          >
            <span>📤</span>
            <span>Share</span>
          </button>

          <button
            onClick={handleDownload}
            style={{
              padding: isMobile ? '10px 16px' : '12px 20px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: isMobile ? 8 : 10,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: isMobile ? 12 : 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}
          >
            <span>💾</span>
            <span>Download</span>
          </button>
        </div>
      </div>
    </>
  )
}
