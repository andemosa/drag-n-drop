/* eslint-disable react/prop-types */

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

import Item from "./Item";

const Desktop = ({ cards }) => {
  const [images, setImages] = useState(cards);

  const moveImage = (fromIndex, toIndex) => {
    const updatedOrder = [...images];
    const [movedImage] = updatedOrder.splice(fromIndex, 1);
    updatedOrder.splice(toIndex, 0, movedImage);
    setImages(updatedOrder);
  };

  return (
    <DndProvider backend={TouchBackend}>
      <section className=" my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Item
            key={image.id}
            image={image}
            index={index}
            moveImage={moveImage}
          />
        ))}
      </section>
    </DndProvider>
  );
};

export default Desktop;
