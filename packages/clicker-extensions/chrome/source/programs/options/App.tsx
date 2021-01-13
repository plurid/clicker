import React from 'react';
import themes from '@plurid/plurid-themes';

import Context from './context';

import Options from './containers/Options';

import {
    chromeStorage,
} from '../../services/utilities';



const defaultOptions = {
    color: 'hsl(220, 20%, 40%)',
    border: '1px solid hsl(220, 20%, 20%)',
    size: '15',
    round: true,
    opacity: '0.4',
    hideCursor: false,
    followCursor: false,
    bindActivation: 'KeyC',
    bindUp: 'ArrowUp',
    bindDown: 'ArrowDown',
    bindLeft: 'ArrowLeft',
    bindRight: 'ArrowRight',
    bindClick: 'Enter',
    bindReset: 'KeyR',
};

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            theme: themes.plurid,
            setTheme: this.setTheme,
            options: {
                ...defaultOptions,
            },
        };
    }

    async componentDidMount() {
        const { theme } = await chromeStorage.get('theme');
        const { options } = await chromeStorage.get('options');

        const selectedTheme = (themes as any)[theme];

        const selectedOptions = {
            color: options.color || defaultOptions.color,
            border: options.border || defaultOptions.border,
            size: options.size || defaultOptions.size,
            round: options.round ?? defaultOptions.round,
            opacity: options.opacity || defaultOptions.opacity,
            hideCursor: options.hideCursor ?? defaultOptions.hideCursor,
            followCursor: options.followCursor ?? defaultOptions.followCursor,
            bindActivation: options.bindActivation || defaultOptions.bindActivation,
            bindUp: options.bindUp || defaultOptions.bindUp,
            bindDown: options.bindDown || defaultOptions.bindDown,
            bindLeft: options.bindLeft || defaultOptions.bindLeft,
            bindRight: options.bindRight || defaultOptions.bindRight,
            bindClick: options.bindClick || defaultOptions.bindClick,
            bindReset: options.bindReset || defaultOptions.bindReset,
        };

        if (theme) {
            this.setState({
                theme: selectedTheme,
                options: selectedOptions,
            });
        }
    }

    public render() {
        return (
            <Context.Provider value={this.state}>
                <Options />
            </Context.Provider>
        );
    }

    private setTheme = async (theme: string) => {
        this.setState({
            theme: (themes as any)[theme],
        });

        await chromeStorage.set({theme});
    }
}


export default App;
