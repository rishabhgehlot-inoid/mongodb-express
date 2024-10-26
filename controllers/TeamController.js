const Team = require("../models/Team");

module.exports.createTeamMember = async (req, res) => {
  const { name, position, joining_date, email, phone, linkedIn, twitter } =
    req.body;
  const profile_photo = req.file.path.split("\\")[2];

  try {
    const newTeamMember = new Team({
      name,
      position,
      joining_date,
      profile_photo,
      email,
      phone,
      linkedIn,
      twitter,
    });

    await newTeamMember.save();

    res
      .status(201)
      .json({ message: "Team member added successfully", newTeamMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding team member", error });
  }
};

module.exports.getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find();
    res.status(200).json(teamMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching team members", error });
  }
};

module.exports.getTeamMemberById = async (req, res) => {
  const { id } = req.params;

  try {
    const teamMember = await Team.findById(id);
    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res.status(200).json(teamMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching team member", error });
  }
};

module.exports.updateTeamMember = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  let updatedTeamMember;
  try {
    if (req.file) {
      const profile_photo = req.file.path;
      updatedTeamMember = await Team.findByIdAndUpdate(
        id,
        { ...updates, profile_photo },
        {
          new: true,
        }
      );
    } else {
      updatedTeamMember = await Team.findByIdAndUpdate(id, updates, {
        new: true,
      });
    }
    if (!updatedTeamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res
      .status(200)
      .json({ message: "Team member updated successfully", updatedTeamMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating team member", error });
  }
};

module.exports.deleteTeamMember = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeamMember = await Team.findByIdAndDelete(id);
    if (!deletedTeamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res
      .status(200)
      .json({ message: "Team member deleted successfully", deletedTeamMember });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting team member", error });
  }
};
