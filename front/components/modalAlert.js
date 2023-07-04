import { Button, StyleSheet, Text, TouchableHighlightBase, TouchableOpacity, View } from "react-native";
import { globalOptionsTab, optionsTab } from "../utils/options.helper";
import { useState } from "react";
import AlertMessageForm from "./alertMessageForm";

const ModalAlert = ({license_plate,contact}) => {
    const [selectedOption, setSelectedOption] = useState();
    const [isPressed, setIsPressed] = useState(false);
    const [options, setOptions] = useState();
    const globalOptions = globalOptionsTab;

    console.log('contact:', contact)

    const handlePress = (item) => {
        setIsPressed(true);
        setOptions(optionsTab[item]);
    }

    const selectOption = (option) => {
        setSelectedOption(option);
    }

    return (
        <View>
            {!options && (
            <>
                <View>
                    <Text style={styles.cardText}>Précisez la nature du problème :</Text>
                    {globalOptions.map((item, index) => (
                        <TouchableOpacity onPress={() => handlePress(item)} key={index} style={styles.cardItem}>
                            <View>
                                <Text>{item}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                </View>

            </>
            )}

            {options && !selectedOption && (
            <>
                <View>
                    <Text style={styles.cardText}>Précisez la nature du problème :</Text>
                    {options.map((option, index) => (
                        <TouchableOpacity onPress={() => selectOption(option)} key={index}>
                            <View key={index} style={styles.cardItem}>
                                <Text>{option}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}

                </View>
            </>
            )}
            {selectedOption && (
                <AlertMessageForm option={selectedOption} licensePlate={license_plate} contact={contact}></AlertMessageForm>
            )}
        </View>

    );
};


const styles = StyleSheet.create({
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
        marginBottom: 20,
    },
    longText: {

    }
});

export default ModalAlert;