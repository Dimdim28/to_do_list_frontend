import {
  MOCK_OBJECT_ONE,
  MOCK_OBJECT_THREE,
  MOCK_OBJECT_TWO,
} from "../../../mocs/state";

import {
  selectProfileStatus,
  selectUserProfile,
  selectProfileMessage
} from "./selectors";

import { Status } from "../../../types";

describe("Testing profile slice selectors", () => {
  it("selectProfileStatus must work correctly", () => {
    expect(selectProfileStatus(MOCK_OBJECT_ONE)).toBe(Status.LOADING);
    expect(selectProfileStatus(MOCK_OBJECT_TWO)).toBe(Status.SUCCESS);
    expect(selectProfileStatus(MOCK_OBJECT_THREE)).toBe(Status.ERROR);
  });
});
