import { ThemeConfig } from 'antd';
import colors from 'tailwindcss/colors';

export const customAntTheme: ThemeConfig = {
  token: {
    colorPrimary: colors.blue[500], // primary color
    borderRadius: 8,
  },
};
