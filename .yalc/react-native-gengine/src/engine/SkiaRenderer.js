/**
 * Skia-based renderer: draws all entities in a single Canvas commit using the Picture API.
 * Reads entityState (SharedValue) in a useDerivedValue worklet and records one Picture per frame.
 *
 * Props: entityKeys, entityState, renderMap.
 * renderMap[renderKey] is a draw worklet (args) => void with args: { canvas, entity, paint }. Reuse paint for 60 FPS.
 * Requires peer dependency @shopify/react-native-skia.
 */
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';
import { Canvas, Picture, Skia } from '@shopify/react-native-skia';

const DEFAULT_RADIUS = 4;
const DEFAULT_COLOR = 'red';

function defaultDrawCircle(args) {
  'worklet';
  const { canvas, entity, paint } = args;
  paint.setColor(Skia.Color(entity.color ?? DEFAULT_COLOR));
  canvas.drawCircle(
    entity.x ?? 0,
    entity.y ?? 0,
    entity.radius ?? DEFAULT_RADIUS,
    paint
  );
}

/**
 * Skia renderer: single Canvas, single Picture per frame. For each entity, looks up
 * renderMap[entity.renderKey ?? 'default'] and invokes it with { canvas, entity, paint }. If missing, uses built-in circle.
 *
 * @param {string[]} entityKeys - List of entity ids.
 * @param {import('react-native-reanimated').SharedValue<Record<string, object>>} entityState - Shared value holding entity state.
 * @param {Record<string, (args: { canvas: object, entity: object, paint: object }) => void>} [renderMap] - Map from renderKey to draw worklet (args) => void. args: { canvas, entity, paint }. Reuse paint per frame.
 */
export default function SkiaRenderer({ entityKeys, entityState, renderMap }) {
  const { width, height } = useWindowDimensions();

  const picture = useDerivedValue(() => {
    'worklet';
    const entities = entityState.value ?? {};
    const keys = Object.keys(entities);
    const map = renderMap ?? {};
    if (keys.length === 0) {
      const recorder = Skia.PictureRecorder();
      const canvas = recorder.beginRecording(
        Skia.XYWHRect(0, 0, width, height)
      );
      return recorder.finishRecordingAsPicture();
    }
    const recorder = Skia.PictureRecorder();
    const canvas = recorder.beginRecording(Skia.XYWHRect(0, 0, width, height));
    const paint = Skia.Paint();
    // this reduces the number of object allocations per frame
    const args = { canvas, entity: {}, paint };
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const e = entities[key];
      if (e == null) continue;
      const renderKey = e.renderKey ?? 'default';
      const drawFn = map[renderKey];
      args.entity = e;
      if (typeof drawFn === 'function') {
        drawFn(args);
      } else {
        defaultDrawCircle(args);
      }
    }
    return recorder.finishRecordingAsPicture();
  }, [entityState, width, height, renderMap]);

  return (
    <Canvas style={styles.canvas}>
      <Picture picture={picture} />
    </Canvas>
  );
}

const styles = StyleSheet.create({
  canvas: {
    ...StyleSheet.absoluteFillObject,
  },
});
