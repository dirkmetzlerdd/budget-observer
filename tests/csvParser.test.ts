import { describe, expect, test } from "vitest";
import {
  getDefaultGroupId,
  getDetectedGroupId,
} from "~/@/lib/csvParser.server";

const groups = [
  {
    id: "23",
    name: "Energy",
    description: "",
    color: "maroon",
    partners: ["SvS"],
  },
  {
    id: "24",
    name: "Groceries",
    description: "",
    color: "olive",
    partners: ["LIDL", "DM"],
  },
  {
    id: "25",
    name: "Telefonica",
    description: "",
    color: "blanchedalmond",
    partners: ["TelefOnica", "Vodafonica"],
  },
  {
    id: "26",
    name: "Telefonica Again",
    description: "",
    color: "blanchedalmond",
    partners: ["TelefOnica", "Vodafonica"],
  },
];

describe("getDetectedGroupIds", () => {
  test("should return the detected groupId", () => {
    expect(getDetectedGroupId(groups, "SvS")).toBe("23");
    expect(getDetectedGroupId(groups, "LIDL")).toBe("24");
    expect(getDetectedGroupId(groups, "DM")).toBe("24");
  });

  test("should return the detected groupId (case insaensetive)", () => {
    expect(getDetectedGroupId(groups, "sVs")).toBe("23");
    expect(getDetectedGroupId(groups, "lidl")).toBe("24");
    expect(getDetectedGroupId(groups, "dM")).toBe("24");
  });

  test("should return undefined if group id not detected", () => {
    expect(getDetectedGroupId(groups, "NotInGroups")).toBeUndefined();
    expect(getDetectedGroupId(groups, "")).toBeUndefined();
  });

  test("should return undefined if multiple groupIds detected", () => {
    expect(getDetectedGroupId(groups, "TelefOnica")).toBeUndefined();
  });

  test("should return undefined if groups array is empty", () => {
    expect(getDetectedGroupId([], "LIDL")).toBeUndefined();
  });
});

describe("getDefaultGroupId", () => {
  test("should return null if no groups are provided", () => {
    expect(getDefaultGroupId(null)).toBeNull();
  });

  test("should return null if no default group", () => {
    expect(getDefaultGroupId(groups)).toBeNull();
  });

  test("should return the default group id", () => {
    const groupsWithDefaultGroup = [
      ...groups,
      {
        id: "40",
        name: "Other",
        description: "",
        color: "blanchedalmond",
        partners: [],
      },
    ];
    expect(getDefaultGroupId(groupsWithDefaultGroup)).toBe("40");
  });
});
