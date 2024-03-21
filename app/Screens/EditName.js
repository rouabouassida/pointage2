import React, { useState } from "react";
import { StyleSheet } from "react-native";

import Screen from "../components/Screen";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Nom"),
});

const EditName = ({ currentName, onSave }) => {
  const [newName, setNewName] = useState(currentName);

  const handleSubmit = (values) => {
    onSave(values.name);
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{ name: currentName }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Nom"
        />
        <SubmitButton title="Enregistrer" />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: "auto",
  },
});

export default EditName;
