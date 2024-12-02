import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { toast } from 'react-hot-toast';
import PreviewCanvas from '../components/ImageEditor/PreviewCanvas';
import StyleControls from '../components/ImageEditor/StyleControls';
import {
  Frame,
  Decoration,
  TextStyle,
  TextPosition,
  FONTS,
  TEXT_SIZES,
  TEXT_COLORS,
  FRAMES,
} from '../types';

const decorations: Decoration[] = [
  { id: 'medal-gold', name: 'Goldmedaille', image: '/decorations/medal-gold.png' },
  { id: 'number-one', name: 'Nummer 1', image: '/decorations/number-one.png' },
  { id: 'star', name: 'Stern', image: '/decorations/star.png' },
];

export default function Editor() {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState({ x: 300, y: 400 });
  const [selectedFrame, setSelectedFrame] = useState<Frame>(FRAMES[0]);
  const [activeDecorations, setActiveDecorations] = useState<
    Array<{ id: string; image: string; position: { x: number; y: number } }>
  >([]);
  const [title, setTitle] = useState('Mitarbeiter des Monats');
  const [name, setName] = useState('');
  const [titlePosition, setTitlePosition] = useState<TextPosition>({ x: 150, y: 20 });
  const [namePosition, setNamePosition] = useState<TextPosition>({ x: 150, y: 370 });
  const [titleStyle, setTitleStyle] = useState<TextStyle>({
    font: FONTS.TIMES_NEW_ROMAN,
    size: TEXT_SIZES.LARGE,
    color: TEXT_COLORS.GOLD,
  });
  const [nameStyle, setNameStyle] = useState<TextStyle>({
    font: FONTS.TIMES_NEW_ROMAN,
    size: TEXT_SIZES.MEDIUM,
    color: TEXT_COLORS.BLACK,
  });
  const [bannerColor, setBannerColor] = useState('rgba(255, 255, 255, 0.9)');

  const handleImageDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Bild darf nicht größer als 10MB sein');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setImage(reader.result);
    };
    reader.onerror = () => toast.error('Fehler beim Laden des Bildes');
    reader.readAsDataURL(file);
  };

  const handleLogoDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Logo darf nicht größer als 2MB sein');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setLogoImage(reader.result);
    };
    reader.onerror = () => toast.error('Fehler beim Laden des Logos');
    reader.readAsDataURL(file);
  };

  const handleAddDecoration = (decoration: Decoration) => {
    setActiveDecorations((prev) => [
      ...prev,
      {
        id: `${decoration.id}-${Date.now()}`,
        image: decoration.image,
        position: { x: 200, y: 200 },
      },
    ]);
  };

  const handleDecorationMove = (id: string, position: { x: number; y: number }) => {
    setActiveDecorations((prev) =>
      prev.map((dec) => (dec.id === id ? { ...dec, position } : dec))
    );
  };

  const handleContinue = () => {
    if (!image) {
      toast.error('Bitte laden Sie ein Bild hoch');
      return;
    }
    if (!name) {
      toast.error('Bitte geben Sie einen Namen ein');
      return;
    }
    toast.success('Daten erfolgreich übermittelt! Weiterleitung zur Bestellung...');
    navigate('/checkout', {
      state: {
        frame: selectedFrame,
        hasLogo: !!logoImage,
        decorationsCount: activeDecorations.length,
        title,
        name,
        titleStyle,
        nameStyle,
        titlePosition,
        namePosition,
        bannerColor, // Bannerfarbe zur Bestellung hinzufügen
      },
    });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Linke Spalte: Vorschau */}
        <div className="lg:sticky lg:top-4 h-fit bg-gray-50 rounded-lg p-4 shadow">
          {!image ? (
            <Dropzone onDrop={handleImageDrop} accept={{ 'image/*': [] }}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-500 bg-white"
                >
                  <input {...getInputProps()} />
                  <p className="mt-2 text-gray-600">
                    Bild hier ablegen oder klicken zum Auswählen
                  </p>
                  <p className="text-sm text-gray-500">Max. 10MB, empfohlen: 2000x3000px</p>
                </div>
              )}
            </Dropzone>
          ) : (
            <>
              {/* Hinweistext */}
              <p className="italic text-gray-600 mb-4">
              Elemente lassen sich durch Ziehen verschieben.
              </p>
              <PreviewCanvas
                image={image}
                logo={logoImage}
                logoPosition={logoPosition}
                decorations={activeDecorations}
                frame={selectedFrame}
                title={title}
                name={name}
                titleStyle={titleStyle}
                nameStyle={nameStyle}
                titlePosition={titlePosition}
                namePosition={namePosition}
                onLogoMove={setLogoPosition}
                onDecorationMove={handleDecorationMove}
                onTitleMove={setTitlePosition}
                onNameMove={setNamePosition}
                bannerColor={bannerColor} // Bannerfarbe an PreviewCanvas übergeben
              />
            </>
          )}
        </div>

        {/* Rechte Spalte: Steuerung */}
        <div className="space-y-6">
          {/* Texteingaben */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Text</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Titel</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Rahmenauswahl */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Rahmen</h2>
            <div className="grid grid-cols-2 gap-4">
              {FRAMES.map((frame) => (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrame(frame)}
                  className={`p-4 border rounded-lg ${
                    selectedFrame.id === frame.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200'
                  }`}
                >
                  <img src={frame.image} alt={frame.name} className="mb-2" />
                  <p>{frame.name}</p>
                  <p className="text-sm text-gray-500">{frame.price} €</p>
                </button>
              ))}
            </div>
          </div>

          {/* Logo-Upload */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Logo hochladen</h2>
            <Dropzone onDrop={handleLogoDrop} accept={{ 'image/*': [] }}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500"
                >
                  <input {...getInputProps()} />
                  <p className="text-sm text-gray-600">Logo hier ablegen (max. 2MB)</p>
                </div>
              )}
            </Dropzone>
          </div>

          {/* Stilbearbeitung */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Stil</h2>
            <StyleControls
              titleStyle={titleStyle}
              nameStyle={nameStyle}
              onTitleStyleChange={setTitleStyle}
              onNameStyleChange={setNameStyle}
              bannerColor={bannerColor} // Bannerfarbe an StyleControls übergeben
              onBannerColorChange={setBannerColor}
            />
          </div>

          {/* Dekorationen */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Dekorationen</h2>
            <div className="grid grid-cols-3 gap-4">
              {decorations.map((decoration) => (
                <button
                  key={decoration.id}
                  onClick={() => handleAddDecoration(decoration)}
                  className="p-4 border rounded-lg border-gray-200 hover:border-indigo-500"
                >
                  <img src={decoration.image} alt={decoration.name} className="mb-2" />
                  <p>{decoration.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Weiter-Button */}
          <button
            onClick={handleContinue}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700"
          >
            Weiter zur Bestellung
          </button>
        </div>
      </div>
    </>
  );
}
