import {
  BookBookmark,
  Bread,
  Camera,
  ClipboardText,
  Door,
  Gift,
  Guitar,
  HandsPraying,
  Lego,
  Lightbulb,
  Monitor,
} from "@phosphor-icons/react";

export const getIcons = (id, color, size, fill) => {
  const icons = {
    1: () => <Gift size={size} color={color} weight={fill} />,
    2: () => <Bread size={size} color={color} weight={fill} />,
    3: () => <Lightbulb size={size} color={color} weight={fill} />,
    4: () => <BookBookmark size={size} color={color} weight={fill} />,
    5: () => <HandsPraying size={size} color={color} weight={fill} />,
    6: () => <Guitar size={size} color={color} weight={fill} />,
    7: () => <Camera size={size} color={color} weight={fill} />,
    8: () => <Lego size={size} color={color} weight={fill} />,
    9: () => <ClipboardText size={size} color={color} weight={fill} />,
    10: () => <Door size={size} color={color} weight={fill} />,
    11: () => <Monitor size={size} color={color} weight={fill} />,
  };
  return icons[id];
};
