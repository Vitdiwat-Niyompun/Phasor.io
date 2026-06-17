"use server";

import { cookies } from "next/headers";

export async function addComponentToWorkspace(componentId: string, componentName: string) {
  // 1. Verify Authentication
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');

  if (!token) {
    return { success: false, message: "Unauthorized. Please log in." };
  }

  try {
    // 2. Database Logic Placeholder
    console.log(`[BACKEND LOG] Added ${componentName} (${componentId}) to DB.`);

    // 3. Simulate network delay so the button shows the loading spinner
    await new Promise((resolve) => setTimeout(resolve, 800));

    return { success: true, message: "Successfully saved to database!" };
    
  } catch (error) {
    return { success: false, message: "Failed to save to database." };
  }
}