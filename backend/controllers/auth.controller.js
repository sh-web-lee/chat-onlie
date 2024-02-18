import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import generateTokenAndSetCookie from '../utils/generateToken.js';


export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body
    if (password !== confirmPassword) {
      return res.status(400).json({
        code: 1,
        message: "Passwords don't match"
      })
    }

    const user = await User.findOne({ username })
    if (user) {
      return res.status(400).json({
        code: 1,
        message: "Username already exists"
      })
    }

    // HASH password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
    })

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res)
      await newUser.save();


      res.status(200).json({
        code: 0,
        data: {
          _id: newUser._id,
          fullName: newUser.fullName,
          username: newUser.username,
          profilePic: newUser.profilePic
        },
        message: "success"
      })
    } else {
      res.status(400).json({
        code: 1,
        message: "Invalid user data"
      });
    }

  } catch (error) {
    res.status(500).json({
      code: 1,
      message: error.message
    })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username })
    const isPasswordCurrent = await bcrypt.compare(password, user?.password || "")

    if (!user) {
      return res.status(400).json({
        code: 1,
        message: "user is not exist"
      })
    }

    if (!isPasswordCurrent) {
      return res.status(400).json({
        code: 1,
        message: "Invalid username or password"
      })
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      code: 0,
      data: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
        gender: user.gender
      },
      message: "success"
    })
  } catch (error) {
    res.status(500).json({
      code: 1,
      message: error.message
    })

  }
}


export const logout = (req, res) => {
  try {
		res.cookie("token", "", { maxAge: 0 });
		res.status(200).json({
      code: 0,
      message: "success"
    });
	} catch (error) {
    res.status(500).json({
      code: 1,
      message: error.message
    })
	}
}