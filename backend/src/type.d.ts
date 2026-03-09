export type Schedule = {
    day: string;
    startTime: string;
    endTime: string;
};
export type User = "admin" | "teacher" | "student";
export type RateLimitRole = User | "guest";