import { connect } from "@/config/dbconfig";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
export async function POST(req) {
  const { token, userId, accomodation } = await req.json();
  try {
    const userID = await getDataFromToken(token);
    const user = await User.findById(userID);
    if (user?.userType !== "admin" && user?.userType !== "hospitality") {
      return NextResponse.json({
        success: false,
        message: "This is protected route for Admin and Hospitality access",
      });
    }
    const data = await User.findByIdAndUpdate(userId, {
      accomodation,
    });
    return NextResponse.json({
      success: true,
      message: "Accomodation status updated",
      data: data,
    });
  } catch (err) {
    return NextResponse.json({
      error: err.message,
      success: false,
      message: "Unable to Update Accomodation Status",
    });
  }
}
