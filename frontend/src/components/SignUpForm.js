import { StyleSheet, View } from 'react-native';
import CarreraSelect from './CarreraSelect';
/* Components */
import Input from './Input';

const SignUpForm = ({
  name,
  setName,
  carrera,
  setCarrera,
  carnet,
  setCarnet,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleSignUp,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Input
        style={styles.input}
        title='Correo Electrónico'
        placeholder='Ingrese su dirección de correo'
        text={email}
        onChangeText={(newText) => setEmail(newText.toLowerCase())}
      />
      <Input
        style={styles.input}
        title='Nombre y Apellido'
        placeholder='Ingrese su nombre y apellido'
        text={name}
        onChangeText={(newText) => setName(newText)}
      />
      <Input
        style={styles.input}
        title='Carnet'
        placeholder='Ingresa tu carnet UNIMET'
        text={carnet}
        onChangeText={(newText) => setCarnet(newText)}
      />

      <CarreraSelect carrera={carrera} setCarrera={setCarrera} />
      <Input
        style={styles.input}
        title='Contraseña'
        placeholder='Ingrese su contraseña'
        isPassword={true}
        text={password}
        onChangeText={(newText) => setPassword(newText)}
      />
      <Input
        style={styles.input}
        title='Confirmar Contraseña'
        placeholder='Repita la contraseña'
        isPassword={true}
        text={confirmPassword}
        onChangeText={(newText) => setConfirmPassword(newText)}
        onSubmit={handleSignUp}
      />
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({});
