import { FONTS, TEXT_SIZES, TEXT_COLORS, TextStyle } from '../../types';

interface StyleControlsProps {
  titleStyle: TextStyle;
  nameStyle: TextStyle;
  bannerColor: string;
  onTitleStyleChange: (style: TextStyle) => void;
  onNameStyleChange: (style: TextStyle) => void;
  onBannerColorChange: (color: string) => void;
}

const FONT_OPTIONS = [
  { label: 'Open Sans', value: "'Open Sans', serif" },
  { label: 'Lato', value: "'Lato', serif" },
  { label: 'Helvetica Neue', value: "'Helvetica Neue', serif" },
  { label: 'Garamond', value: "'Garamond', serif" },
  { label: 'Georgia', value: "'Georgia', serif" },
  { label: 'Harry P', value: "'Harry P', serif" },
  { label: 'Montserrat', value: "'Montserrat', sans-serif" },
];



const SIZE_OPTIONS = [
  { label: 'Klein', value: 24 },
  { label: 'Mittel', value: 36 },
  { label: 'Groß', value: 48 },
];

const COLOR_OPTIONS = [
  { label: 'Weiß', value: '#FFFFFF' },
  { label: 'Gold', value: '#FFD700' },
  { label: 'Silber', value: '#C0C0C0' },
  { label: 'Marineblau', value: '#0f2027' },
  { label: 'Burgunderrot', value: '#800020' },
  { label: 'Benutzerdefiniert', value: 'custom' },
];


function parseRGBA(rgbaStr: string) {
  const result = /rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d\.]+)?\)/.exec(rgbaStr);
  if (!result) return null;
  const [_, r, g, b, a = '1'] = result;
  return { r: parseInt(r), g: parseInt(g), b: parseInt(b), a: parseFloat(a) };
}

function buildRGBA({ r, g, b, a }: { r: number; g: number; b: number; a: number }) {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export default function StyleControls({
  titleStyle,
  nameStyle,
  bannerColor,
  onTitleStyleChange,
  onNameStyleChange,
  onBannerColorChange,
}: StyleControlsProps) {
  const rgba = parseRGBA(bannerColor) || { r: 255, g: 255, b: 255, a: 1 };

  return (
    <div className="space-y-6">
      {/* Banner-Stil */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Banner-Stil</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Farbe</label>
          <input
            type="color"
            value={`#${((1 << 24) + (rgba.r << 16) + (rgba.g << 8) + rgba.b)
              .toString(16)
              .slice(1)}`}
            onChange={(e) => {
              const colorHex = e.target.value;
              const r = parseInt(colorHex.slice(1, 3), 16);
              const g = parseInt(colorHex.slice(3, 5), 16);
              const b = parseInt(colorHex.slice(5, 7), 16);
              const newColor = buildRGBA({ r, g, b, a: rgba.a });
              onBannerColorChange(newColor);
            }}
            className="mt-2"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Transparenz</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={rgba.a}
            onChange={(e) => {
              const transparency = parseFloat(e.target.value);
              const newColor = buildRGBA({ ...rgba, a: transparency });
              onBannerColorChange(newColor);
            }}
          />
        </div>
      </div>

      {/* Titel-Stil */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Titel-Stil</h3>
        {/* Schriftart */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Schriftart</label>
          <select
            value={titleStyle.font}
            onChange={(e) => onTitleStyleChange({ ...titleStyle, font: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {FONT_OPTIONS.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
        {/* Schriftgröße */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Schriftgröße</label>
          <select
            value={titleStyle.size}
            onChange={(e) =>
              onTitleStyleChange({ ...titleStyle, size: parseInt(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {SIZE_OPTIONS.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
            <option value="custom">Benutzerdefiniert</option>
          </select>
          {titleStyle.size === 'custom' && (
            <input
              type="number"
              min="10"
              max="100"
              value={titleStyle.size}
              onChange={(e) =>
                onTitleStyleChange({ ...titleStyle, size: parseInt(e.target.value) })
              }
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          )}
        </div>
        {/* Schriftfarbe */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Schriftfarbe</label>
          <select
            value={TEXT_COLORS[titleStyle.color] ? titleStyle.color : 'custom'}
            onChange={(e) => {
              if (e.target.value === 'custom') {
                // Nichts tun, bis der Benutzer eine Farbe auswählt
              } else {
                onTitleStyleChange({ ...titleStyle, color: e.target.value });
              }
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {COLOR_OPTIONS.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
          {(!TEXT_COLORS[titleStyle.color] || titleStyle.color === 'custom') && (
            <input
              type="color"
              value={titleStyle.color}
              onChange={(e) =>
                onTitleStyleChange({ ...titleStyle, color: e.target.value })
              }
              className="mt-2"
            />
          )}
        </div>
      </div>

      {/* Name-Stil */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Name-Stil</h3>
        {/* Wiederholen Sie die gleichen Steuerungselemente wie für den Titel */}
        {/* Schriftart */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Schriftart</label>
          <select
            value={nameStyle.font}
            onChange={(e) => onNameStyleChange({ ...nameStyle, font: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {FONT_OPTIONS.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
        {/* Schriftgröße */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Schriftgröße</label>
          <select
            value={nameStyle.size}
            onChange={(e) =>
              onNameStyleChange({ ...nameStyle, size: parseInt(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {SIZE_OPTIONS.map((size) => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
            <option value="custom">Benutzerdefiniert</option>
          </select>
          {nameStyle.size === 'custom' && (
            <input
              type="number"
              min="10"
              max="100"
              value={nameStyle.size}
              onChange={(e) =>
                onNameStyleChange({ ...nameStyle, size: parseInt(e.target.value) })
              }
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          )}
        </div>
        {/* Schriftfarbe */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Schriftfarbe</label>
          <select
            value={TEXT_COLORS[nameStyle.color] ? nameStyle.color : 'custom'}
            onChange={(e) => {
              if (e.target.value === 'custom') {
                // Nichts tun, bis der Benutzer eine Farbe auswählt
              } else {
                onNameStyleChange({ ...nameStyle, color: e.target.value });
              }
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {COLOR_OPTIONS.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
          {(!TEXT_COLORS[nameStyle.color] || nameStyle.color === 'custom') && (
            <input
              type="color"
              value={nameStyle.color}
              onChange={(e) =>
                onNameStyleChange({ ...nameStyle, color: e.target.value })
              }
              className="mt-2"
            />
          )}
        </div>
      </div>
    </div>
  );
}
