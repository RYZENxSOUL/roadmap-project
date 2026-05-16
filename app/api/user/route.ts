import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import User from "@/app/models/User";

export async function GET() {

  try {

    await connectDB();

    const user =
      await User.findById(
        "6a0842de8baa4247b5b40153"
      );

    return NextResponse.json(user);

  } catch (error) {

    return NextResponse.json(
      {
        error: "Failed to fetch user",
      },
      {
        status: 500,
      }
    );
  }
}