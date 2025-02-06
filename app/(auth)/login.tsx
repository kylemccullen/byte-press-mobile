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
import { AuthActionType, AuthContext } from "@/contexts/auth-context";
import { router } from "expo-router";
import { AuthToken } from "@/models/auth-token";
import { environment } from "@/environments/environment";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ui/themed-text";
import Card from "@/components/ui/card";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Login() {
  const [email, setEmail] = useState(environment.debugValues.email || "");
  const [password, setPassword] = useState(
    environment.debugValues.password || "",
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const { authDispatch } = useContext(AuthContext);

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
        authDispatch?.({ type: AuthActionType.LOGIN, payload: { authToken } });
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

  const backgroundColor = useThemeColor("background");

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ ...styles.wrapper, backgroundColor }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          contentFit="contain"
          transition={1000}
        />
        <Card style={styles.container}>
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
        </Card>
        <View style={{ alignItems: "center" }}>
          <ThemedText>Don't have an account?</ThemedText>
          <Link href="/(auth)/register" text="Register" />
        </View>
      </KeyboardAvoidingView>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "60%",
    aspectRatio: 3,
  },
  container: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
});
