import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Nunito_400Regular } from '@expo-google-fonts/nunito/400Regular';
import { Nunito_600SemiBold } from '@expo-google-fonts/nunito/600SemiBold';
import { Nunito_700Bold } from '@expo-google-fonts/nunito/700Bold';
import { Nunito_800ExtraBold } from '@expo-google-fonts/nunito/800ExtraBold';

import { colors } from './src/theme';
import { useRoutine } from './src/useRoutine';
import { HomeScreen } from './src/screens/HomeScreen';
import { ChecklistScreen } from './src/screens/ChecklistScreen';
import { ExerciseScreen } from './src/screens/ExerciseScreen';
import { DoneScreen } from './src/screens/DoneScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { RestSheet } from './src/components/RestSheet';
import { InfoModal } from './src/components/InfoModal';

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  const { state, vm, actions } = useRoutine();

  if (!fontsLoaded) {
    return <View style={styles.loading} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <StatusBar style="dark" />

        {state.screen === 'home' && (
          <HomeScreen
            lastA={vm.lastA}
            lastB={vm.lastB}
            lastC={vm.lastC}
            onStartA={() => actions.start('A')}
            onStartB={() => actions.start('B')}
            onStartC={() => actions.start('C')}
            onProgress={actions.goProgress}
            onPain={actions.openPain}
          />
        )}

        {state.screen === 'warmup' && (
          <ChecklistScreen
            dayTitle={vm.dayTitle}
            heading="Calentamiento"
            description="Haz cada paso una vez, con calma. No es una serie, es para entrar en calor."
            items={vm.warmup}
            doneMap={Object.fromEntries(
              vm.warmup.map((_, i) => [i, !!state.checks['w' + i]])
            )}
            onToggle={(i) => actions.toggleCheck('w', i)}
            ctaLabel="Empezar ejercicios"
            ctaColor={colors.dark}
            onCta={actions.goFirstExercise}
            onBack={actions.goHome}
            onPain={actions.openPain}
          />
        )}

        {state.screen === 'exercise' && vm.ex && (
          <ExerciseScreen
            stepLabel={vm.stepLabel}
            ex={vm.ex}
            isCircuit={vm.isCircuit}
            sets={vm.sets}
            nextLabel={vm.nextLabel}
            onBack={actions.goHome}
            onOpenRir={actions.openRir}
            onCompleteSet={actions.completeSet}
            onSetSet={actions.setSet}
            onNext={actions.nextExercise}
            onPain={actions.openPain}
          />
        )}

        {state.screen === 'cooldown' && (
          <ChecklistScreen
            dayTitle={vm.dayTitle}
            heading="Enfriamiento"
            description="Ya terminaste la parte fuerte. Cierra con esto, sin prisa."
            items={vm.cooldown}
            doneMap={Object.fromEntries(
              vm.cooldown.map((_, i) => [i, !!state.checks['c' + i]])
            )}
            onToggle={(i) => actions.toggleCheck('c', i)}
            ctaLabel="Terminar el día"
            ctaColor={colors.green}
            onCta={actions.finishDay}
            onBack={actions.goHome}
            onPain={actions.openPain}
          />
        )}

        {state.screen === 'done' && (
          <DoneScreen doneLine={vm.doneLine} onProgress={actions.goProgress} onHome={actions.goHome} />
        )}

        {state.screen === 'progress' && (
          <ProgressScreen
            week={vm.week}
            weekSummary={vm.weekSummary}
            sessions={vm.sessions}
            onBack={actions.goHome}
          />
        )}

        <RestSheet visible={vm.timerOn} timerText={vm.timerText} onSkip={actions.skipRest} />

        <InfoModal
          visible={state.showPain}
          title="¿Sientes dolor?"
          body="Molestia leve o cansancio está bien. Si sientes dolor agudo en la rodilla, detente y reduce el movimiento. Esto nunca es normal durante el ejercicio."
          onClose={actions.closePain}
        />

        <InfoModal
          visible={state.showRir}
          title="¿Qué es RIR?"
          body="Son las repeticiones que podrías hacer todavía al terminar la serie. RIR 3 significa parar cuando sientas que te quedan unas 3 más. No hay que llegar al límite."
          onClose={actions.closeRir}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
  loading: {
    flex: 1,
    backgroundColor: colors.screenBg,
  },
});
