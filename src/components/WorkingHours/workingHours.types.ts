export interface WorkingHourState {
  weeklyData: {
    SUN: WorkingHourData;
    MON: WorkingHourData;
    TUE: WorkingHourData;
    WED: WorkingHourData;
    THU: WorkingHourData;
    FRI: WorkingHourData;
    SAT: WorkingHourData;
  };
}

export interface WorkingHourData {
  id: keyof WorkingHourState["weeklyData"];
  title: string;
  range: RangeData[];
}

export interface RangeData {
  start: TimeData;
  end: TimeData;
}
interface TimeData {
  hour: string;
  minute: string;
}
