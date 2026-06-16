"use server";

import { createClient } from "@/lib/supabase/server";

type FormState = {
  success: boolean;
  message: string | null;
};

export async function register(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const fullnameRaw = formData.get("fullname");
    const emailRaw = formData.get("email");
    const telRaw = formData.get("tel");
    const attachment = formData.get("attachment") as File;

    const fullname =
      typeof fullnameRaw === "string" ? fullnameRaw.trim() : "";

    const email =
      typeof emailRaw === "string" ? emailRaw.trim() : "";

    const tel =
      typeof telRaw === "string" ? telRaw.trim() : "";

    if (!fullname || !email || !tel) {
      return {
        success: false,
        message: "Please fill all required fields.",
      };
    }

    const supabase = await createClient();

    let filePath: string | null = null;

    if (attachment && attachment.size > 0) {
      const fileName = `${Date.now()}-${attachment.name}`;

      const { error: uploadError } = await supabase.storage
        .from("attachment")
        .upload(fileName, attachment);

      if (uploadError) {
        return {
          success: false,
          message: uploadError.message,
        };
      }

      filePath = fileName;
    }

    const { error } = await supabase.from("users").insert({
      fullname,
      email,
      tel,
      attachment: filePath,
    });

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: null,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unexpected error occurred.",
    };
  }
}