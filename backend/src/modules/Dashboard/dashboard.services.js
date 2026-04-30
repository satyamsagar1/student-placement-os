const Application = require("../Application/application.model");
const mongoose = require('mongoose');

const getDashboardStats = async (userId) => {
    
    const totalApplications = await Application.countDocuments({ userId });

    const activePipeline = await Application.countDocuments({
        userId,
        status:{ $in: ["Applied", "Interviewing", "OA", "HR"] }
    });

    const interviews = await Application.countDocuments({
        userId,
        status: { $in:["Interviewing", "HR"]}
    });

    const offers = await Application.countDocuments({
        userId,
        status: "Offer"
    });

    const rejections = await Application.countDocuments({
        userId,
        status: "Rejected"
    });

    const responses = await Application.countDocuments({
        userId,
        status: { $in: ["OA", "HR", "Interviewing", "Offer"] }
    });

    const responseRate = totalApplications === 0 ? 0 : Number(((responses / totalApplications) * 100).toFixed(2));

    return {
        totalApplications,
        activePipeline,
        interviews,
        offers,
        rejections,
        responses,
        responseRate
    };
}

const getDashboardCharts = async (userId) => {

    const monthlyTrendRaw = await Application.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $group: {
            _id: { year: { $year: "$appliedDate" }, 
            month: { $month: "$appliedDate" } 
        },
            count: { $sum: 1 }
        }},
        { $sort: { 
            "_id.year": 1, 
            "_id.month": 1 } 
        }
    ]);

    const statusDistributionRaw = await Application.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $group: {
            _id: "$status",
            count: { $sum: 1 }
        }},
        { $sort: { count: -1 } }
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const monthlyTrend = monthlyTrendRaw.map((item)=>({
        month: monthNames[item._id.month],
        year: item._id.year,
        count: item.count
    }));

    const statusDistribution = statusDistributionRaw.map((item)=>({
        status: item._id,
        count: item.count
    }));

    return {
        monthlyTrend,
        statusDistribution
    };

}

module.exports = {getDashboardStats, getDashboardCharts};