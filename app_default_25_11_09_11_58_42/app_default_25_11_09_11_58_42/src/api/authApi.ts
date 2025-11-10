// src/api/authApi.ts
// ... (Define all necessary interfaces here, as done in previous steps)

export const registerUser = async (data: any): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300)); 
    console.log(`MOCK: Registration successful.`);
};

export const loginUser = async (data: any): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // MOCK GUIDE Credentials 
    if (data.email === "guide@test.com" && data.password === "guidepass") {
        return { token: "mock_guide_token", role: "guide" as const };
    }
    // MOCK USER Credentials
    if (data.email === "user@test.com" && data.password === "userpass") {
        return { token: "mock_user_token", role: "user" as const };
    }
    throw new Error("Invalid credentials.");
};

export const verifyOtp = async (data: any): Promise<void> => { /* MOCK SUCCESS */ };
export const onboardGuide = async (data: any): Promise<void> => { /* MOCK SUCCESS */ };