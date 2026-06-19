"use strict";

import React, { useRef, useEffect, useCallback, useImperativeHandle, forwardRef, useMemo } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSharedValue, useFrameCallback } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import SkiaRenderer from "./SkiaRenderer.js";
import { compileEntities } from "./compileEntities.js";
import gameState from "./gameState/gameState.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const screen = Dimensions.get('window');
const GameEngine = /*#__PURE__*/forwardRef(({
  systems = [],
  entities: entitiesProp = {},
  renderMap,
  renderer: Renderer = SkiaRenderer,
  running = true,
  onEvent,
  style,
  children
}, ref) => {
  const eventsRef = useRef([]);
  const entityState = useSharedValue({});
  const eventsShared = useSharedValue([]);
  const dispatchRef = useRef(null);
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;
  const dispatch = useCallback(e => {
    eventsRef.current.push(e);
    eventsShared.value = eventsRef.current.map(x => ({
      ...x
    }));
    if (onEventRef.current) onEventRef.current(e);
  }, [eventsShared]);
  dispatchRef.current = dispatch;
  const dispatchStable = useCallback(e => {
    dispatchRef.current?.(e);
  }, []);
  const {
    renderKey,
    entityKeys,
    renderKeyMap
  } = useMemo(() => {
    const {
      logicState,
      renderKeyMap
    } = compileEntities(entitiesProp || {});
    const keys = Object.keys(logicState);
    entityState.value = {
      ...logicState
    };
    return {
      renderKey: keys?.join(',') ?? 'empty',
      entityKeys: keys,
      renderKeyMap
    };
  }, [entitiesProp, entityState]);
  const tickWorklet = useCallback(frameInfo => {
    'worklet';

    const entities = {
      ...entityState.value
    };
    const events = eventsShared.value ?? [];
    const args = {
      screen,
      frameInfo,
      events,
      dispatch: e => scheduleOnRN(dispatchStable, e),
      gameState: gameState.getGameState(),
      setGameState: gameState.setGameState
    };
    if (Array.isArray(systems)) {
      for (let i = 0; i < systems.length; i++) {
        const sys = systems[i];
        if (typeof sys === 'function') sys(entities, args);
      }
    }

    // update shared values
    entityState.value = entities;
  }, [systems, dispatchStable, entityState, eventsShared]);
  const frameCallback = useFrameCallback(tickWorklet, false);
  useEffect(() => {
    const hasEntities = entityKeys.length > 0;
    if (!!hasEntities && !!running) {
      setTimeout(() => {
        frameCallback.setActive(true);
      }, 1000);
      dispatch({
        type: 'started'
      });
    } else {
      frameCallback.setActive(false);
      dispatch({
        type: 'stopped'
      });
    }
  }, [running, frameCallback, entityKeys.length, dispatch]);
  useImperativeHandle(ref, () => ({
    start: () => frameCallback.setActive(true),
    stop: () => frameCallback.setActive(false),
    dispatch,
    publish: dispatch,
    publishEvent: dispatch,
    dispatchEvent: dispatch
  }), [dispatch, frameCallback]);
  return /*#__PURE__*/_jsxs(View, {
    style: [styles.container, style],
    pointerEvents: "none",
    children: [/*#__PURE__*/_jsx(Renderer, {
      entityKeys: entityKeys,
      renderMap: renderMap,
      renderKeyMap: renderKeyMap,
      entityState: entityState
    }, renderKey), /*#__PURE__*/_jsx(View, {
      style: StyleSheet.absoluteFill,
      children: children
    })]
  });
});
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  entityContainer: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});
export default GameEngine;
//# sourceMappingURL=GameEngine.js.map