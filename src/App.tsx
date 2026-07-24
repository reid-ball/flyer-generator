import { useState, useCallback } from 'react';
import { FlyerConfig, DEFAULT_CONFIG, FLYER_STYLES } from './types';
import { FlyerEditor } from './components/FlyerEditor';
import { FlyerPreview } from './components/FlyerPreview';

export default function App() {
  const [config, setConfig] = useState<FlyerConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  const updateConfig = useCallback((updates: Partial<FlyerConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const handleImageUpload = useCallback((files: FileList) => {
    const newImages = Array.from(files).slice(0, 5 - config.images.length);
    const imagePromises = newImages.map(file => {
      return new Promise<FlyerConfig['images'][0]>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.onload = () => {
            resolve({
              id: Math.random().toString(36).substr(2, 9),
              src: e.target?.result as string,
              name: file.name,
              width: img.width,
              height: img.height,
            });
          };
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      updateConfig({ images: [...config.images, ...images] });
    });
  }, [config.images, updateConfig]);

  const removeImage = useCallback((imageId: string) => {
    updateConfig({ images: config.images.filter(img => img.id !== imageId) });
  }, [config.images, updateConfig]);

  const handleExport = useCallback(async () => {
    // Export implementation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 1600;
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, 1200, 1600);

    // Render images
    config.images.forEach((img, i) => {
      const image = new Image();
      image.src = img.src;
      const width = Math.min(400, img.width);
      const height = (img.height / img.width) * width;
      const x = 400 + (i % 2) * 400;
      const y = 100 + Math.floor(i / 2) * 500;
      ctx.drawImage(image, x, y, width, height);
    });

    // Render text
    ctx.fillStyle = config.accentColor;
    ctx.font = 'bold 48px Arial';
    ctx.fillText(config.title, 50, 100);
    ctx.font = '24px Arial';
    ctx.fillText(config.subtitle, 50, 150);

    // Download
    const link = document.createElement('a');
    link.download = 'flyer.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, [config]);

  const selectedStyle = FLYER_STYLES[config.style];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1a2e',
      color: '#e0e0e0',
    }}>
      {/* Header */}
      <header style={{
        padding: '20px 40px',
        background: '#16213e',
        borderBottom: '1px solid #0f3460',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          🎨 Flyer Generator
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setActiveTab('edit')}
            style={{
              padding: '8px 16px',
              background: activeTab === 'edit' ? '#e94560' : '#0f3460',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Edit
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            style={{
              padding: '8px 16px',
              background: activeTab === 'preview' ? '#e94560' : '#0f3460',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Preview
          </button>
          <button
            onClick={handleExport}
            style={{
              padding: '8px 16px',
              background: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Export PNG
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
        {activeTab === 'edit' ? (
          <FlyerEditor
            config={config}
            onConfigChange={updateConfig}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
          />
        ) : (
          <FlyerPreview
            config={config}
            selectedStyle={selectedStyle}
          />
        )}
      </main>
    </div>
  );
}
