import React from "react";
import { StyleSheet, Alert } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function AjouterEmployer() {
  const handleSubmit = (values) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir ajouter cet employé ?",
      [
        {
          text: "Non",
          onPress: () => console.log("Ajout annulé"),
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => {
            Alert.alert(
              "Envoi par email",
              "Voulez-vous envoyer l'email qui contain son mot de passe  ?",
              [
                {
                  text: "Non",
                  onPress: () =>
                    console.log("Email envoyé avec le mot de passe"),
                },
                {
                  text: "Oui",
                  onPress: () =>
                    console.log("Email envoyé sans le mot de passe"),
                },
              ],
              { cancelable: false }
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
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
        <SubmitButton title="Add Employer" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: "auto",
  },
});

export default AjouterEmployer;
