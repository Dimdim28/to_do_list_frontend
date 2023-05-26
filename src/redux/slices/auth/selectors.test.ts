import {
  MOCK_OBJECT_ONE,
  MOCK_OBJECT_THREE,
  MOCK_OBJECT_TWO,
} from "../../../mocs/state";
import { Status } from "../../../types";
import {
  selectIsAuth,
  selectIsChecked,
  selectIsRegistered,
  selectProfile,
  selectMessage,
} from "./selectors";

describe("Testing auth slice selectors", () => {
  it("SelectIsAuth must work correctly", () => {
    expect(selectIsAuth(MOCK_OBJECT_ONE)).toBe(true);
    expect(selectIsAuth(MOCK_OBJECT_TWO)).toBe(false);
  });

  it("SelectIsChecked must work correctly", () => {
    expect(selectIsChecked(MOCK_OBJECT_ONE)).toBe(true);
    expect(selectIsChecked(MOCK_OBJECT_TWO)).toBe(true);
    expect(selectIsChecked(MOCK_OBJECT_THREE)).toBe(false);
  });

  it("selectIsRegistered must work correctly", () => {
    expect(selectIsRegistered(MOCK_OBJECT_ONE)).toBe(true);
    expect(selectIsRegistered(MOCK_OBJECT_TWO)).toBe(false);
    expect(selectIsRegistered(MOCK_OBJECT_THREE)).toBe(false);
  });
});
