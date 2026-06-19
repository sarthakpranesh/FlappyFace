import type { FrameInfo } from 'react-native-reanimated';
import type gameState from './engine/gameState/gameState';
/**
 * Draw worklet for SkiaRenderer: (args) => void.
 * args: { canvas, entity, paint } — Skia canvas, current entity state, reusable Skia Paint.
 * Must be a Reanimated worklet (use 'worklet' directive) so it can run on the UI thread.
 * Reuse paint (e.g. setColor then draw) to avoid per-entity allocation and keep 60 FPS.
 */
export type DrawWorkletArgs = {
    canvas: unknown;
    entity: Record<string, unknown>;
    paint: unknown;
};
export type DrawWorklet = (args: DrawWorkletArgs) => void;
export type GameEngineArgs = {
    screen: {
        width: number;
        height: number;
    };
    frameInfo: FrameInfo;
    events: any[];
    dispatch: (e: any) => void;
    gameState: ReturnType<typeof gameState.getGameState>;
    setGameState: (updater: (previousValue: Record<string, unknown>) => Record<string, unknown>) => void;
};
export type GameEngineSystem = (entities: Record<string, unknown>, args: GameEngineArgs) => void;
export type GameEngineRenderFn = (args: {
    canvas: unknown;
    entity: Record<string, unknown>;
    paint: unknown;
}) => void;
//# sourceMappingURL=types.d.ts.map