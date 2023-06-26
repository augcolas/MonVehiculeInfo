import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import React from "react";

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

      <Button
        variant={"contained"}
        style={styles.submit}
        onClick={alert("test")}
      >
        Se Connecter
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 0,
    padding: 0,
    fontFamily: "Quicksand",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "87vh",
    padding: "10vw",
    position: "absolute",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: "3em",
    marginBottom: "6vh",
    color: "#180033",
  },
  container: {
    marginBottom: "2em",
    width: "100%",
  },
  subtitle: {
    fontSize: "1.5em",
    color: "#180033",
  },
  field: {
    fontSize: "1em",
    backgroundColor: "#ececec",
    padding: "3px",
    width: "auto",
    marginBottom: "0.5em",
    borderRadius: "5px",
  },
  pwd: {
    marginBottom: "4em",
    fontStyle: "italic",
    textAlign: "center",
  },
  submit: {
    padding: "1em",
    backgroundColor: "red",
    marginTop: "1em",
    width: "100%",
  },
});
