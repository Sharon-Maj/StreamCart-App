import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

interface Tag {
  id: string;
  product: { name: string; price: number };
  x: number;
  y: number;
}

interface Props {
  tags: Tag[];
  onTagPress: (tag: Tag) => void;
}

const LiveTagOverlay: React.FC<Props> = ({ tags, onTagPress }) => {
  return (
    <View style={styles.overlay} pointerEvents="box-none">
      {tags.map((tag) => {
        const translateX = useSharedValue(tag.x);
        const translateY = useSharedValue(tag.y);

        const gestureHandler = useAnimatedGestureHandler({
          onStart: (_, ctx: any) => {
            ctx.startX = translateX.value;
            ctx.startY = translateY.value;
          },
          onActive: (event, ctx: any) => {
            translateX.value = ctx.startX + event.translationX;
            translateY.value = ctx.startY + event.translationY;
          },
        });

        const animatedStyle = useAnimatedStyle(() => ({
          transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
          ],
        }));

        return (
          <PanGestureHandler key={tag.id} onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.tag, animatedStyle]}>
              <TouchableOpacity onPress={() => onTagPress(tag)}>
                <Text style={styles.tagText}>
                  {tag.product.name} - ${tag.product.price}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tag: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 20, 147, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  tagText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default LiveTagOverlay;
