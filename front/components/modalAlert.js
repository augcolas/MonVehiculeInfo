import { Button, StyleSheet, Text, TouchableHighlightBase, TouchableOpacity, View } from "react-native";
import { globalOptionsTab, optionsTab } from "../utils/options.helper";
import { useState } from "react";
import AlertMessageForm from "./alertMessageForm";

const ModalAlert = () => {
    const [selectedOption, setSelectedOption] = useState();
    const [isPressed, setIsPressed] = useState(false);
    const [options, setOptions] = useState();

    const globalOptions = globalOptionsTab;

    const handlePress = (item) => {
        console.log(item)
        setIsPressed(true);
        setOptions(optionsTab[item]);
    }

    const selectOption = (option) => {
        setSelectedOption(option);
    }

    return (
        <View style={styles.container}>
            {!options && (
            <>
                <View>
                    {globalOptions.map((item, index) => (
                        <TouchableOpacity onPress={() => handlePress(item)} key={index} style={styles.cardItem}>
                            <View>
                                <Text style={styles.cardText}>{item}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                </View>

            </>
            )}

            {options && (
            <>
                <View>
                    {options.map((option, index) => (
                        <TouchableOpacity onPress={() => selectOption(option)} key={index}>
                            <View key={index} style={styles.cardItem}>
                                <Text style={styles.cardText}>{option}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                </View>
                <View>
                    {selectedOption && (<Text>{selectedOption}</Text>)}
                </View>
            </>
            )}
            {selectedOption && (
                <AlertMessageForm option={selectedOption} licensePlate={'AAAAA'}></AlertMessageForm>
            )}
        </View>

    );
};


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    container: {
        maxHeight: 200,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 16,
    },
    cardItem: {
        width: '100%', // Réglez la largeur de chaque élément en fonction de la disposition en deux colonnes
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ModalAlert;