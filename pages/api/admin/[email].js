import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export default async function handler(req, res) {
    const { email } = req.query;
     await mongooseConnect();

    try {
      console.log("Deleting admin email:", email);
      // Delete the admin email from the collection
      const deleteResult = await User.deleteOne({ email });
    //   console.log("Delete result:", deleteResult);

      if (deleteResult.deletedCount === 1) {
        res.status(200).json({ message: "Admin email deleted successfully!" });
      } else {
        res.status(404).json({ message: "Admin email not found." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete admin email." });
    }
  }