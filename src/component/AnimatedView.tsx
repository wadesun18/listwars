import Animated, {FadeIn} from 'react-native-reanimated';

export default function AnimatedView(props: any) {
  return (
    <Animated.View entering={FadeIn.delay(2000).duration(1000)}>
      {props.children}
    </Animated.View>
  );
}
