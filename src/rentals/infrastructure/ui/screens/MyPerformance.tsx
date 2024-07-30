import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from "react-native-chart-kit";
import AppBar from "../../../../shared/infrastructure/ui/components/AppBar";
import { getPredictionsByUserId } from "../../dependencies";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../shared/infrastructure/redux/reducers/authReducer";

const MyPerformance = ({ navigation }) => {
  const user = useSelector(selectUser);
  const [realData, setRealData] = React.useState([]);
  const [predictedData2, setPredictedData2] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getPredictionsByUserId
      .execute(user._id)
      .then((predictions) => {
        const realMonthlySums = Object.values(getMonthlySums(predictions.real_df));
        const predictedMonthlySums = Object.values(getMonthlySums(predictions.prediction_df));

        const realDataWithNulls = [...realMonthlySums, ...new Array(predictedMonthlySums.length).fill(null)];
        const predictedDataWithNulls = [
          ...new Array(realMonthlySums.length).fill(null),
          ...predictedMonthlySums,
        ];

        setRealData(realDataWithNulls);
        setPredictedData2(predictedDataWithNulls);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener las predicciones:", error);
        setLoading(false);
      });
  }, [user._id]);

  const getMonthlySums = (data) => {
    const monthlySums = {};

    Object.keys(data).forEach((date) => {
      const month = date.slice(0, 7);
      if (!monthlySums[month]) {
        monthlySums[month] = 0;
      }
      monthlySums[month] += data[date];
    });

    return monthlySums;
  };

  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        data: realData,
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: predictedData2,
        color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Tus rentas", "Predicciones"],
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <AppBar
        text="Mi Desempeño"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <LineChart
            data={data}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              backgroundColor: "#7E49FF",
              backgroundGradientFrom: "#7E49FF",
              backgroundGradientTo: "#B07EFF",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#B07EFF",
              },
            }}
            bezier
            style={styles.chart}
          />
        )}
        <Text style={styles.noDataText}>
          Acá tienes un resumen de tu desempeño en los últimos meses. Te
          mostramos una predicción de cómo se comportará tu desempeño en los
          próximos meses. ¡Sigue así!
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
    marginTop: 20,
  },
});

export default MyPerformance;
