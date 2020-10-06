import { LY_THEME, LY_THEME_NAME, LyHammerGestureConfig, lyl, LyTheme2, StyleRenderer, ThemeRef, ThemeVariables } from '@alyle/ui';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { MinimaDark, MinimaDeepDark, MinimaLight } from '@alyle/ui/themes/minima';

export const ROOT_LYL_STYLES = (theme: ThemeVariables, ref: ThemeRef) => {
    const __ = ref.selectorsOf(ROOT_LYL_STYLES);
    return {
        $global: lyl`{
          body {
            background-color: ${theme.background.default}
            color: ${theme.text.default}
            font-family: ${theme.typography.fontFamily}
            margin: 0
            direction: ${theme.direction}
          }
        }`,
        root   : lyl`{
          display: block
        }`
    };
};

export const UPLOADER_LYL_STYLES = () => {
    return {
        cropper: lyl`{
      max-width: 400px
      height: 300px
    }`,
        sliderContainer: lyl`{
      text-align: center
      max-width: 400px
      margin: 14px
    }`,
        cropResult: lyl`{
      border-radius: 50%
    }`
    };
};

export const IMAGE_UPLOADER_PROVIDERS = [
    {
        provide : HAMMER_GESTURE_CONFIG,
        useClass: LyHammerGestureConfig
    },
    StyleRenderer,
    LyTheme2,
    {
        provide : LY_THEME_NAME,
        useValue: 'minima-light'
    },
    {
        provide : LY_THEME,
        useClass: MinimaLight,
        multi   : true
    },
    {
        provide : LY_THEME,
        useClass: MinimaDeepDark,
        multi   : true
    },
    {
        provide : LY_THEME,
        useClass: MinimaDark,
        multi   : true
    }
];
