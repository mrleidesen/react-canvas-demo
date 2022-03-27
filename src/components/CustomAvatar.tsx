import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';

import eye1Image from '@/assets/eye1.png';
import eye2Image from '@/assets/eye2.png';
import faceImage from '@/assets/face.png';
import mouth1Image from '@/assets/mouth1.png';
import mouth2Image from '@/assets/mouth2.png';
import { saveCanvasToImage } from '@/utils';

export const CustomAvatar: React.FC = () => {
  const [avatarConfig, setAvatarConfig] = useState({
    face: 0,
    eye: 0,
    mouth: 0,
  });

  const faceImages = [faceImage];
  const eyeImages = [eye1Image, eye2Image];
  const mouthImages = [mouth1Image, mouth2Image];

  const avatarRef = useRef<HTMLDivElement>(null);
  const avatarWidth = 384;

  const onChangeConfig = (type: 'face' | 'eye' | 'mouth' = 'face', idx = 0) => {
    setAvatarConfig((config) => {
      config[type] = idx;
      return { ...config };
    });
  };

  const onSave = () => {
    if (avatarRef.current) {
      html2canvas(avatarRef.current).then((canvas) => {
        saveCanvasToImage(canvas, 'avatar');
      });
    }
  };

  return (
    <div>
      <div
        ref={avatarRef}
        className="border border-gray-200 relative"
        style={{
          width: avatarWidth,
          height: avatarWidth,
        }}
      >
        <img
          className="absolute inset-0"
          src={faceImages[avatarConfig.face]}
          alt="face"
        />
        <img
          className="absolute inset-0"
          src={eyeImages[avatarConfig.eye]}
          alt="eye"
        />
        <img
          className="absolute inset-0"
          src={mouthImages[avatarConfig.mouth]}
          alt="mouth"
        />
      </div>

      <div className="flex gap-4 mb-4">
        {faceImages.map((image, index) => (
          <button key={image} onClick={() => onChangeConfig('face', index)}>
            <img
              className="w-24 h-24 border border-gray-200"
              src={image}
              alt=""
            />
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-4">
        {eyeImages.map((image, index) => (
          <button key={image} onClick={() => onChangeConfig('eye', index)}>
            <img
              className="w-24 h-24 border border-gray-200"
              src={image}
              alt=""
            />
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-4">
        {mouthImages.map((image, index) => (
          <button key={image} onClick={() => onChangeConfig('mouth', index)}>
            <img
              className="w-24 h-24 border border-gray-200"
              src={image}
              alt=""
            />
          </button>
        ))}
      </div>

      <button onClick={onSave}>Save Avatar</button>
    </div>
  );
};
