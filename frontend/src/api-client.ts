import { RegisterFormData, SignInFormData } from "./utils/models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`http://localhost:3000/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);
  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(
    `http://localhost:3000/api/auth/validate-token`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Invalid Token");
  }

  return response.json();
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);
  return responseBody;
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) throw new Error("Something went wrong");
};

export const addHotel = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/add`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }
  return response.json();
};

export const fetchHotels = async () => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("Error fetching hotels");

  return response.json();
};

export const fetchHotelById = async (hotelId: string) => {
  console.log(hotelId);
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotel");
  }

  return response.json();
};

export const updateHotel = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) throw new Error("Failed to update Hotel");

  return response.json();
};
