// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import {
        useDebouncedCallback,
    } from '@plurid/plurid-functions-react';
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
        clickerBindReset,
    } from './data/constants';

    import {
        ClickData,
    } from './data/interfaces';
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
        bindReset?: string;

        className?: string;
        style?: React.CSSProperties
        // #endregion values

        // #region methods
        beforeClick?: (data: ClickData) => void;
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
            bindReset: bindResetProperty,

            className,
            style,
            // #endregion values

            // #region methods
            beforeClick,
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
    const bindReset = bindResetProperty || clickerBindReset;
    // #endregion properties


    // #region state
    const [
        enabled,
        setEnabled,
    ] = useState(false);

    const [
        x,
        setX,
    ] = useState(window.innerWidth / 2 - size / 2);

    const [
        y,
        setY,
    ] = useState(window.innerHeight / 2 - size / 2);
    // #endregion state


    // #region handlers
    const click = (
        x: number,
        y: number,
        type?: 'click' | 'right-click',
    ) => {
        const event = document.createEvent('MouseEvent');
        const element = document.elementFromPoint(x, y);

        // TODO: not working
        const buttonType = type === 'right-click' ? 2 : 0;

        event.initMouseEvent(
            'click',
            true /* bubble */, true /* cancelable */,
            window, 0 /** null */,
            x, y, 0, 0, /* coordinates */
            false, false, false, false, /* modifier keys */
            buttonType, null,
        );

        if (!element) {
            return;
        }

        if (beforeClick) {
            beforeClick({
                x,
                y,
            });
        }

        element.dispatchEvent(event);
    }

    const handleFollowCursor = useDebouncedCallback(
        (
            event: MouseEvent,
        ) => {
            setX(event.clientX - size / 2);
            setY(event.clientY - size / 2);
        },
        100,
    );
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
                click(
                    x, y,
                    event.shiftKey ? 'right-click' : 'click'
                );
                return;
            }

            if (event.code === bindReset && event.altKey) {
                setX(window.innerWidth / 2 - size / 2);
                setY(window.innerHeight / 2 - size / 2);
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
