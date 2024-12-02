import React, { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { Frame, TextStyle, TextPosition } from '../../types';

interface PreviewCanvasProps {
  image: string | null;
  logo: string | null;
  decorations: Array<{ id: string; image: string; position: { x: number; y: number } }>;
  frame: Frame;
  title: string;
  name: string;
  titleStyle: TextStyle;
  nameStyle: TextStyle;
  titlePosition: TextPosition;
  namePosition: TextPosition;
  logoPosition: { x: number; y: number };
  onLogoMove: (position: { x: number; y: number }) => void;
  onDecorationMove: (id: string, position: { x: number; y: number }) => void;
  onTitleMove: (position: TextPosition) => void;
  onNameMove: (position: TextPosition) => void;
  bannerColor: string;
}

export default function PreviewCanvas({
  image,
  logo,
  decorations,
  frame,
  title,
  name,
  titleStyle,
  nameStyle,
  titlePosition,
  namePosition,
  logoPosition,
  onLogoMove,
  onDecorationMove,
  onTitleMove,
  onNameMove,
  bannerColor,
}: PreviewCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const TARGET_ASPECT_RATIO = 2 / 3; // 10:15 Format

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const height = width / TARGET_ASPECT_RATIO;
        setContainerSize({ width, height });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-white rounded-lg shadow-lg"
      style={{
        width: '100%',
        height: containerSize.height,
        overflow: 'visible',
        padding: '0',
        position: 'relative',
      }}
    >
      {/* Rahmen */}
      <div
        style={{
          position: 'absolute',
          top: '-5%',
          left: '-5%',
          width: '110%',
          height: '110%',
          zIndex: 0,
          overflow: 'visible',
        }}
      >
        <img
          src={frame.image}
          alt="Rahmen"
          className="w-full h-full object-cover pointer-events-none"
          style={{
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Bild */}
      {image && (
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '7%',
            width: '85%',
            height: '80%',
            zIndex: 1,
          }}
        >
          <img
            src={image}
            alt="Hochgeladenes Bild"
            className="w-full h-full object-cover"
            style={{ borderRadius: '5px' }}
          />
        </div>
      )}

      {/* Banner mit Titel */}
      <Draggable
        position={titlePosition}
        onStop={(e, data) => onTitleMove({ x: data.x, y: data.y })}
        bounds="parent"
      >
        <div
          style={{
            position: 'absolute',
            top: '9%', // Angepasste Positionierung
            left: '-16%', // Angepasste Positionierung
            right: '37%',
            zIndex: 3,
            cursor: 'move',
          }}
        >
          <div
            style={{
              backgroundColor: bannerColor,
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontFamily: titleStyle.font || 'Times New Roman, serif',
                fontSize: `${titleStyle.size * 0.7}px`,
                color: titleStyle.color || 'black',
                fontWeight: 'bold',
              }}
            >
              {title}
            </span>
          </div>
        </div>
      </Draggable>



      {/* Name */}
      <Draggable
        position={namePosition}
        onStop={(e, data) => onNameMove({ x: data.x, y: data.y })}
        bounds="parent"
      >
        <div
          style={{
            position: 'absolute',
            bottom: '56%', // Angepasste Positionierung
            left: '15%', // Angepasste Positionierung
            transform: 'translateX(-50%)',
            zIndex: 2,
            cursor: 'move',
          }}
        >
          <span
            style={{
              fontFamily: nameStyle.font || 'Times New Roman, serif',
              fontSize: `${nameStyle.size * 0.6}px`,
              color: nameStyle.color || 'black',
              fontWeight: 'bold',
            }}
          >
            {name}
          </span>
        </div>
      </Draggable>

      {/* Logo */}
      {logo && (
        <Draggable
          position={logoPosition}
          onStop={(e, data) => onLogoMove({ x: data.x, y: data.y })}
          bounds="parent"
        >
          <div
            style={{
              position: 'absolute',
              zIndex: 999,
              cursor: 'move',
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: `${containerSize.width * 0.1}px`,
                height: 'auto',
                border: '0.1px solid black',
                borderRadius: '5px',
              }}
            />
          </div>
        </Draggable>
      )}

      {/* Dekorationen */}
      {decorations.map((decoration) => (
        <Draggable
          key={decoration.id}
          position={decoration.position}
          onStop={(e, data) => onDecorationMove(decoration.id, { x: data.x, y: data.y })}
          bounds="parent"
        >
          <div
            style={{
              position: 'absolute',
              zIndex: 2,
              cursor: 'move',
            }}
          >
            <img
              src={decoration.image}
              alt={decoration.name}
              style={{
                width: '50px',
                height: '50px',
              }}
            />
          </div>
        </Draggable>
      ))}
    </div>
  );
}
