"use client";
import React from "react";
import { MouseEventHandler } from "react";
import LazeImage from "./components/RandomFox";
import "./globals.css"; //

//

// Component
export default function Home() {
  // Generate ID 
  const generateId = () => Math.random().toString(36).substr(2, 9);
  // funcion random [1-123]
  const random = (): number => Math.floor(Math.random() * 123 + 1);
  const image: string = `https://randomfox.ca/images/${random()}.jpg`;
  //
  const [images, setImages] = React.useState<Array<IFoxImageItem>>([]);
  //
  const btnNewFox: MouseEventHandler = (event) => {
    const newfox: IFoxImageItem = { id: generateId(), url: image };
    setImages([...images, newfox]);
  };
  // Render Component
  return (
    <main>
      <h1>Random Fox </h1>
      <button onClick={btnNewFox}>Add</button>
      {images.map(({ id, url }) => (
        <div key={id} className="p-4">
          <LazeImage
            src={url}
            alt=""
            width={320}
            height="auto"
            title="Random Fox"
            className="rounded bg-gray-300"
            onClick={() => console.log("hey")}
          />
        </div>
      ))}
    </main>
  );
}
