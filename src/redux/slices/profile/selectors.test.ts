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

  it("SelectUserProfile must work correctly", () => {
    const recievedFirstState = selectUserProfile(MOCK_OBJECT_ONE);
    const recievedSecondState = selectUserProfile(MOCK_OBJECT_TWO);
    const recievedThirdState = selectUserProfile(MOCK_OBJECT_THREE);

    expect(recievedFirstState).toBe(null);
    expect(recievedSecondState).toEqual({
      _id: "6460e2e3832ea98269aa3777",
      username: "dench",
      email: "dench@gmail.com",
      createdAt: "2023",
      updatedAt: "2024",
      avatarUrl: "link",
    });
    expect(recievedThirdState).toBe(null);
  });
});
