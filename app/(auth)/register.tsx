import {
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
import { useState } from "react";
import { register } from "@/util/user";
import { passwordMinimumLength } from "@/constants";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ui/themed-text";
import Card from "@/components/ui/card";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const formErrors: FormErrors = {};

    if (!email) formErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      formErrors.email = "Email is invalid.";

    if (!password) formErrors.password = "Password is required.";
    else if (password.length < passwordMinimumLength)
      formErrors.password = `Password must be at least ${passwordMinimumLength} characters.`;

    if (!confirmPassword)
      formErrors.confirmPassword = "Confirm Password is required.";
    else if (confirmPassword != password)
      formErrors.confirmPassword = "Passwords must match.";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  var submitForm = () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    register(email, password)
      .then(() => Alert.alert("Yay!", "Succesfully Registered!"))
      .catch((error) => {
        var errors = error.response?.data?.errors;
        Alert.alert(
          "Oops",
          errors
            ? Object.values(errors).flat().join("\n")
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
            label="Name"
            keyboardType="default"
            value={name}
            onChangeText={setName}
          />
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
          <TextInput
            label="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={errors.confirmPassword}
          />
          <Button text="Sign Up" onPress={submitForm} loading={loading} />
        </Card>
        <View style={{ alignItems: "center" }}>
          <ThemedText>Already have an account?</ThemedText>
          <Link href="/(auth)/login" text="Login" />
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
