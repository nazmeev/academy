import { color } from '@alyle/ui/color';

export const scaleConfig = {
    scale   : 3.3333333,
    position: {
        x: 642.380608078103,
        y: 236.26357452128866
    }
};

export const imageCropperConfig = {
    width : 150,
    height: 150,
    type  : 'image/png, image/jpeg',
    round : true,
    output: {
        width : 72,
        height: 72
    }
};


export class GlobalVariables {
    testVal      = color(0x00bcd4);
    Quepal       = {
        default : `linear-gradient(135deg,#11998e 0%,#38ef7d 100%)`,
        contrast: color(0xffffff),
        shadow  : color(0x11998e)
    };
    SublimeLight = {
        default : `linear-gradient(135deg,#FC5C7D 0%,#6A82FB 100%)`,
        contrast: color(0xffffff),
        shadow  : color(0xB36FBC)
    };
    Amber        = {
        default : color(0xffc107),
        contrast: color(0, 0, 0, 0.87)
    };
}

