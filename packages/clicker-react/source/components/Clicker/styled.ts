// #region imports
    // #region libraries
    import styled, {
        createGlobalStyle,
    } from 'styled-components';
    // #region libraries
// #region imports



// #region module
export interface IStyledClicker {
    color: string;
    x: number;
    y: number;
    size: number;
    round?: boolean;
    opacity?: number;
}

export const StyledClicker = styled.div<IStyledClicker>`
    position: fixed;
    pointer-events: none;
    transition: all 150ms;
    z-index: 99999;

    background: ${
        ({
            color,
        }) => color
    };

    height: ${
        ({
            size,
        }) => size + 'px'
    };
    width: ${
        ({
            size,
        }) => size + 'px'
    };
    border-radius: ${
        ({
            round,
            size,
        }) => round === false ? 0 : size / 2 + 'px'
    };
    opacity: ${
        ({
            opacity,
        }) => opacity ?? 0.4
    };

    top: ${
        ({
            y,
            size,
        }) => `calc(${y}px - ${size / 2}px)`
    };
    left: ${
        ({
            x,
            size,
        }) => `calc(${x}px - ${size / 2}px)`
    };
`;



export interface IGlobalClickerStyle {
    hideCursor?: boolean;
}

export const GlobalClickerStyle = createGlobalStyle<IGlobalClickerStyle>`
    html, body {
        cursor: ${
            ({
                hideCursor
            }) => hideCursor ? 'none !important': 'auto'
        };
    }
`;
// #region module
