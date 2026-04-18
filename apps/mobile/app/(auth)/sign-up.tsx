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
import { ArrowRight, ChevronLeft, Check } from 'lucide-react-native';
import { MetaLabel } from '@/components/atoms/MetaLabel';
import { CornerTicks } from '@/components/atoms/CornerTicks';
import { COLORS } from '@/theme/colors';
import { FONTS } from '@/theme/fonts';

export default function SignUpScreen() {
  const router = useRouter();
  const [alias, setAlias] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [focus, setFocus] = useState<'alias' | 'email' | 'password' | null>(null);

  const passwordStrength = scorePassword(password);
  const canSubmit =
    alias.trim().length >= 2 &&
    email.includes('@') &&
    password.length >= 6 &&
    agree;

  const onSubmit = () => {
    if (!canSubmit) return;
    // TODO: wire Clerk sign-up when dev build is available.
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
            <MetaLabel tone="mute">Sección · Inscripción</MetaLabel>
          </View>

          <View style={styles.heading}>
            <MetaLabel tone="volt" style={{ marginBottom: 14 }}>
              Capítulo 00 · Ingreso
            </MetaLabel>
            <Text style={styles.h1}>
              Un nuevo{'\n'}
              <Text style={styles.h1Italic}>expediente.</Text>
            </Text>
            <Text style={styles.sub}>
              Estás a punto de recibir un código de explorador. Tu dossier
              queda abierto al terminar — primer sello sin moverte de aquí.
            </Text>
          </View>

          {/* Progress indicator — visual only for now */}
          <View style={styles.progressRow}>
            <ProgressStep n="01" label="Identidad" active />
            <ProgressDivider />
            <ProgressStep n="02" label="Intereses" />
            <ProgressDivider />
            <ProgressStep n="03" label="Sello" />
          </View>

          <View style={styles.card}>
            <CornerTicks inset={6} size={12} color={COLORS.volt} />

            <View style={styles.cardHeader}>
              <MetaLabel tone="volt">Formulario 01 · Identidad</MetaLabel>
              <MetaLabel>CO · 04°32'N</MetaLabel>
            </View>

            <View style={{ gap: 18 }}>
              <Field
                label="Nombre de explorador"
                hint="Cómo quieres aparecer en el dossier"
                value={alias}
                onChange={setAlias}
                onFocus={() => setFocus('alias')}
                onBlur={() => setFocus(null)}
                focused={focus === 'alias'}
                autoCapitalize="words"
              />
              <Field
                label="Dirección de campo"
                hint="Tu email"
                value={email}
                onChange={setEmail}
                onFocus={() => setFocus('email')}
                onBlur={() => setFocus(null)}
                focused={focus === 'email'}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              <View>
                <Field
                  label="Clave de sello"
                  hint="Mínimo 6 caracteres"
                  value={password}
                  onChange={setPassword}
                  onFocus={() => setFocus('password')}
                  onBlur={() => setFocus(null)}
                  focused={focus === 'password'}
                  secureTextEntry
                  autoComplete="password"
                />
                <View style={styles.strengthRow}>
                  {[0, 1, 2, 3].map((i) => (
                    <View
                      key={i}
                      style={[
                        styles.strengthBar,
                        {
                          backgroundColor:
                            i < passwordStrength
                              ? strengthColor(passwordStrength)
                              : COLORS.ink700,
                        },
                      ]}
                    />
                  ))}
                  <MetaLabel tone={password.length === 0 ? 'dim' : 'mute'}>
                    {password.length === 0
                      ? 'Clave'
                      : strengthLabel(passwordStrength)}
                  </MetaLabel>
                </View>
              </View>
            </View>
          </View>

          <Pressable
            onPress={() => setAgree((v) => !v)}
            style={styles.agreeRow}
            hitSlop={6}
          >
            <View
              style={[
                styles.checkbox,
                agree && { borderColor: COLORS.volt, backgroundColor: COLORS.volt },
              ]}
            >
              {agree && <Check size={12} color={COLORS.ink950} strokeWidth={3} />}
            </View>
            <Text style={styles.agreeText}>
              Acepto los <Text style={styles.agreeLink}>términos de expedición</Text>{' '}
              y la <Text style={styles.agreeLink}>política de datos de campo</Text>.
            </Text>
          </Pressable>

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
              Abrir expediente
            </Text>
            <ArrowRight
              size={14}
              color={canSubmit ? COLORS.ink950 : COLORS.boneDim}
              strokeWidth={2.25}
            />
          </Pressable>

          <View style={styles.bottomLink}>
            <MetaLabel tone="mute">¿Ya tienes expediente?</MetaLabel>
            <Pressable onPress={() => router.replace('/(auth)/sign-in')} hitSlop={8}>
              <Text style={styles.link}>Reabrirlo</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

function scorePassword(p: string): number {
  if (p.length === 0) return 0;
  let score = 0;
  if (p.length >= 6) score++;
  if (p.length >= 10) score++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
  if (/\d/.test(p) || /[^A-Za-z0-9]/.test(p)) score++;
  return Math.min(score, 4);
}

function strengthLabel(s: number): string {
  return ['Débil', 'Débil', 'Media', 'Fuerte', 'Excelente'][s] ?? 'Débil';
}

function strengthColor(s: number): string {
  if (s >= 4) return COLORS.volt;
  if (s >= 3) return COLORS.brass;
  if (s >= 2) return COLORS.boneMute;
  return COLORS.ember;
}

function ProgressStep({
  n,
  label,
  active,
}: {
  n: string;
  label: string;
  active?: boolean;
}) {
  return (
    <View style={styles.progressStep}>
      <Text
        style={[
          styles.progressN,
          { color: active ? COLORS.volt : COLORS.boneDim },
        ]}
      >
        {n}
      </Text>
      <MetaLabel tone={active ? 'volt' : 'dim'}>{label}</MetaLabel>
    </View>
  );
}

function ProgressDivider() {
  return <View style={styles.progressDivider} />;
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
  autoCapitalize?: 'none' | 'sentences' | 'words';
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

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.ink950 },
  safe: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 32, gap: 24 },
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
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressN: {
    fontFamily: FONTS.mono.medium,
    fontSize: 11,
    letterSpacing: 1.6,
  },
  progressDivider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.ink700,
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
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
  },
  strengthBar: {
    width: 24,
    height: 3,
  },
  agreeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingRight: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: COLORS.ink700,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  agreeText: {
    flex: 1,
    fontFamily: FONTS.display.regular,
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.boneMute,
  },
  agreeLink: {
    color: COLORS.bone,
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
  bottomLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    marginTop: 4,
  },
  link: {
    fontFamily: FONTS.mono.medium,
    fontSize: 11,
    letterSpacing: 2.4,
    color: COLORS.volt,
    textTransform: 'uppercase',
  },
});
