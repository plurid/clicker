// #region imports
    // #region libraries
    import React, {
        useState,
        useContext,
        useEffect,
    } from 'react';

    import themes from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import Context from '../../context';

    import Dropdown from '../../../../components/Dropdown';
    import ItemExtensionOnOff from '../../../../components/ItemExtensionOnOff';
    import ButtonCheckmark from '../../../../components/ButtonCheckmark';

    import {
        chromeStorage,
    } from '../../../../services/utilities';
    // #endregion external


    // #region internal
    import {
        StyledOptions,
        StyledOptionsContainer,
        StyledOptionsWrapper,
        StyledOptionsItemLeftRight,
        StyledStateContainer,
        StyledUIContainer,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface OptionsProperties {
}

const Options: React.FC<OptionsProperties> = () => {
    const context: any = useContext(Context);
    const {
        theme,
        setTheme,
    } = context;

    const [extensionOnOff, setExtensionOnOff] = useState(true);


    useEffect(() => {
        const getExtensionState = async () => {
            const { extensionOn } = await chromeStorage.get('extensionOn');
            setExtensionOnOff(!!extensionOn);
        }

        getExtensionState();
    }, []);

    useEffect(() => {
        const setExtensionState = async () => {
            await chromeStorage.set({extensionOn: extensionOnOff});
        }
        setExtensionState();
    }, [extensionOnOff]);

    useEffect(() => {
        const saveOptions = async () => {
            const { options } = await chromeStorage.get('options');
            const {
            } = options;
        }

        saveOptions();
    }, []);

    useEffect(() => {
        const saveOptions = async () => {
            const options = {
            };

            await chromeStorage.set({options});
        }

        saveOptions();
    }, [
    ]);

    useEffect(() => {
    }, []);

    return (
        <StyledOptions
            theme={theme}
        >
            <StyledOptionsContainer>
                <StyledOptionsWrapper>
                    <StyledStateContainer>
                        <h1>
                            state
                        </h1>

                        <ItemExtensionOnOff
                            theme={theme}
                            extensionOnOff={extensionOnOff}
                            setExtensionOnOff={() => setExtensionOnOff(!extensionOnOff)}
                        />
                    </StyledStateContainer>

                    <StyledUIContainer>
                        <h1>
                            interface
                        </h1>

                        <StyledOptionsItemLeftRight>
                            <div>
                                theme
                            </div>

                            <Dropdown
                                theme={theme}
                                selected={theme.name}
                                items={Object.keys(themes)}
                                onSelect={setTheme}
                            />
                        </StyledOptionsItemLeftRight>

                        <div
                            style={{
                                margin: '20px 0'
                            }}
                        >
                            <ButtonCheckmark
                                checked={false}
                                text="hide cursor"
                                theme={theme}
                                toggle={() => {}}
                            />

                            <ButtonCheckmark
                                checked={false}
                                text="follow cursor"
                                theme={theme}
                                toggle={() => {}}
                            />
                        </div>
                    </StyledUIContainer>
                </StyledOptionsWrapper>
            </StyledOptionsContainer>
        </StyledOptions>
    );
}
// #endregion module



// #region exports
export default Options;
// #endregion exports
