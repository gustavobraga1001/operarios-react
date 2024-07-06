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

export const getIcons = (sector, color) => {
  console.log(sector, color);
  switch (sector) {
    case "Recepção":
      return <Door size={52} color={color} weight="fill" />;
    case "Louvor":
      return <Guitar size={52} color={color} weight="fill" />;
    case "Mídia":
      return <Camera size={52} color={color} weight="fill" />;
    case "Organização":
      return <ClipboardText size={52} color={color} weight="fill" />;
    case "Kids":
      return <Lego size={52} color={color} weight="fill" />;
    case "Projetor":
      return <Monitor size={52} color={color} weight="fill" />;
    case "Intercessão":
      return <HandsPraying size={52} color={color} weight="fill" />;
    case "Consolidação":
      return <Gift size={52} color={color} weight="fill" />;
    case "Ceia":
      return <Bread size={52} color={color} weight="fill" />;
    case "Cenografia":
      return <Lightbulb size={52} color={color} weight="fill" />;
    case "Estudos":
      return <BookBookmark size={52} color={color} weight="fill" />;
    default:
      return <Camera size={52} color={color} weight="fill" />;
  }
};
