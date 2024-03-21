import React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";

const menuItems = [
  {
    title: "Suivie Employer",
    icon: {
      name: "account-eye",
      backgroundColor: colors.medium,
    },
    screen: "SuivieEmployer",
  },
  {
    title: "Ajouter Employer",
    icon: {
      name: "account-plus",
      backgroundColor: colors.medium,
    },
    screen: "AjouterEmployer",
  },
  {
    title: "Modifier Employer",
    icon: {
      name: "account-wrench",
      backgroundColor: colors.medium,
    },
    screen: "ModifierEmployer",
  },
  {
    title: "Supprimer",
    icon: {
      name: "account-remove",
      backgroundColor: colors.danger,
    },
    screen: "Supprimer",
  },
];

function GererEmployer() {
  const navigation = useNavigation();

  const handleMenuItemPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <Screen style={styles.screen}>
      <FlatList
        data={menuItems}
        keyExtractor={(menuItem) => menuItem.title}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMenuItemPress(item.screen)}>
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.container}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    flex: 1,
  },
  container: {
    paddingVertical: 30,
  },
});

export default GererEmployer;
