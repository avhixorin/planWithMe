import { describe, it, expect } from 'vitest';
import planReducer, { addActivity, type PlanState } from './planSlice';

describe('planSlice reducers', () => {

  it('should handle initial state', () => {
    expect(planReducer(undefined, { type: 'unknown' })).toEqual({
      plans: [],
    });
  });

  it('should handle addActivity', () => {
    const initialState: PlanState = { plans: [] };
    const activityData = {
      title: 'Morning Coffee',
      description: '',
      icon: '☕️',
      colour: '#FFF9C4',
    };

    const newState = planReducer(
      initialState,
      addActivity({ day: 'saturday', activityData })
    );

    expect(newState.plans).toHaveLength(1);
    expect(newState.plans[0].day).toBe('saturday');
    expect(newState.plans[0].activities).toHaveLength(1);
    expect(newState.plans[0].activities[0].title).toBe('Morning Coffee');
  });

});