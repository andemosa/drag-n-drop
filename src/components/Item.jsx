/* eslint-disable react/prop-types */
import { useDrag, useDrop } from "react-dnd";
import { Badge, Card } from "flowbite-react";

const Item = ({ image, index, moveImage }) => {
  const [, ref] = useDrag({
    type: "GALLERY_ITEM",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "GALLERY_ITEM",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        ref(drop(node));
      }}
      className="cursor-pointer"
    >
      <Card key={image.id} imgAlt={image.title} imgSrc={image.img}>
        <div className="flex gap-2 p-2">
          {image.category.map((item) => (
            <Badge color="info" key={item}>
              {item}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Item;
