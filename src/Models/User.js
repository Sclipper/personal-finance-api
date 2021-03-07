import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  name: { type: String, required: false },
  country: { type: String, required: false },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  refresh_token: { type: String, required: true },
  password: { type: String, required: true },
  financial_statement: [
    {
      assets: {
        cash_checking_account: Number,
        cash_savings_account: Number,
        // cfd: Number,
        securities: Number,
        // notes_and_contract_receivables: Number,
        // life_insurance_surrender_value: Number,
        retirement_funds: Number,
        // personal_property: Number,
        real_estate: Number,
        valuables: Number,
        other_assets: Number,
      },
      liabilities: {
        debt: Number,
        notes_payable: Number,
        taxes_payable: Number,
        real_estate_mortgages: Number,
        other_mortgages: Number,
        other_liabilities: Number,
      },
      created_at: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: { createdAt: 'created_at' } })

const User = mongoose.model('User', userSchema)
export default User
