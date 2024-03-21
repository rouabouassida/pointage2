import React from "react";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";

import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";

const PointerRH = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("GererEmployer");
  };
  const handlePress1 = () => {
    navigation.navigate("EmployeeHistory");
  };
  const handlePress2 = () => {
    navigation.navigate("VacationManagement");
  };

  return (
    <ImageBackground
      blurRadius={50}
      style={styles.background}
      source={require("../assets/welcomebackground.jpg")}
    >
      <View style={styles.container}>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Image
              source={require("../assets/employes.jpg")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Gérer les employés </Text>
        </View>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress1}>
            <Image
              source={require("../assets/historique.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Historique de Pointage</Text>
        </View>
        <View style={styles.circleContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress2}>
            <Image
              source={require("../assets/conge.jpg")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Congé</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.beige,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default PointerRH;
