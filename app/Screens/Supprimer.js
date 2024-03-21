import React from "react";
import { StyleSheet, Alert } from "react-native";
import * as Yup from "yup";

import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";

const validationSchema = Yup.object().shape({
  id: Yup.string().required().label("ID"),
  name: Yup.string().required().label("NAME"),
});

function Supprimer() {
  const handleDelete = (values) => {
    const { id, name } = values;
    Alert.alert(
      "Confirmation",
      `Êtes-vous sûr de vouloir supprimer l'employé avec l'ID : ${id} et le nom : ${name} ?`,
      [
        {
          text: "Non",
          onPress: () => console.log("Suppression annulée"),
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => deleteEmployee(id),
        },
      ],
      { cancelable: false }
    );
  };

  const deleteEmployee = (id) => {
    // Insérer ici la logique pour supprimer l'employé de la base de données
    console.log("Employé supprimé avec l'ID :", id);
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{ id: "", name: "" }}
        onSubmit={handleDelete}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          icon="account"
          name="id"
          placeholder="ID"
        />
        <AppFormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="NAME"
        />
        <SubmitButton title="Delete Employer" />
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

export default Supprimer;
