import React, { useState } from "react";
import { StyleSheet, Image, ImageBackground, Text } from "react-native";
import * as Yup from "yup";
import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import colors from "../config/colors";
import axios from "axios";
import { Alert } from "react-native";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function Login(props) {
  const [showError, setShowError] = useState(false);
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        values
      );
      if (response.data.success) {
        // Compte trouvé, rediriger ou effectuer d'autres actions nécessaires
      } else {
        Alert.alert(
          "Erreur",
          "Compte introuvable. Veuillez vérifier vos informations d'identification."
        );
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Une erreur s'est produite lors de la connexion.");
    }
  };

  return (
    <Screen style={styles.container}>
      <ImageBackground
        blurRadius={50}
        style={styles.background}
        source={require("../assets/welcomebackground.jpg")}
      >
        <Image style={styles.logo} source={require("../assets/s.png")} />

        <AppForm
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Login" />
        </AppForm>
        <Text style={styles.forget}>Forget password ?</Text>
      </ImageBackground>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  background: { flex: 1, justifyContent: "flex-start", alignItems: "center" },
  logo: {
    width: 180,
    height: 180,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 70,
  },
  forget: {
    color: colors.marron,
    fontSize: 15,
    fontStyle: "italic",
    marginTop: 50,
    alignSelf: "center",
  },
});

export default Login;
