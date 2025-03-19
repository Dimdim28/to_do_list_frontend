import { RootState } from '../../store';

export const selectRoadmapData = (state: RootState) => state.roadmap.data;
export const selectRoadmapStatus = (state: RootState) => state.roadmap.status;
export const selectRoadmapMessage = (state: RootState) => state.roadmap.message;
