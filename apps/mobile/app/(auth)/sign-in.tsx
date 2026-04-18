import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, ChevronLeft } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { MetaLabel } from '@/components/atoms/MetaLabel';
import { CornerTicks } from '@/components/atoms/CornerTicks';
import { COLORS } from '@/theme/colors';
import { FONTS } from '@/theme/fonts';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const canSubmit = email.length > 3 && password.length >= 6;

  const onSubmit = () => {
    if (!canSubmit) return;
    // No auth wiring yet — land on tabs.
    router.replace('/(tabs)');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.root}
    >
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topRow}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => [
                styles.backBtn,
                pressed && { borderColor: COLORS.volt },
              ]}
              hitSlop={12}
            >
              <ChevronLeft size={16} color={COLORS.bone} strokeWidth={2} />
            </Pressable>
            <MetaLabel tone="mute">Sección · Acceso</MetaLabel>
          </View>

          <View style={styles.heading}>
            <MetaLabel tone="volt" style={{ marginBottom: 14 }}>
              Capítulo · Reingreso
            </MetaLabel>
            <Text style={styles.h1}>
              Reabrir{'\n'}
              <Text style={styles.h1Italic}>expediente.</Text>
            </Text>
            <Text style={styles.sub}>
              Tu dossier personal te espera. Ingresa tus credenciales de
              campo para continuar la expedición.
            </Text>
          </View>

          <View style={styles.card}>
            <CornerTicks inset={6} size={12} color={COLORS.volt} />

            <View style={styles.cardHeader}>
              <MetaLabel tone="volt">Credenciales</MetaLabel>
              <MetaLabel>Clasif · Personal</MetaLabel>
            </View>

            <View style={{ gap: 18 }}>
              <Field
                label="Dirección de campo"
                hint="Ej: explorador@odasy.co"
                value={email}
                onChange={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                focused={emailFocused}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              <Field
                label="Clave de sello"
                hint="Mínimo 6 caracteres"
                value={password}
                onChange={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                focused={passwordFocused}
                secureTextEntry
                autoComplete="password"
              />

              <Pressable hitSlop={8} style={{ alignSelf: 'flex-end' }}>
                <Text style={styles.forgot}>¿Olvidaste tu clave?</Text>
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={onSubmit}
            disabled={!canSubmit}
            style={({ pressed }) => [
              styles.submit,
              !canSubmit && styles.submitDisabled,
              pressed && canSubmit && { backgroundColor: COLORS.voltDeep },
            ]}
          >
            <Text
              style={[
                styles.submitText,
                !canSubmit && { color: COLORS.boneDim },
              ]}
            >
              Continuar
            </Text>
            <ArrowRight
              size={14}
              color={canSubmit ? COLORS.ink950 : COLORS.boneDim}
              strokeWidth={2.25}
            />
          </Pressable>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <MetaLabel>O reabrir con</MetaLabel>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.oauthRow}>
            <OAuthButton provider="google" />
            <OAuthButton provider="apple" />
          </View>

          <View style={styles.bottomLink}>
            <MetaLabel tone="mute">¿Primera vez en campo?</MetaLabel>
            <Pressable onPress={() => router.replace('/(auth)/sign-up')} hitSlop={8}>
              <Text style={styles.link}>Iniciar inscripción</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

interface FieldProps {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  focused: boolean;
  keyboardType?: 'default' | 'email-address';
  autoCapitalize?: 'none' | 'sentences';
  autoComplete?: 'email' | 'password';
  secureTextEntry?: boolean;
}

function Field({
  label,
  hint,
  value,
  onChange,
  onFocus,
  onBlur,
  focused,
  keyboardType,
  autoCapitalize,
  autoComplete,
  secureTextEntry,
}: FieldProps) {
  return (
    <View>
      <View style={styles.fieldLabelRow}>
        <MetaLabel tone={focused ? 'volt' : 'dim'}>{label}</MetaLabel>
        <MetaLabel tone="dim">{focused ? '● rec' : '○'}</MetaLabel>
      </View>
      <TextInput
        value={value}
        onChangeText={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={hint}
        placeholderTextColor={COLORS.boneDim}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        selectionColor={COLORS.volt}
        style={[styles.input, focused && styles.inputFocused]}
      />
    </View>
  );
}

function OAuthButton({ provider }: { provider: 'google' | 'apple' }) {
  const label = provider === 'google' ? 'Google' : 'Apple';
  return (
    <Pressable
      style={({ pressed }) => [
        styles.oauthBtn,
        pressed && { borderColor: COLORS.volt },
      ]}
    >
      {provider === 'google' ? <GoogleGlyph /> : <AppleGlyph />}
      <Text style={styles.oauthText}>{label}</Text>
    </Pressable>
  );
}

function GoogleGlyph() {
  // Simplified single-color mark — fits the mono/editorial aesthetic
  // instead of the full rainbow glyph.
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24">
      <Path
        d="M21.35 11.1h-9.17v2.96h5.27c-.23 1.5-1.72 4.4-5.27 4.4-3.17 0-5.76-2.63-5.76-5.87s2.59-5.87 5.76-5.87c1.8 0 3.01.77 3.7 1.43l2.53-2.43C16.98 4.26 14.97 3.3 12.18 3.3c-5.02 0-9.1 4.08-9.1 9.1s4.08 9.1 9.1 9.1c5.26 0 8.74-3.69 8.74-8.89 0-.6-.06-1.05-.15-1.51z"
        fill={COLORS.bone}
      />
    </Svg>
  );
}

function AppleGlyph() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24">
      <Path
        d="M17.05 12.04c-.03-2.9 2.37-4.29 2.48-4.35-1.35-1.97-3.46-2.25-4.2-2.28-1.79-.18-3.5 1.05-4.41 1.05-.92 0-2.31-1.02-3.8-1-1.96.03-3.77 1.14-4.77 2.89-2.04 3.53-.52 8.76 1.45 11.63.96 1.4 2.11 2.98 3.62 2.92 1.46-.06 2.01-.94 3.77-.94s2.26.94 3.8.91c1.57-.03 2.56-1.43 3.52-2.84 1.11-1.62 1.57-3.2 1.59-3.28-.03-.02-3.05-1.17-3.08-4.63zM14.38 3.6c.81-.98 1.35-2.35 1.2-3.72-1.16.05-2.57.78-3.4 1.76-.74.86-1.39 2.25-1.22 3.59 1.29.1 2.6-.66 3.42-1.63z"
        fill={COLORS.bone}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.ink950 },
  safe: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 32, gap: 28 },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderWidth: 1,
    borderColor: COLORS.ink700,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {},
  h1: {
    fontFamily: FONTS.display.medium,
    fontSize: 52,
    lineHeight: 54,
    color: COLORS.bone,
    letterSpacing: -2.2,
    marginTop: 4,
  },
  h1Italic: {
    fontFamily: FONTS.display.italic,
    color: COLORS.volt,
  },
  sub: {
    marginTop: 16,
    fontFamily: FONTS.display.regular,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.boneMute,
    maxWidth: 340,
  },
  card: {
    position: 'relative',
    borderWidth: 1,
    borderColor: COLORS.ink700,
    backgroundColor: COLORS.ink900,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  input: {
    fontFamily: FONTS.mono.regular,
    fontSize: 14,
    color: COLORS.bone,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.ink700,
    paddingVertical: 10,
    paddingHorizontal: 0,
    letterSpacing: 0.2,
  },
  inputFocused: {
    borderBottomColor: COLORS.volt,
  },
  forgot: {
    fontFamily: FONTS.mono.regular,
    fontSize: 11,
    color: COLORS.boneMute,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.ink700,
  },
  submit: {
    backgroundColor: COLORS.volt,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  submitDisabled: {
    backgroundColor: COLORS.ink900,
    borderWidth: 1,
    borderColor: COLORS.ink700,
  },
  submitText: {
    fontFamily: FONTS.mono.medium,
    fontSize: 12,
    letterSpacing: 3.2,
    color: COLORS.ink950,
    textTransform: 'uppercase',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.ink700 },
  oauthRow: { flexDirection: 'row', gap: 10 },
  oauthBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.ink700,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  oauthText: {
    fontFamily: FONTS.mono.regular,
    fontSize: 12,
    letterSpacing: 2.4,
    color: COLORS.bone,
    textTransform: 'uppercase',
  },
  bottomLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    marginTop: 12,
  },
  link: {
    fontFamily: FONTS.mono.medium,
    fontSize: 11,
    letterSpacing: 2.4,
    color: COLORS.volt,
    textTransform: 'uppercase',
  },
});
