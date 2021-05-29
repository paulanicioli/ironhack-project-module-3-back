const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema(
    {
        weekDay: { type: String, required: true},
        dayPeriod: { type: String, enum: ['morning', 'evening', 'night']},
        openingTime: { type: String, required: true },
        closingTime: { type: String, required: true },
        business: { type: mongoose.Types.ObjectId, ref: 'Business'}
    },
    {
        timestamps: true
    }
)

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;