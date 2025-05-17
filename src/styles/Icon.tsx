
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Color, UnifiedColor } from './Color';

const icon1 = 40;
const icon2 = 30;

export const deleteicon = <AntDesign name="delete" size={icon1} color={UnifiedColor.icon1} />;
export const editicon = <Feather name="edit" size={icon2} color={UnifiedColor.icon1} />;

const IconMap = {
  deleteicon,
  editicon,
};

export function Icon({ name }: { name: keyof typeof IconMap }) {
  return IconMap[name] || null;
}