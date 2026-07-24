import { FlyerConfig } from '../types';

interface FlyerPreviewProps {
  config: FlyerConfig;
  selectedStyle: { name: string; description: string; bg: string; accent: string };
}

export function FlyerPreview({ config, selectedStyle: _style }: FlyerPreviewProps) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      background: '#0f0f23',
    }}>
      <div
        style={{
          width: '600px',
          height: '800px',
          background: config.backgroundColor,
          color: config.accentColor,
          padding: '40px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Style-specific decorations */}
        {config.style === 'bold' && (
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '200px',
            height: '200px',
            background: 'rgba(233, 69, 96, 0.1)',
            borderRadius: '0 0 0 100%',
          }} />
        )}
        {config.style === 'elegant' && (
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            bottom: '20px',
            border: '1px solid rgba(44, 62, 80, 0.2)',
            pointerEvents: 'none',
          }} />
        )}
        {config.style === 'modern' && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '300px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
            pointerEvents: 'none',
          }} />
        )}
        {config.style === 'vintage' && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(139, 69, 19, 0.03) 10px, rgba(139, 69, 19, 0.03) 20px)',
            pointerEvents: 'none',
          }} />
        )}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Images */}
          {config.images.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: config.images.length === 1 ? '1fr' : '1fr 1fr',
              gap: '15px',
              marginBottom: '20px',
            }}>
              {config.images.slice(0, 4).map((img) => (
                <div
                  key={img.id}
                  style={{
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden',
                    borderRadius: config.style === 'minimal' ? '0' : '8px',
                    boxShadow: config.style === 'elegant' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Title */}
          {config.title && (
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '10px',
              letterSpacing: config.style === 'minimal' ? '2px' : 'normal',
              textTransform: config.style === 'bold' ? 'uppercase' : 'none',
            }}>
              {config.title}
            </h1>
          )}

          {/* Subtitle */}
          {config.subtitle && (
            <p style={{
              fontSize: '24px',
              marginBottom: '20px',
              opacity: 0.8,
              fontStyle: config.style === 'elegant' ? 'italic' : 'normal',
            }}>
              {config.subtitle}
            </p>
          )}

          {/* Text Elements */}
          {config.texts.length > 0 && (
            <div style={{
              marginBottom: '20px',
              flex: 1,
            }}>
              {config.texts.map((text) => (
                <p
                  key={text.id}
                  style={{
                    fontSize: `${text.fontSize}px`,
                    fontWeight: text.fontWeight,
                    color: text.color,
                    textAlign: text.alignment,
                    marginBottom: '10px',
                    lineHeight: 1.4,
                  }}
                >
                  {text.content}
                </p>
              ))}
            </div>
          )}

          {/* Data Elements */}
          {config.data.length > 0 && (
            <div style={{
              marginBottom: '20px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              padding: '15px',
              background: config.style === 'modern' ? 'rgba(255,255,255,0.1)' : 'transparent',
              borderRadius: config.style === 'modern' ? '8px' : '0',
            }}>
              {config.data.map((item) => (
                <div key={item.id}>
                  <div style={{ fontSize: '12px', opacity: 0.6, marginBottom: '2px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '20px',
            borderTop: config.style === 'elegant' ? '1px solid rgba(44, 62, 80, 0.2)' : 'none',
            fontSize: '12px',
            opacity: 0.5,
            textAlign: 'center',
          }}>
            Generated with Flyer Generator
          </div>
        </div>
      </div>
    </div>
  );
}
