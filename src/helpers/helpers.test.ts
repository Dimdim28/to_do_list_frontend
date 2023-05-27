import { humaniseDate } from "./string";

describe("Testing helpers", () => {
  describe("testing string helpers", () => {
    it("humaniseDate should work correctly", () => {
      const DATES = [
        ["2023-05-27T10:12:42.484Z", "27.05.2023"],
        ["2022-04-13T10:10:30.104Z", "13.04.2022"],
        ["2010-08-04T10:06:15.444Z", "04.08.2010"],
        ["2024-12-06T10:22:30.444Z", "06.12.2024"],
      ];
      for (const date of DATES) {
        expect(humaniseDate(date[0])).toBe(date[1]);
      }
    });
  });
});
