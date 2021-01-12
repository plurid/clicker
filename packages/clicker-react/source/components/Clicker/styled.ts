// #region imports
    // #region libraries
    import styled from 'styled-components';
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
    position: absolute;
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
// #region module
