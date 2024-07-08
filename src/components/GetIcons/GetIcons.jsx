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

export const getIcons = (sector, color, size, fill) => {
  switch (sector) {
    case "Recepção":
      return <Door size={size} color={color} weight={fill} />;
    case "Louvor":
      return <Guitar size={size} color={color} weight={fill} />;
    case "Mídia":
      return <Camera size={size} color={color} weight={fill} />;
    case "Organização":
      return <ClipboardText size={size} color={color} weight={fill} />;
    case "Kids":
      return <Lego size={size} color={color} weight={fill} />;
    case "Projetor":
      return <Monitor size={size} color={color} weight={fill} />;
    case "Intercessão":
      return <HandsPraying size={size} color={color} weight={fill} />;
    case "Consolidação":
      return <Gift size={size} color={color} weight={fill} />;
    case "Ceia":
      return <Bread size={size} color={color} weight={fill} />;
    case "Cenografia":
      return <Lightbulb size={size} color={color} weight={fill} />;
    case "Estudos":
      return <BookBookmark size={size} color={color} weight={fill} />;
    default:
      return <Camera size={size} color={color} weight={fill} />;
  }
};
