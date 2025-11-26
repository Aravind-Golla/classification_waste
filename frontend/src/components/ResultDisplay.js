import React from 'react'

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

export default function ResultDisplay({ result, loading, error }) {
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
            fontSize: 20,
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.3px'
          }}>
            Analyzing image...
          </div>
          <div style={{
            fontSize: 15,
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
    return (
      <div className="card result-card fade-in">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          padding: '48px 24px'
        }}>
          <div style={{ fontSize: 72 }}>⚠️</div>
          <div style={{
            fontSize: 22,
            fontWeight: 600,
            color: 'var(--danger)',
            letterSpacing: '-0.3px'
          }}>
            Analysis Failed
          </div>
          <div style={{
            fontSize: 15,
            color: 'var(--text-secondary)',
            textAlign: 'center',
            maxWidth: 360,
            lineHeight: 1.6
          }}>
            {error}
          </div>
          <div style={{
            fontSize: 14,
            color: 'var(--text-muted)',
            marginTop: 8
          }}>
            Please try uploading a different image
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
            fontSize: 80, 
            opacity: 0.3,
            animation: 'pulse 3s ease-in-out infinite'
          }}>
            📊
          </div>
          <div style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--text-primary)',
            textAlign: 'center',
            letterSpacing: '-0.3px'
          }}>
            Ready to Classify
          </div>
          <div style={{
            fontSize: 15,
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
                fontSize: 32,
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
    <div className="card result-card fade-in">
      {/* Header with main result */}
      <div style={{
        background: 'var(--gradient-primary)',
        margin: '-24px -24px 20px',
        padding: '32px 24px',
        borderRadius: '16px 16px 0 0',
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
            fontSize: 48,
            marginBottom: 12,
            textAlign: 'center',
            animation: 'bounceIn 0.6s ease'
          }}>
            {categoryIcon}
          </div>
          <div style={{
            fontSize: 28,
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
              fontSize: 14,
              marginBottom: 8,
              opacity: 0.9,
              fontWeight: 600
            }}>
              Confidence: {confidence}%
            </div>
            <div style={{
              height: 8,
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 12,
              overflow: 'hidden',
              maxWidth: 240,
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
              fontSize: 13,
              padding: '6px 14px',
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
        gap: 12,
        marginBottom: 16,
        animation: 'slideInUp 0.5s ease 0.2s both'
      }}>
        <div style={{
          padding: 12,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(102, 126, 234, 0.02) 100%)',
          borderRadius: 10,
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
            fontSize: 50,
            opacity: 0.1
          }}>
            {categoryIcon}
          </div>
          <div style={{
            fontSize: 12,
            color: 'var(--text-muted)',
            marginBottom: 6,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            position: 'relative',
            zIndex: 1
          }}>
            Category
          </div>
          <div style={{
            fontSize: 18,
            fontWeight: 700,
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            position: 'relative',
            zIndex: 1
          }}>
            <span style={{ fontSize: 24 }}>{categoryIcon}</span>
            <span>{result.category}</span>
          </div>
        </div>

        <div style={{
          padding: 14,
          background: result.degradable
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%)'
            : 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0.02) 100%)',
          borderRadius: 10,
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
            fontSize: 50,
            opacity: 0.1
          }}>
            {result.degradable ? '🌱' : '⚠️'}
          </div>
          <div style={{
            fontSize: 12,
            color: 'var(--text-muted)',
            marginBottom: 6,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            position: 'relative',
            zIndex: 1
          }}>
            Biodegradable
          </div>
          <div style={{
            fontSize: 18,
            fontWeight: 700,
            color: result.degradable ? 'var(--success)' : 'var(--danger)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            position: 'relative',
            zIndex: 1
          }}>
            <span style={{ fontSize: 20 }}>{result.degradable ? '✅' : '❌'}</span>
            <span>{result.degradable ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>

      {/* Recycling tip */}
      <div style={{
        marginTop: 20,
        padding: 18,
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)',
        borderRadius: 14,
        border: '1px solid rgba(102, 126, 234, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        animation: 'slideInUp 0.5s ease 0.4s both'
      }}>
        <div style={{
          position: 'absolute',
          top: -20,
          right: -20,
          fontSize: 70,
          opacity: 0.05,
          transform: 'rotate(-15deg)'
        }}>
          💡
        </div>
        <div style={{
          fontSize: 15,
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
            fontSize: 18
          }}>💡</span>
          <span>Disposal Tip</span>
        </div>
        <div style={{
          fontSize: 14,
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          position: 'relative',
          zIndex: 1
        }}>
          {result.degradable
            ? 'This material is biodegradable. Consider composting or dispose in organic waste bins.'
            : `This is non-biodegradable ${result.category?.toLowerCase()} waste. Please dispose in appropriate recycling bins.`}
        </div>
      </div>
    </div>
  )
}
