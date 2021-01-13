// #region imports
    // #region libraries
    import React, {
        useState,
        useContext,
        useEffect,
    } from 'react';

    import themes from '@plurid/plurid-themes';

    import {
        universal,
    } from '@plurid/plurid-ui-components-react';
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
const {
    form: {
        FormLeftRight: PluridFormLeftRight,
        Formline: PluridFormline,
        Formitem: PluridFormitem,
    },
    typography: {
        Heading: PluridHeading,
    },
} = universal;


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
                        <PluridHeading
                            theme={theme}
                            type="h2"
                            style={{
                                padding: '0 0.7rem',
                            }}
                        >
                            state
                        </PluridHeading>

                        <ItemExtensionOnOff
                            theme={theme}
                            extensionOnOff={extensionOnOff}
                            setExtensionOnOff={() => setExtensionOnOff(!extensionOnOff)}
                        />
                    </StyledStateContainer>


                    <StyledUIContainer>
                        <PluridHeading
                            theme={theme}
                            type="h2"
                            style={{
                                padding: '0 0.7rem',
                            }}
                        >
                            interface
                        </PluridHeading>

                        <PluridFormLeftRight
                            style={{
                                padding: '0.3rem 0.7rem',
                            }}
                        >
                            <div>
                                theme
                            </div>

                            <Dropdown
                                theme={theme}
                                selected={theme.name}
                                items={Object.keys(themes)}
                                onSelect={setTheme}
                            />
                        </PluridFormLeftRight>

                        <PluridFormline
                            text="color"
                        >
                            hsl(220, 20%, 40%)
                        </PluridFormline>

                        <PluridFormline
                            text="size"
                        >
                            15
                        </PluridFormline>

                        <PluridFormitem>
                            <ButtonCheckmark
                                checked={true}
                                text="round"
                                theme={theme}
                                toggle={() => {}}
                            />
                        </PluridFormitem>

                        <PluridFormline
                            text="opacity"
                        >
                            0.4
                        </PluridFormline>

                        <PluridFormitem>
                            <ButtonCheckmark
                                checked={false}
                                text="hide cursor"
                                theme={theme}
                                toggle={() => {}}
                            />
                        </PluridFormitem>

                        <PluridFormitem>
                            <ButtonCheckmark
                                checked={false}
                                text="follow cursor"
                                theme={theme}
                                toggle={() => {}}
                            />
                        </PluridFormitem>
                    </StyledUIContainer>


                    <StyledUIContainer>
                        <PluridHeading
                            theme={theme}
                            type="h2"
                            style={{
                                padding: '0 0.7rem',
                            }}
                        >
                            bindings
                        </PluridHeading>

                        <PluridFormline
                            text="activation"
                        >
                            ALT + KeyC
                        </PluridFormline>

                        <PluridFormline
                            text="up"
                        >
                            ArrowUp
                        </PluridFormline>

                        <PluridFormline
                            text="down"
                        >
                            ArrowDown
                        </PluridFormline>

                        <PluridFormline
                            text="left"
                        >
                            ArrowLeft
                        </PluridFormline>

                        <PluridFormline
                            text="right"
                        >
                            ArrowRight
                        </PluridFormline>

                        <PluridFormline
                            text="click"
                        >
                            Enter
                        </PluridFormline>

                        <PluridFormline
                            text="reset"
                        >
                            ALT + KeyR
                        </PluridFormline>
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
