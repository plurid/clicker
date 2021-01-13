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
    // #endregion external
// #endregion imports



// #region module
async function contentscript() {
    try {
        const {
            extensionOn,
        } = await chromeStorage.get('extensionOn');

        if (!extensionOn) {
            return;
        }

        const clickerID = 'clicker-' + Math.floor(Math.random() * 1000);
        const element = document.createElement('div');
        element.id = clickerID;
        document.body.appendChild(element);

        ReactDOM.render(
            <Clicker
                size={15}
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
