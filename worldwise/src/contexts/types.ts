export type city = {
  cityName?: string;
  country?: string;
  emoji?: string;
  date?: string; // أو يمكن استخدام نوع Date إذا كنت تريد التعامل مع التواريخ ككائنات تاريخية.
  notes?: string;
  position?: {
    lat: number;
    lng: number;
  };
  id?: number;
};
export type cities = city[];
export type data = {
  cities: cities;
  loading: boolean;
  getCity: (id: number) => Promise<void>;
  currentCity: city;
};

export type user = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};
export type state = {
  isAuthenticated: boolean;
  user: null | user;
};
export type action = {
  type: string;
  payload?: user;
};
