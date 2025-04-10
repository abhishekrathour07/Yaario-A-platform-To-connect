import mongoose from 'mongoose'

const friendSuggestionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        suggestion: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        timestamps: true,
        getter: true
    }
)


const suggestionModel = mongoose.model('suggestion', friendSuggestionSchema);
export default suggestionModel