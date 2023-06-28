import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import { React, useEffect, useState } from "react";
import { checkPassword, getUserByEmail, getUsers } from "../services/user.service";
import { useAuth } from "../context/Auth";

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [passwordCheck, setPasswordCheck] = useState("");

  const { logIn } = useAuth();

  async function logUser(e) {
    e.preventDefault();
    try {
      const user = await getUserByEmail(email);
      if (user) {
        const res = await checkPassword(user.id, password);
        if (res.result === true) {
          logIn({ email: user.email })
        } else {
          setError('Le mot de passe est incorrect')
        }
      } 
    } catch (e) {
      setError("L'utilisateur n'existe pas")
    }
  }


  return (
    <View style={styles.form}>

      <View>
        <Text>Connexion</Text>
      </View>

      <View>
        <Text>Email</Text>
        <TextInput
          isRequired
          placeholder={"..."}
          onChangeText={(email) => setEmail(email)}
          value={email}
        ></TextInput>
      </View>

      <View>
        <Text>Mot de Passe</Text>
        <TextInput
          isRequired
          placeholder={"..."}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        ></TextInput>
        <Text >Mot de passe oublié?</Text>
        {error && (<Text>{error}</Text>)}
      </View>

      <Button title="Se Connecter" onPress={logUser} />

    </View>
  );
}



const styles = StyleSheet.create({
  form: {
    margin: 0,
    position: "absolute",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
});

/*
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
  pwd: {
    marginBottom: "4em",
    fontStyle: "italic",
    textAlign: "center",
    fontFamily: "Helvetica Neue",
  },
  error: {
    color: 'red'
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
  */
