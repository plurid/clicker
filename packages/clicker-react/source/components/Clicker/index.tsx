// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';
    // #endregion libraries


    // #region external
    // #endregion external


    // #region internal
    import {
        StyledClicker,
    } from './styled';
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
            className,
            style,
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional
    } = properties;
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


    // #region effects
    useEffect(() => {
        const handleKeydown = (
            event: KeyboardEvent,
        ) => {
            if (event.code === 'KeyC' && event.altKey) {
                setEnabled(enabled => !enabled);
                return;
            }

            if (!enabled) {
                return;
            }

            if (event.code === 'Enter') {
                console.log('click', x, y);
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
                case 'ArrowLeft':
                    setX(value => update('x', value, 'decrease', speed));
                    break;
                case 'ArrowRight':
                    setX(value => update('x', value, 'increase', speed));
                    break;
                case 'ArrowUp':
                    setY(value => update('y', value, 'decrease', speed));
                    break;
                case 'ArrowDown':
                    setY(value => update('x', value, 'increase', speed));
                    break;
            }
        }

        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        }
    }, [
        enabled,
        x, y,
    ]);
    // #endregion effects


    // #region render
    return (
        <>
            {enabled && (
                <StyledClicker
                    color="red"
                    x={x}
                    y={y}
                    size={15}

                    className={className}
                    style={{
                        ...style,
                    }}
                />
            )}
        </>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Clicker;
// #endregion exports
