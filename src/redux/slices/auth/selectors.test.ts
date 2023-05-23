import { MOCK_OBJECT_ONE, MOCK_OBJECT_TWO } from "../../../mocs/state";
import { Status } from "../../../types";
import {
  selectIsAuth,
  selectIsChecked,
  selectIsRegistered,
  selectProfile,
} from "./selectors";
import { AuthSliceState } from "./types";

describe("Testing quth slice selectors", () => {
  it("SelectIsAuth must work correctly", () => {
    expect(selectIsAuth(MOCK_OBJECT_ONE)).toBe(true);
    expect(selectIsAuth(MOCK_OBJECT_TWO)).toBe(false);
  });
});
