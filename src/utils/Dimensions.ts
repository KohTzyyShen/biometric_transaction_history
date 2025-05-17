// src/utils/Responsive.ts

/*
用法：
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/Dimensions';

SCREEN_WIDTH * 0.05
{SCREEN_WIDTH}
*/

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const SCREEN_RATIO = height / width;

