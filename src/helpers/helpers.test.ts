import { DailyStats } from "../redux/slices/profile/types";
import { getChartData } from "./stats";
import { humaniseDate, truncate } from "./string";

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

    it("truncate should work correctly", () => {
      const DATES:[string,string,number][] = [
        ["abcd", "abcd", 12],
        ["1234567", "12345…",6],
        ["abcd12345", "abcd123…", 8],
        ["XD", "XD", 2],
        ["nesterov lmao", "nesterov…", 9],
        ["ave de shems", "ave de shems", 18],
        ["123", "123", 4],
        ["123456", "1234…", 5],
        ["1234567890123456789012", "1234567890123456789…", 20],
        ["sqwyrttty", "sqwyrt…", 7],
      ];
      for (const date of DATES) {
        const [input,output,count] = date
        expect(truncate(input,count)).toBe(output);
      }
    });
  });
  describe("Testing stats helpers", () => {
    const statsInfo: DailyStats[] = [
      {
        date: "2023-05-27T10:12:42.484Z",
        counter: 10,
      },
      {
        date: "2022-04-13T10:10:30.104Z",
        counter: 5,
      },
      {
        date: "2010-08-04T10:06:15.444Z",
        counter: 6,
      },
    ];
    it("Should workc correctly", () => {
      const data = getChartData(statsInfo);

      expect(data.labels).toEqual(["27.05.2023", "13.04.2022", "04.08.2010"]);
      expect(data.datasets[0].data).toEqual([10, 5, 6]);
    });
  });
});