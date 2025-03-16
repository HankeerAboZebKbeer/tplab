import "../css/Lab.css";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  decodeImage,
  decodeFont,
} from "@rive-app/react-webgl2"; // Updated import for WebGL2

// Image paths
const imagePaths = {
  Clouds: "/images/Clouds-3408713",
  NewHills: "/images/NewHills-3496798.webp",
  Rock: "/images/Rock-3503387.webp",
  "Small rocks": "/images/Small rocks-3503388.webp",
};

// Audio paths
const audioPaths = {
  sound: "/audio/sound.mp3",
};

export const RiveDemo = () => {
  const { RiveComponent } = useRive({
    src: "teleport_labs_vector (2).riv", // Path to your Rive file
    stateMachines: "Main SM", // State machine controlling animation
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.CenterLeft,
    }),

    autoplay: true, // Automatically start the animation
    assetLoader: loadAllAssets, // Load images, fonts, and audio
  });

  return (
    <div className="RiveContainer">
      <RiveComponent />
    </div>
  );
};

const loadAllAssets = async (asset, bytes) => {
  if (asset.isImage) {
    const imagePath = imagePaths[asset.name];
    if (!imagePath) return false;

    const response = await fetch(imagePath);
    const imageBuffer = await response.arrayBuffer();
    const image = await decodeImage(new Uint8Array(imageBuffer));
    asset.setRenderImage(image);
    image.unref();
    return true;
  }

  if (asset.isFont) {
    const fontUrl = "/fonts/Inter-594377.ttf";
    const res = await fetch(fontUrl);
    const fontBuffer = await res.arrayBuffer();
    const font = await decodeFont(new Uint8Array(fontBuffer));
    asset.setFont(font);
    font.unref();
    return true;
  }

  if (asset.isAudio) {
    const audioPath = audioPaths[asset.name];
    if (!audioPath) return false;

    const response = await fetch(audioPath);
    const audioBuffer = await response.arrayBuffer();

    asset.decode(new Uint8Array(audioBuffer));

    return true;
  }

  return false; // Asset not found
};

export default function Lab() {
  return (
    <div className="RiveContainer">
      <RiveDemo />
    </div>
  );
}
