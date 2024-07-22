import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Layout from "../components/Layout";

const TermsAndConditionsScreen = ({ navigation }) => {
  return (
    <Layout
      title={"Términos y condiciones"}
      showBackButton
      onBackPress={() => navigation.goBack()}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.termsText}>
          <Text style={styles.termsBoldText}>
            Términos y Condiciones de Rent & Ride
          </Text>
          {"\n"}
          Bienvenido a Rent & Ride. Al usar nuestra aplicación móvil, aceptas
          cumplir y estar sujeto a los siguientes términos y condiciones. Por
          favor, léelos atentamente.{"\n\n"}
          <Text style={styles.sectionTitle}>1. Aceptación de los Términos</Text>
          {"\n"}
          Al descargar, instalar y usar la aplicación móvil Rent & Ride, aceptas
          estos términos y condiciones, así como nuestras políticas de
          privacidad. Si no estás de acuerdo con alguno de estos términos, no
          debes utilizar la aplicación.{"\n\n"}
          <Text style={styles.sectionTitle}>2. Descripción del Servicio</Text>
          {"\n"}
          Rent & Ride ofrece una plataforma que permite a los usuarios alquilar
          sus propios autos y rentar vehículos de otros usuarios. Los servicios
          incluyen, pero no se limitan a, la visualización de autos disponibles,
          la gestión de reservas, y la comunicación entre arrendadores y
          arrendatarios.{"\n\n"}
          <Text style={styles.sectionTitle}>
            3. Registro y Cuenta de Usuario
          </Text>
          {"\n"}
          Para utilizar la aplicación, debes crear una cuenta proporcionando
          información precisa, completa y actualizada. Eres responsable de
          mantener la confidencialidad de tu cuenta y contraseña y de todas las
          actividades que ocurran bajo tu cuenta.{"\n\n"}
          <Text style={styles.sectionTitle}>4. Elegibilidad</Text>
          {"\n"}
          Debes tener al menos 18 años y poseer una licencia de conducir válida
          para utilizar los servicios de Rent & Ride. Al utilizar la aplicación,
          declaras y garantizas que cumples con estos requisitos.{"\n\n"}
          <Text style={styles.sectionTitle}>5. Uso de la Aplicación</Text>
          {"\n"}
          No utilizarás la aplicación para ningún propósito ilegal o no
          autorizado. No interferirás con el funcionamiento de la aplicación ni
          intentarás acceder a áreas restringidas. No cargarás contenido que sea
          ofensivo, difamatorio o que infrinja los derechos de terceros.{"\n\n"}
          <Text style={styles.sectionTitle}>6. Tarifas y Pagos</Text>
          {"\n"}
          Los precios de alquiler de vehículos se establecen individualmente por
          los propietarios de los autos. Rent & Ride cobra una comisión por cada
          transacción completada a través de la plataforma. Al utilizar la
          aplicación, aceptas pagar todas las tarifas aplicables.{"\n\n"}
          <Text style={styles.sectionTitle}>7. Política de Cancelación</Text>
          {"\n"}
          Las políticas de cancelación pueden variar según el propietario del
          vehículo. Te recomendamos revisar la política de cancelación de cada
          vehículo antes de realizar una reserva.{"\n\n"}
          <Text style={styles.sectionTitle}>
            8. Responsabilidad del Usuario
          </Text>
          {"\n"}
          Como usuario, eres responsable de: Cumplir con todas las leyes y
          regulaciones aplicables. Mantener y devolver el vehículo en las mismas
          condiciones en que lo recibiste. Informar inmediatamente de cualquier
          daño, accidente o incidente al propietario del vehículo y a Rent &
          Ride.{"\n\n"}
          <Text style={styles.sectionTitle}>
            9. Limitación de Responsabilidad
          </Text>
          {"\n"}
          Rent & Ride no es responsable por: La calidad, seguridad o estado de
          los vehículos alquilados. Cualquier daño o pérdida resultante del uso
          de la aplicación o de los vehículos. Cualquier disputa entre
          arrendadores y arrendatarios.{"\n\n"}
          <Text style={styles.sectionTitle}>
            10. Modificaciones de los Términos
          </Text>
          {"\n"}
          Rent & Ride se reserva el derecho de modificar estos términos y
          condiciones en cualquier momento. Te notificaremos de cualquier cambio
          significativo a través de la aplicación o por otros medios. El uso
          continuo de la aplicación después de dichos cambios constituye tu
          aceptación de los nuevos términos.{"\n\n"}
          <Text style={styles.sectionTitle}>11. Terminación</Text>
          {"\n"}
          Rent & Ride puede, a su discreción, suspender o terminar tu cuenta y
          acceso a la aplicación en cualquier momento y por cualquier motivo,
          incluyendo, pero no limitado a, el incumplimiento de estos términos.
          {"\n\n"}
          <Text style={styles.sectionTitle}>12. Ley Aplicable</Text>
          {"\n"}
          Estos términos y condiciones se regirán e interpretarán de acuerdo con
          las leyes del país en el que se encuentra Rent & Ride, sin tener en
          cuenta los principios de conflictos de leyes.{"\n\n"}
          <Text style={styles.sectionTitle}>13. Contacto</Text>
          {"\n"}
          Si tienes alguna pregunta o inquietud sobre estos términos y
          condiciones, por favor, contacta con nosotros a través de{" "}
          <Text style={styles.contactEmail}>liosoftware@gmail.com</Text>.
        </Text>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  termsText: {
    fontSize: 16,
    color: "#000000",
    textAlign: "left",
    paddingBottom: 40,
  },
  termsBoldText: {
    fontWeight: "bold",
    color: "#000000",
    fontSize: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: 10,
  },
  contactEmail: {
    textDecorationLine: "underline",
    color: "#0645AD",
  },
});

export default TermsAndConditionsScreen;
