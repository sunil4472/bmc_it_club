import mongoose from "mongoose"

const SettingsSchema = new mongoose.Schema(
  {
    clubName: {
      type: String,
      default: "BMC IT Club",
    },
    clubLogo: {
      type: String,
      default: "",
    },
    contactNumber: {
      type: String,
      default: "+977-9811420975 ",
    },
    whatsappLink: {
      type: String,
      default: "https://wa.me/9811420975 ",
    },
    email: {
      type: String,
      default: "bmcitclub1@gmail.com",
    },
    address: {
      type: String,
      default: "Bhairahawa Multiple Campus, Nepal",
    },
    description: {
      type: String,
      default: "Empowering students with IT skills at Bhairahawa Multiple Campus, Nepal.",
    },
    defaultTheme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema)
