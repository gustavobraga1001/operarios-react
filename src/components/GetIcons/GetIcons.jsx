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
  const icons = {
    Recep: () => <Door size={size} color={color} weight={fill} />,
    Louvor: () => <Guitar size={size} color={color} weight={fill} />,
    Midia: () => <Camera size={size} color={color} weight={fill} />,
    Intercessão: () => <HandsPraying size={size} color={color} weight={fill} />,
    Organização: () => (
      <ClipboardText size={size} color={color} weight={fill} />
    ),
    Kids: () => <Lego size={size} color={color} weight={fill} />,
    Projetor: () => <Monitor size={size} color={color} weight={fill} />,
    Consolidação: () => <Gift size={size} color={color} weight={fill} />,
    Ceia: () => <Bread size={size} color={color} weight={fill} />,
    Cenografia: () => <Lightbulb size={size} color={color} weight={fill} />,
    Estudos: () => <BookBookmark size={size} color={color} weight={fill} />,
  };
  return icons[sector];
};
