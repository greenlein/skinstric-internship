import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DemographicData {
  race: {
    black: number;
    white: number;
    "southeast asian": number;
    "south asian": number;
    "latino hispanic": number;
    "east asian": number;
    "middle eastern": number;
  };
  age: {
    "20-29": number;
    "30-39": number;
    "40-49": number;
    "10-19": number;
    "50-59": number;
    "3-9": number;
    "60-69": number;
    "70+": number;
    "0-2": number;
  };
  gender: {
    male: number;
    female: number;
  };
}

export const initialState: DemographicData = {
  race: {
    black: 0,
    white: 0,
    "southeast asian": 0,
    "south asian": 0,
    "latino hispanic": 0,
    "east asian": 0,
    "middle eastern": 0,
  },
  age: {
    "20-29": 0,
    "30-39": 0,
    "40-49": 0,
    "10-19": 0,
    "50-59": 0,
    "3-9": 0,
    "60-69": 0,
    "70+": 0,
    "0-2": 0,
  },
  gender: {
    male: 0,
    female: 0,
  },
};

const sortByHighestValue = <T extends Record<string, number>>(valueMap: T) =>
  Object.fromEntries(Object.entries(valueMap).sort(([, valueA], [, valueB]) => Number(valueB) - Number(valueA))) as T;

export const demographicSlice = createSlice({
  name: "demographics",
  initialState,
  reducers: {
    setDemographic: (state, action: PayloadAction<DemographicData>) => {
      const { data }: any = action.payload;

      state.race = sortByHighestValue(data.race);
      state.age = sortByHighestValue(data.age);
      state.gender = sortByHighestValue(data.gender);
    },
    hydrateDemographic: (_state, action: PayloadAction<DemographicData>) => action.payload,
    resetDemographic: (state) => {
      state.race = sortByHighestValue({ ...state.race });
      state.age = sortByHighestValue({ ...state.age });
      state.gender = sortByHighestValue({ ...state.gender });
    },
    manualRaceUpdate: (state, action: PayloadAction<{ race: keyof DemographicData["race"] }>) => {
      const { race } = action.payload;

      state.race = {
        ...state.race,
        [race]: state.race[race],
      } as DemographicData["race"];
    },
    manualAgeUpdate: (state, action: PayloadAction<{ age: keyof DemographicData["age"] }>) => {
      const { age } = action.payload;

      state.age = {
        ...state.age,
        [age]: state.age[age],
      } as DemographicData["age"];
    },
    manualGenderUpdate: (state, action: PayloadAction<{ gender: keyof DemographicData["gender"] }>) => {
      const { gender } = action.payload;

      state.gender = {
        ...state.gender,
        [gender]: state.gender[gender],
      } as DemographicData["gender"];
    },
  },
});

export const { setDemographic, resetDemographic, manualRaceUpdate, manualAgeUpdate, manualGenderUpdate } =
  demographicSlice.actions;

export default demographicSlice.reducer;
