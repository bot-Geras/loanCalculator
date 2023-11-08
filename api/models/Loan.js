const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
  borrowedAmount: {
    type: Number,
    required: true,
    min: 5000,
    max: 50000,
  },
  interestRate: {
    type: Number,
    required: true,
    min: 1,
    max: 30,
  },

  repaymentPeriod: {
    type: Number,
    required: true,
    min: 1,
    max: 60,
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

LoanSchema.pre("save", function (next) {
  const loan = this;

  if (loan.borrowedAmount <= 50000 && loan.interestRate <= 10) {
    loan.status = "approved";
  } else {
    loan.status = "rejected";
  }
  next();
});

const LoanModel = mongoose.model("Loan", LoanSchema);
module.exports  = LoanModel