import { FlyerConfig, FlyerStyle, FLYER_STYLES } from '../types';

interface FlyerEditorProps {
  config: FlyerConfig;
  onConfigChange: (updates: Partial<FlyerConfig>) => void;
  onImageUpload: (files: FileList) => void;
  onRemoveImage: (imageId: string) => void;
}

export function FlyerEditor({ config, onConfigChange, onImageUpload, onRemoveImage }: FlyerEditorProps) {
  const handleStyleChange = (style: FlyerStyle) => {
    const styleConfig = FLYER_STYLES[style];
    onConfigChange({
      style,
      backgroundColor: styleConfig.bg,
      accentColor: styleConfig.accent,
    });
  };

  const handleTextAdd = () => {
    const newText = {
      id: Math.random().toString(36).substr(2, 9),
      content: 'New Text',
      fontSize: 24,
      fontWeight: 'normal' as const,
      color: config.accentColor,
      alignment: 'left' as const,
    };
    onConfigChange({ texts: [...config.texts, newText] });
  };

  const handleDataAdd = () => {
    const newData = {
      id: Math.random().toString(36).substr(2, 9),
      label: 'Label',
      value: 'Value',
    };
    onConfigChange({ data: [...config.data, newData] });
  };

  return (
    <div style={{
      width: '400px',
      padding: '20px',
      background: '#16213e',
      borderRight: '1px solid #0f3460',
      overflowY: 'auto',
    }}>
      <h2 style={{ marginBottom: '20px', fontSize: '18px' }}>Editor</h2>

      {/* Style Selection */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Style</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {(Object.keys(FLYER_STYLES) as FlyerStyle[]).map((style) => (
            <button
              key={style}
              onClick={() => handleStyleChange(style)}
              style={{
                padding: '10px',
                background: config.style === style ? '#e94560' : '#0f3460',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{FLYER_STYLES[style].name}</div>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>{FLYER_STYLES[style].description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
        <input
          type="text"
          value={config.title}
          onChange={(e) => onConfigChange({ title: e.target.value })}
          style={{
            width: '100%',
            padding: '8px',
            background: '#0f3460',
            border: '1px solid #1a1a4e',
            borderRadius: '4px',
            color: 'white',
          }}
        />
      </div>

      {/* Subtitle */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Subtitle</label>
        <input
          type="text"
          value={config.subtitle}
          onChange={(e) => onConfigChange({ subtitle: e.target.value })}
          style={{
            width: '100%',
            padding: '8px',
            background: '#0f3460',
            border: '1px solid #1a1a4e',
            borderRadius: '4px',
            color: 'white',
          }}
        />
      </div>

      {/* Images */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Images ({config.images.length}/5)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => e.target.files && onImageUpload(e.target.files)}
          style={{ marginBottom: '10px' }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {config.images.map((img) => (
            <div key={img.id} style={{ position: 'relative' }}>
              <img
                src={img.src}
                alt={img.name}
                style={{
                  width: '100%',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
              <button
                onClick={() => onRemoveImage(img.id)}
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  background: '#e94560',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Texts */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <label style={{ fontWeight: 'bold' }}>Text Elements</label>
          <button
            onClick={handleTextAdd}
            style={{
              padding: '4px 8px',
              background: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            + Add
          </button>
        </div>
        {config.texts.map((text, index) => (
          <div key={text.id} style={{ marginBottom: '10px', padding: '10px', background: '#0f3460', borderRadius: '4px' }}>
            <input
              type="text"
              value={text.content}
              onChange={(e) => {
                const newTexts = [...config.texts];
                newTexts[index] = { ...text, content: e.target.value };
                onConfigChange({ texts: newTexts });
              }}
              style={{
                width: '100%',
                marginBottom: '5px',
                padding: '4px',
                background: '#1a1a4e',
                border: '1px solid #2a2a6e',
                borderRadius: '4px',
                color: 'white',
              }}
            />
            <div style={{ display: 'flex', gap: '5px' }}>
              <select
                value={text.fontSize}
                onChange={(e) => {
                  const newTexts = [...config.texts];
                  newTexts[index] = { ...text, fontSize: parseInt(e.target.value) };
                  onConfigChange({ texts: newTexts });
                }}
                style={{
                  padding: '4px',
                  background: '#1a1a4e',
                  border: '1px solid #2a2a6e',
                  borderRadius: '4px',
                  color: 'white',
                }}
              >
                {[12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48].map(size => (
                  <option key={size} value={size}>{size}px</option>
                ))}
              </select>
              <input
                type="color"
                value={text.color}
                onChange={(e) => {
                  const newTexts = [...config.texts];
                  newTexts[index] = { ...text, color: e.target.value };
                  onConfigChange({ texts: newTexts });
                }}
                style={{ width: '30px', height: '25px' }}
              />
              <button
                onClick={() => {
                  const newTexts = config.texts.filter(t => t.id !== text.id);
                  onConfigChange({ texts: newTexts });
                }}
                style={{
                  padding: '4px 8px',
                  background: '#e94560',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Data Elements */}
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <label style={{ fontWeight: 'bold' }}>Data Elements</label>
          <button
            onClick={handleDataAdd}
            style={{
              padding: '4px 8px',
              background: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            + Add
          </button>
        </div>
        {config.data.map((item, index) => (
          <div key={item.id} style={{ marginBottom: '10px', padding: '10px', background: '#0f3460', borderRadius: '4px' }}>
            <input
              type="text"
              value={item.label}
              onChange={(e) => {
                const newData = [...config.data];
                newData[index] = { ...item, label: e.target.value };
                onConfigChange({ data: newData });
              }}
              placeholder="Label"
              style={{
                width: '100%',
                marginBottom: '5px',
                padding: '4px',
                background: '#1a1a4e',
                border: '1px solid #2a2a6e',
                borderRadius: '4px',
                color: 'white',
              }}
            />
            <input
              type="text"
              value={item.value}
              onChange={(e) => {
                const newData = [...config.data];
                newData[index] = { ...item, value: e.target.value };
                onConfigChange({ data: newData });
              }}
              placeholder="Value"
              style={{
                width: '100%',
                padding: '4px',
                background: '#1a1a4e',
                border: '1px solid #2a2a6e',
                borderRadius: '4px',
                color: 'white',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
