import { createAction, props } from "@ngrx/store";

export const loadLaunchDetail = createAction("[Launch] Load Launch Detail");

export const loadLaunchDetailSuccess = createAction(
  "[Launch] Load Launch Detail Success",
  props<{ payload: any[] }>()
);

export const loadLaunchDetailFail = createAction(
  "[Launch] Load Launch Detail Fail",
  props<{ payload: any }>()
);

export type LaunchDetailAction =
  | typeof loadLaunchDetail
  | typeof loadLaunchDetailSuccess
  | typeof loadLaunchDetailFail;
