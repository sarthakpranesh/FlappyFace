/**
 * Normalizes entities into logic state (serializable, for engine worklet).
 * Strips `renderer` from each entity so it does not appear in logicState.
 * The render map is passed separately to GameEngine via the `renderMap` prop (keyed by renderKey).
 *
 * @param {Record<string, object>} entities - Entities keyed by id; each may have a `renderer` (stripped, not returned).
 * @returns {{ logicState: Record<string, object> }}
 */
export function compileEntities(entities) {
  if (!entities || typeof entities !== 'object') {
    return { logicState: {} };
  }
  const renderKeyMap = {};
  const logicState = {};
  for (const key of Object.keys(entities)) {
    const entity = entities[key];
    if (entity == null) continue;
    const { renderer, ...rest } = entity;
    renderKeyMap[key] = renderer ?? 'default';
    logicState[key] = rest;
  }
  return { logicState, renderKeyMap };
}
