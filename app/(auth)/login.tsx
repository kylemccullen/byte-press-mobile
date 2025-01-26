import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import TextInput from "@/components/ui/text-input";
import Button from "@/components/ui/button";
import Link from "@/components/ui/link";
import { Colors } from "@/constants/colors";
import { useContext, useState } from "react";
import { login } from "@/util/user";
import { router } from "expo-router";
import { AuthToken } from "@/models/auth-token";
import { AuthContext } from "@/contexts/auth-context";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Login() {
  const [email, setEmail] = useState("kyle@email.com");
  const [password, setPassword] = useState("Password@1");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);

  const validateForm = () => {
    const formErrors: FormErrors = {};

    if (!email) formErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      formErrors.email = "Email is invalid.";

    if (!password) formErrors.password = "Password is required.";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  var submitForm = () => {
    if (!validateForm()) return;

    setLoading(true);

    login(email, password)
      .then((authToken: AuthToken) => {
        setToken?.(authToken);
        router.push("/home");
      })
      .catch((error) => {
        Alert.alert(
          "Oops",
          error.status == 401
            ? "Invalid email and password combination."
            : "An unexpected error occured.",
        );
      })
      .finally(() => setLoading(false));
  };

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          contentFit="contain"
          transition={1000}
        />
        <View style={styles.container}>
          <TextInput
            label="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />
          <TextInput
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />
          <Button text="Login" onPress={submitForm} loading={loading} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text>Don't have an account?</Text>
          <Link href="/(auth)/register" text="Register" />
        </View>
      </KeyboardAvoidingView>
    </TouchableNativeFeedback>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.appBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "60%",
    aspectRatio: 3,
  },
  container: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
});
