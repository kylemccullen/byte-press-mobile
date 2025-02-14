import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import TextInput from "@/components/ui/text-input";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { environment } from "@/environments/environment";
import { forgotPassword } from "@/services/user";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableNativeFeedback,
} from "react-native";

interface FormErrors {
  email?: string;
}

export default function ForgotPassword() {
  const [email, setEmail] = useState(environment.debugValues.email || "");
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const formErrors: FormErrors = {};

    if (!email) formErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      formErrors.email = "Email is invalid.";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const resetForm = () => {
    setEmail("");
  };

  var submitForm = () => {
    if (!validateForm()) return;

    setLoading(true);

    forgotPassword(email)
      .then(() => {
        resetForm();
        Alert.alert("Success!", "Check your email for password reset link.");
      })
      .catch(() => Alert.alert("Oops!", "An unexpected error occured"))
      .finally(() => setLoading(false));
  };

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <ThemedView className="flex-1">
        <KeyboardAvoidingView
          className="flex-1 items-center justify-center"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ThemedText className="text-2xl mb-3">Forgot Password</ThemedText>
          <Card className="w-[80%] mb-3">
            <TextInput
              label="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
            />

            <Button text="Submit" onPress={submitForm} loading={loading} />
          </Card>
        </KeyboardAvoidingView>
      </ThemedView>
    </TouchableNativeFeedback>
  );
}
