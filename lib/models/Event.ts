import mongoose from "mongoose"

const RegistrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  semester: { type: String, required: true },
  faculty: { type: String, required: true },
  transactionNumber: { type: String, required: true },
  paymentProof: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
})

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    fee: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["upcoming", "completed"],
      default: "upcoming",
    },
    participantLimit: {
      type: Number,
      default: 50,
    },
    registrations: [RegistrationSchema],
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Event || mongoose.model("Event", EventSchema)
