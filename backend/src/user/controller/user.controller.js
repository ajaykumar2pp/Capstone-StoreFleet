// Please don't change the pre-written code
// Import the necessary modules here

import { sendPasswordResetEmail } from "../../../utils/emails/passwordReset.js";
import { sendWelcomeEmail } from "../../../utils/emails/welcomeMail.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";
import { sendToken } from "../../../utils/sendToken.js";
import {
  createNewUserRepo,
  deleteUserRepo,
  findUserForPasswordResetRepo,
  findUserRepo,
  getAllUsersRepo,
  updateUserProfileRepo,
  updateUserRoleAndProfileRepo,
} from "../models/user.repository.js";
import crypto from "crypto";

export const createNewUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(req.body)

  try {
    if (!name || !email || !password) {
      return next(new ErrorHandler(400, "please enter name/email/password"));
    }

    const newUser = await createNewUserRepo(req.body);
    await sendToken(newUser, res, 200);

    // Implement sendWelcomeEmail function to send welcome message
    await sendWelcomeEmail(newUser);

  } catch (err) {
    //  handle error for duplicate email
    if (err.message.includes("User already registered")) {
      return res.status(400).json({ success: false, error: "Email already registered" });
    }
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler(400, "please enter email/password"));
    }
    const user = await findUserRepo({ email }, true);
    if (!user) {
      return next(
        new ErrorHandler(401, "user not found! register yourself now!!")
      );
    }
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return next(new ErrorHandler(401, "Invalid email or passswor!"));
    }
    await sendToken(user, res, 200);
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const logoutUser = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({ success: true, msg: "logout successful" });
};

export const forgetPassword = async (req, res, next) => {
  // Implement feature for forget password
  try {
    const { email } = req.body;
    console.log(req.body)

    if (!email) {
      return next(new ErrorHandler(400, "Please provide an email!"));
    }

    // Check if user exists
    const user = await findUserRepo({ email });
    // console.log("Database response:", user);

    if (!user) {
      return next(new ErrorHandler(404, "User not found"));
    }

    // Generate a reset token
    const resetToken = user.getResetPasswordToken();
    // console.log("Generated Token:", resetToken);
    // console.log("Hashed Token:", user.resetPasswordToken);
    // console.log("Expiration Time:", user.resetPasswordExpire);

    await user.save({ validateBeforeSave: false });

    // console.log("Database response after token:", await findUserRepo({ email }));

    // Create Reset URL
    const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/storefleet/user/password/reset/${resetToken}`;
    // console.log("Reset Password URL:", resetPasswordURL );

    // Send email with reset token
    await sendPasswordResetEmail(user, resetPasswordURL, resetToken);

    res.status(200).json({ success: true, message: "Password reset email sent successfully!" });
  } catch (err) {
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
};

export const resetUserPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    // console.log("Received Reset Token:", token);

    if (!password || password !== confirmPassword) {
      return next(new ErrorHandler(400, "Password and confirm password must match!"));
    }

    //  hash token and find user
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log("Hashed Token:", hashedToken);

    const user = await findUserForPasswordResetRepo(hashedToken);
    // console.log("Database response for reset:", user);

    if (!user) {
      return next(new ErrorHandler(400, "Invalid or expired token"));
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // send token
    await sendToken(user, res, 200);

  } catch (err) {
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
};


export const getUserDetails = async (req, res, next) => {
  try {
    const userDetails = await findUserRepo({ _id: req.user._id });
    res.status(200).json({ success: true, userDetails });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

export const updatePassword = async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  try {
    if (!currentPassword) {
      return next(new ErrorHandler(401, "pls enter current password"));
    }

    const user = await findUserRepo({ _id: req.user._id }, true);
    const passwordMatch = await user.comparePassword(currentPassword);
    if (!passwordMatch) {
      return next(new ErrorHandler(401, "Incorrect current password!"));
    }

    if (!newPassword || newPassword !== confirmPassword) {
      return next(
        new ErrorHandler(401, "mismatch new password and confirm password!")
      );
    }

    user.password = newPassword;
    await user.save();
    await sendToken(user, res, 200);
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const updateUserProfile = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const updatedUserDetails = await updateUserProfileRepo(req.user._id, {
      name,
      email,
    });
    res.status(201).json({ success: true, updatedUserDetails });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

// admin controllers
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await getAllUsersRepo();
    res.status(200).json({ success: true, allUsers });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

export const getUserDetailsForAdmin = async (req, res, next) => {
  try {
    const userDetails = await findUserRepo({ _id: req.params.id });
    if (!userDetails) {
      return res
        .status(400)
        .json({ success: false, msg: "no user found with provided id" });
    }
    res.status(200).json({ success: true, userDetails });
  } catch (error) {
    return next(new ErrorHandler(500, error));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await deleteUserRepo(req.params.id);
    if (!deletedUser) {
      return res
        .status(400)
        .json({ success: false, msg: "no user found with provided id" });
    }

    res
      .status(200)
      .json({ success: true, msg: "user deleted successfully", deletedUser });
  } catch (error) {
    return next(new ErrorHandler(400, error));
  }
};

export const updateUserProfileAndRole = async (req, res, next) => {
  // Write your code here for updating the roles of other users by admin
  try {
    const { name, email, role } = req.body;
    const { id } = req.params;

    const updatedUser = await updateUserRoleAndProfileRepo(id, { name, email, role });
    
    if (!updatedUser) {
      return next(new ErrorHandler(404, "User not found!"));
    }

    res.status(200).json({
      success: true,
      message: "User profile and role updated successfully",
      updatedUser,
    });
  } catch (error) {
    return next(new ErrorHandler(500, error.message));
  }
};
