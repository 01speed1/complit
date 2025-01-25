const URL = process.env.INTERNAL_API_URL;

export async function validateSessionToken(token: string) {
  try {
    const response = await fetch(`${URL}/auth/validate-token`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error("Invalid token");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error validating token:", error);
    throw new Error("Invalid token");
  }
}
