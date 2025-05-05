import { CalendarDate } from "@heroui/react";
import { Dispatch } from "react";

export type initialStateType = {
  questions: any[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  index: number;
  secondsRemaining: number;
  answer: number | null;
  hasAnswered: boolean;
  points: number;
};

type QuestionType = {
  question: string;
  options: string[];
  correctOption: number;
};

export type QuestionFileType = {
  index: number;
  questions: QuestionType[];
  points: number;
  totalPoints: number;
  currentQuestion: QuestionType;
  answer: number | null;
  hasAnswered: boolean;
  minutes: string;
  seconds: string;
  dispatch: Dispatch<ActionType>;
};

type ActionType =
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "resetQuiz" };

export type initialStatePracticeType = {
  balance: number;
  loan: number;
  isOpen: boolean;
};

export type BtnArrayType = {
  className: string;
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  title: string;
  onPress: () => void;
};

export type CityInfoType = {
  id: string;
  cityName: string;
  emoji: string;
  date: string;
  position: {
    lat: number;
    lng: number;
  };
  country?: string;
  notes?: string;
};

export type CityContextType = {
  isPending: boolean;
  cities: any[];
  cityInfo: CityInfoType;
  errorText: string;
  // handleFetchCities: () => Promise<void>;
  handleCityInfo: (id: string) => Promise<void>;
  handleSaveCity: (cityInfo: CityInfoType) => Promise<void>;
  handleDeleteCity: (id: string) => Promise<void>;
};

export type SigninType = {
  email: string;
  password: string;
};

export type UserType = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  isPending: boolean;
  user: UserType | null;
  errorText: string;
  handleLogin: (credentials: SigninType) => Promise<void>;
  handleLogout: () => Promise<void>;
};

export type AuthAction =
  | { type: "loading" }
  | { type: "error" }
  | { type: "loggedIn"; payload: UserType }
  | { type: "logout" };

export type Action =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: any[] }
  | { type: "city/loaded"; payload: CityInfoType }
  | { type: "city/created"; payload: CityInfoType }
  | { type: "city/deleted"; payload: string }
  | { type: "rejected"; payload: string };

export type PositionType = {
  lat: number;
  lng: number;
} | null;

export type FormInputs = {
  cityName: string;
  date: CalendarDate | null;
  note: string;
};
