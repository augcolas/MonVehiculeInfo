import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { React, useState } from "react";

function registerUser(e) {
  e.preventDefault();
  const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
  // Enregistrer utilisateur + vérifications
  if (!strongRegex.test(this.email)) {
    alert("Email invalide");
  }
  if (this.password.length < 6) {
    alert("Mot de passe trop court");
  }

  if (this.email != null && this.password != null) {
    if (this.password == this.passwordCheck) {
      console.log("MDP identiques");
    } else {
      alert("Le mot de passe défini doit être identique !")
    }
  }
  console.log("registerUser()");
}

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  return (
    <View style={styles.form}>

      <View style={styles.container}>
        <Text style={styles.title}>Inscription</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>Email</Text>
        <TextInput
          style={styles.field}
          isRequired
          placeholder={"..."}
          onChangeText={(email) => setEmail(email)}
          value={email}
        ></TextInput>
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>Mot de Passe</Text>
        <TextInput
          style={styles.field}
          isRequired
          placeholder={"..."}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        ></TextInput>
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>Vérifier Mot de Passe</Text>
        <TextInput
          style={styles.field}
          isRequired
          placeholder={"..."}
          secureTextEntry={true}
          onChangeText={(passwordCheck) => setPasswordCheck(passwordCheck)}
          value={passwordCheck}
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
