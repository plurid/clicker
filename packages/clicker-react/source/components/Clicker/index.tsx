// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';
    // #endregion libraries


    // #region internal
    import {
        GlobalClickerStyle,
        StyledClicker,
    } from './styled';

    import {
        clickerBaseColor,
        clickerBaseSize,

        clickerBindActivation,
        clickerBindUp,
        clickerBindDown,
        clickerBindLeft,
        clickerBindRight,
        clickerBindClick,
    } from './constants';
    // #endregion internal
// #region imports



// #region module
export interface ClickerProperties {
    // #region required
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        color?: string;
        size?: number;
        round?: boolean;
        opacity?: number;
        hideCursor?: boolean;
        followCursor?: boolean;

        bindActivation?: string;
        bindUp?: string;
        bindDown?: string;
        bindLeft?: string;
        bindRight?: string;
        bindClick?: string;

        className?: string;
        style?: React.CSSProperties
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
}

const Clicker: React.FC<ClickerProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            color,
            size: sizeProperty,
            round,
            opacity,
            hideCursor,
            followCursor,

            bindActivation: bindActivationProperty,
            bindUp: bindUpProperty,
            bindDown: bindDownProperty,
            bindLeft: bindLeftProperty,
            bindRight: bindRightProperty,
            bindClick: bindClickProperty,

            className,
            style,
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional
    } = properties;

    const size = sizeProperty || clickerBaseSize;

    const bindActivation = bindActivationProperty || clickerBindActivation;
    const bindUp = bindUpProperty || clickerBindUp;
    const bindDown = bindDownProperty || clickerBindDown;
    const bindLeft = bindLeftProperty || clickerBindLeft;
    const bindRight = bindRightProperty || clickerBindRight;
    const bindClick = bindClickProperty || clickerBindClick;
    // #endregion properties


    // #region state
    const [
        enabled,
        setEnabled,
    ] = useState(false);

    const [
        x,
        setX,
    ] = useState(0);

    const [
        y,
        setY,
    ] = useState(0);
    // #endregion state


    // #region handlers
    const click = (
        x: number,
        y: number,
    ) => {
        const event = document.createEvent('MouseEvent');
        const element = document.elementFromPoint(x, y);

        event.initMouseEvent(
            'click',
            true /* bubble */, true /* cancelable */,
            window, 0 /** null */,
            x, y, 0, 0, /* coordinates */
            false, false, false, false, /* modifier keys */
            0 /*left*/, null
        );

        if (!element) {
            return;
        }
        element.dispatchEvent(event);
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const handleKeydown = (
            event: KeyboardEvent,
        ) => {
            if (event.code === bindActivation && event.altKey) {
                setEnabled(enabled => !enabled);
                return;
            }

            if (!enabled) {
                return;
            }

            if (event.code === bindClick) {
                click(x, y);
                return;
            }


            let speed = 10;
            if (event.altKey) {
                speed = 1;
            }
            if (event.shiftKey) {
                speed = 50;
            }

            const update = (
                kind: 'x' | 'y',
                value: number,
                type: 'increase' | 'decrease',
                speed: number,
            ) => {
                let updatedValue = 0;
                if (type === 'increase') {
                    updatedValue = value + speed;
                } else {
                    updatedValue = value - speed;
                }

                if (updatedValue < 0) {
                    return 0;
                }

                let maxValue = 0;
                if (kind === 'x') {
                    maxValue = window.innerWidth;
                } else {
                    maxValue = window.innerHeight;
                }

                if (updatedValue > maxValue) {
                    return maxValue;
                }

                return updatedValue;
            }

            switch (event.code) {
                case bindUp:
                    setY(value => update('y', value, 'decrease', speed));
                    break;
                case bindDown:
                    setY(value => update('x', value, 'increase', speed));
                    break;
                case bindLeft:
                    setX(value => update('x', value, 'decrease', speed));
                    break;
                case bindRight:
                    setX(value => update('x', value, 'increase', speed));
                    break;
            }
        }

        // TODO: debounce
        const handleFollowCursor = (
            event: MouseEvent,
        ) => {
            setX(event.clientX - size / 2);
            setY(event.clientY - size / 2);
        }

        window.addEventListener('keydown', handleKeydown);

        if (followCursor) {
            window.addEventListener('mousemove', handleFollowCursor);
        }

        return () => {
            window.removeEventListener('keydown', handleKeydown);

            if (followCursor) {
                window.removeEventListener('mousemove', handleFollowCursor);
            }
        }
    }, [
        enabled,
        x, y,
        size,
        followCursor,
        bindActivation,
        bindUp, bindDown,
        bindLeft, bindRight,
        bindClick,
    ]);
    // #endregion effects


    // #region render
    return (
        <>
            {enabled && (
                <>
                    <GlobalClickerStyle
                        hideCursor={hideCursor}
                    />

                    <StyledClicker
                        color={color || clickerBaseColor}
                        x={x}
                        y={y}
                        size={size}
                        round={round}
                        opacity={opacity}

                        className={className}
                        style={{
                            ...style,
                        }}
                    />
                </>
            )}
        </>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Clicker;
// #endregion exports
