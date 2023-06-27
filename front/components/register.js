import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { React } from "react";

function registerUser(e) {
  e.preventDefault();
  // Envoyer informations utilisateur + vérification
  if (this.username != null && this.password != null) {
    if (this.password == this.passwordCheck) {
      console.log("MDP identiques");
    }
  }
  console.log("Utilisateur Inscrit ! (non)");
}

export default function Register() {
  return (
    <View style={styles.form}>

      <View style={styles.container}>
        <Text style={styles.title}>Inscription</Text>
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
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>Vérifier Mot de Passe</Text>
        <TextInput
          style={styles.field}
          placeholder={"..."}
          secureTextEntry={true}
          onChangeText={(passwordCheck) => setPasswordCheck(passwordCheck)}
        ></TextInput>
      </View>

      <Button title="S'inscrire" style={styles.submit} onPress={registerUser} />
      
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
    fontStyle: "bold",
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
