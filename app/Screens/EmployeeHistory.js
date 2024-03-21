import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// Fonction pour récupérer les données des employés depuis la base de données (à adapter)
const fetchEmployeeData = async () => {
  // Ici, vous devrez implémenter la logique pour récupérer les données des employés depuis votre base de données
  // Cette fonction doit retourner un tableau d'objets avec les données des employés, chaque objet contenant le nom de l'employé et un tableau d'entrées
  // Chaque entrée doit contenir la date, l'heure d'entrée, l'heure de sortie et le mode de travail
  // Voici un exemple fictif de structure de données que cette fonction pourrait retourner :
  return [
    {
      name: "Employé 1",
      entries: [
        {
          date: "18/3/2024",
          entryTime: "09:00",
          exitTime: "17:00",
          workMode: "Présentiel",
        },
        {
          date: "19/3/2024",
          entryTime: "10:00",
          exitTime: "18:00",
          workMode: "Remote",
        },
      ],
    },
    {
      name: "Employé 2",
      entries: [
        {
          date: "18/3/2024",
          entryTime: "08:00",
          exitTime: "16:00",
          workMode: "Remote",
        },
        {
          date: "19/3/2024",
          entryTime: "09:30",
          exitTime: "17:30",
          workMode: "Présentiel",
        },
      ],
    },
    // Ajoutez les données des autres employés ici...
  ];
};

// Fonction pour calculer le nombre total d'heures travaillées par un employé
const calculateTotalHours = (entries) => {
  let totalHours = 0;
  entries.forEach((entry) => {
    const entryTime = new Date(`01/01/2000 ${entry.entryTime}`);
    const exitTime = new Date(`01/01/2000 ${entry.exitTime}`);
    const hoursWorked = (exitTime - entryTime) / (1000 * 60 * 60); // Convertir la différence en heures
    totalHours += hoursWorked;
  });
  return totalHours.toFixed(2); // Arrondir à deux décimales
};

const EmployeeHistory = () => {
  const [employeeData, setEmployeeData] = useState([]);

  // Récupérer les données des employés lors du chargement initial
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEmployeeData();
        setEmployeeData(data || []); // Assurez-vous que data est un tableau même s'il est vide ou non défini
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des employés:",
          error
        );
        setEmployeeData([]); // Initialisez les données à un tableau vide en cas d'erreur
      }
    };
    fetchData();
  }, []);

  // Vérifiez si employeeData est défini et contient des données avant de l'utiliser
  if (!employeeData || employeeData.length === 0) {
    return <Text>Aucune donnée d'employé disponible.</Text>;
  }

  const uniqueDates = [
    ...new Set(
      employeeData.flatMap((employee) =>
        employee.entries.map((entry) => entry.date)
      )
    ),
  ];
  uniqueDates.sort(); // Tri des dates

  return (
    <ScrollView style={{ flex: 1 }}>
      <ScrollView horizontal>
        <View style={styles.container}>
          {uniqueDates.map((date, index) => (
            <View key={index} style={styles.dateContainer}>
              <Text style={styles.dateText}>Date d'entrée</Text>
              <Text style={styles.dateText}>{date}</Text>
              <View style={styles.table}>
                <View style={styles.headerRow}>
                  <Text
                    style={[styles.headerCell, styles.cell, { width: "25%" }]}
                  >
                    Employés
                  </Text>
                  <Text
                    style={[styles.headerCell, styles.cell, { width: "25%" }]}
                  >
                    Heure d'entrée
                  </Text>
                  <Text
                    style={[styles.headerCell, styles.cell, { width: "25%" }]}
                  >
                    Heure de sortie
                  </Text>
                  <Text
                    style={[styles.headerCell, styles.cell, { width: "25%" }]}
                  >
                    Nombre d'heures
                  </Text>
                  <Text
                    style={[styles.headerCell, styles.cell, { width: "25%" }]}
                  >
                    Mode de travail
                  </Text>
                </View>
                {employeeData.map((employee, index) => (
                  <View key={index} style={styles.employeeRow}>
                    <Text
                      style={[
                        styles.employeeName,
                        styles.cell,
                        { width: "25%" },
                      ]}
                    >
                      {employee.name}
                    </Text>
                    {employee.entries.map(
                      (entry, entryIndex) =>
                        entry.date === date && (
                          <View key={entryIndex} style={styles.entryCell}>
                            <Text
                              style={[
                                styles.cell,
                                styles.entryText,
                                { width: "25%" },
                              ]}
                            >
                              {entry.entryTime}
                            </Text>
                            <Text
                              style={[
                                styles.cell,
                                styles.entryText,
                                { width: "25%" },
                              ]}
                            >
                              {entry.exitTime}
                            </Text>
                            <Text
                              style={[
                                styles.cell,
                                styles.entryText,
                                { width: "25%" },
                              ]}
                            >
                              {(
                                (new Date(`01/01/2000 ${entry.exitTime}`) -
                                  new Date(`01/01/2000 ${entry.entryTime}`)) /
                                (1000 * 60 * 60)
                              ).toFixed(2)}
                            </Text>
                            <Text
                              style={[
                                styles.cell,
                                styles.entryText,
                                { width: "25%" },
                              ]}
                            >
                              {entry.workMode}
                            </Text>
                          </View>
                        )
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    minWidth: "100%",
    flex: 1,
    padding: 20,
  },
  dateContainer: {
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f2f2f2",
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    padding: 10,
  },
  employeeRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  employeeName: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "left",
    padding: 10,
  },
  cell: {
    flex: 1,
    textAlign: "left",
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  dateText: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 9,
    fontSize: 20,
    fontStyle: "italic",
    color: "brown",
  },
  entryCell: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  entryText: {
    textAlign: "center",
  },
});

export default EmployeeHistory;
