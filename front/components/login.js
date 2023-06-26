import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { React } from "react";

function submitInfo() {
  // Envoyer informations utilisateur + vérification
  console.log("quoicoubeh");
}

export default function Login() {
  return (
    <View style={styles.form}>
      <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>Identifiant</Text>
        <TextInput
          style={styles.field}
          placeholder={"..."}
          onChangeText={(username) => setUsername(username)}
        ></TextInput>
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>Mot de Passe</Text>
        <TextInput
          style={styles.field}
          placeholder={"..."}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        ></TextInput>
        <Text style={styles.pwd}>Mot de passe oublié?</Text>
      </View>

      <Pressable style={styles.submit} onPress={submitInfo}>
        Se Connecter
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 0,
    minHeight: "87vh",
    padding: "10vw",
    position: "absolute",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  title: {
    fontSize: "3em",
    marginBottom: "6vh",
    color: "#180033",
    fontFamily: "Helvetica Neue",
  },
  container: {
    marginBottom: "2em",
    minWidth: "100%",
  },
  subtitle: {
    fontSize: "1.5em",
    color: "#180033",
    fontFamily: "Helvetica Neue",
  },
  field: {
    fontSize: "1em",
    backgroundColor: "#ececec",
    padding: "2px",
    paddingHorizontal: "5px",
    width: "auto",
    marginBottom: "0.5em",
    borderRadius: "5px",
  },
  pwd: {
    marginBottom: "4em",
    fontStyle: "italic",
    textAlign: "center",
    fontFamily: "Helvetica Neue",
  },
  submit: {
    maxWidth: "60%",
    color: "white",
    backgroundColor: "#58A1D9",
    border: "1px solid white",
    borderRadius: "5px",
    padding: "0.8em",
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Helvetica Neue",
  },
});
