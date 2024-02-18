import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(["-password", "-__v"]);

		res.status(200).json({
      code: 0,
      data: filteredUsers,
      message: "success"
    });
	} catch (error) {
		res.status(500).json({
      code: 1,
      message: "Internal server error"
    })
	}
};
