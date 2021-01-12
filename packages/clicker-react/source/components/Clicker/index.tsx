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
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional
    } = properties;
    // #endregion properties


    // #region state
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

    }, []);
    // #endregion effects


    // #region render
    return (
        <StyledClicker
            color="red"
            x={x}
            y={y}
            size={15}
        />
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Clicker;
// #endregion exports
