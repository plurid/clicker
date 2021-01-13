// #region imports
    // #region libraries
    import React from 'react';

    import ReactDOM from 'react-dom';

    import Clicker from '@plurid/clicker-react';
    // #endregion libraries


    // #region external
    import {
        chromeStorage,
    } from '../../services/utilities';

    import {
        defaultOptions,
    } from '../../data/constants';
    // #endregion external
// #endregion imports



// #region module
async function contentscript() {
    try {
        const {
            extensionOn,
        } = await chromeStorage.get('extensionOn');

        const {
            options,
        } = await chromeStorage.get('options');

        if (!extensionOn) {
            return;
        }

        const clickerID = 'clicker-' + Math.floor(Math.random() * 1000);
        const element = document.createElement('div');
        element.id = clickerID;
        document.body.appendChild(element);

        ReactDOM.render(
            <Clicker
                color={options?.color ?? defaultOptions.color}
                border={options?.border ?? defaultOptions.border}
                size={parseInt(options?.size) || parseInt(defaultOptions.size) || 15}
                round={options?.round ?? defaultOptions.round}
                opacity={parseInt(options?.opacity) || parseInt(defaultOptions.opacity) || 0.4}
                hideCursor={options?.hideCursor ?? defaultOptions.hideCursor}
                followCursor={options?.followCursor ?? defaultOptions.followCursor}
                bindActivation={options?.bindActivation ?? defaultOptions.bindActivation}
                bindUp={options?.bindUp ?? defaultOptions.bindUp}
                bindDown={options?.bindDown ?? defaultOptions.bindDown}
                bindLeft={options?.bindLeft ?? defaultOptions.bindLeft}
                bindRight={options?.bindRight ?? defaultOptions.bindRight}
                bindClick={options?.bindClick ?? defaultOptions.bindClick}
                bindReset={options?.bindReset ?? defaultOptions.bindReset}
            />,
            document.getElementById(clickerID) as HTMLElement,
        );
    } catch (error) {
        return;
    }
}


async function contentscriptMain() {
    await contentscript();
};


contentscriptMain();
// #endregion module
