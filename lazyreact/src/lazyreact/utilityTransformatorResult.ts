import { deepEquals } from './deepEquals';
import {
    TransformatorResult
} from './types';

export function returnEquals<Target>(result: Target, old: Target): TransformatorResult<Target> {
    const changed = deepEquals(result, old, false);
    if (changed) {
        return {
            changed: false,
            result: old
        };
    } else {
        return {
            changed: true,
            result: result
        };
    }
}