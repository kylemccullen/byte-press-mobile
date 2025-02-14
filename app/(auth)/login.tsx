import {
  Text,
  View,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  Keyboard,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import TextInput from "@/components/ui/text-input";
import Button from "@/components/ui/button";
import Link from "@/components/ui/link";
import { useContext, useState } from "react";
import { login } from "@/services/user";
import { AuthActionType, AuthContext } from "@/contexts/auth-context";
import { router } from "expo-router";
import { AuthToken } from "@/models/auth-token";
import { environment } from "@/environments/environment";
import { ThemedText } from "@/components/ui/themed-text";
import Card from "@/components/ui/card";
import { ThemedView } from "@/components/ui/themed-view";

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

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <ThemedView className="flex-1">
        <KeyboardAvoidingView
          className="flex-1 items-center justify-center"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: "60%", aspectRatio: 3 }}
            contentFit="contain"
            transition={1000}
          />
          <Card className="w-[80%] mb-3">
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
          <View className="items-center">
            <ThemedText>Don't have an account?</ThemedText>
            <Link push={true} href="/(auth)/register" text="Register" />
            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgot-password")}
            >
              <Text className="underline p-1 text-blue-500">
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ThemedView>
    </TouchableNativeFeedback>
  );
}
