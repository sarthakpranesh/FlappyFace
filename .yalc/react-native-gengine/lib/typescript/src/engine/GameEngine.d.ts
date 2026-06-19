import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { GameEngineRenderFn, GameEngineSystem } from '../types';
export type GameEngineProps = {
    systems?: GameEngineSystem[];
    entities?: Record<string, unknown>;
    renderMap: Record<string, GameEngineRenderFn>;
    renderer: React.ComponentType<{
        entityKeys: string[];
        entityState: Record<string, unknown>;
        renderMap: Record<string, (args: {
            canvas: unknown;
            entity: Record<string, unknown>;
            paint: unknown;
        }) => void>;
    }>;
    running: boolean;
    onEvent: (e: any) => void;
    style: StyleProp<ViewStyle>;
    children: React.ReactNode;
};
export type GameEngineRef = {
    start: () => void;
    stop: () => void;
    dispatch: (e: any) => void;
    publish: (e: any) => void;
    publishEvent: (e: any) => void;
    dispatchEvent: (e: any) => void;
};
declare const GameEngine: React.ForwardRefExoticComponent<GameEngineProps & React.RefAttributes<GameEngineRef>>;
export default GameEngine;
//# sourceMappingURL=GameEngine.d.ts.map