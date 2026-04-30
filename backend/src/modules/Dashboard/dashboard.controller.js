const dashboardService = require('./dashboard.services');

const getDashboardStats = async (req, res) => {
    try{
        const userId = req.user.id; // Get user ID from authenticated request
        const stats = await dashboardService.getDashboardStats(userId);
        res.status(200).json({
            success:true,
            message:"Dashboard stats retrieved successfully",
            data:stats});
    }
    catch(error){
        res.status(error.statusCode || 500).json({success:false,message:error.message || "Server error"});
    }
}

const getDashboardCharts = async (req, res) => {
    try{
        const userId = req.user.id; // Get user ID from authenticated request
        const chartsData = await dashboardService.getDashboardCharts(userId);
        res.status(200).json({
            success:true,
            message:"Dashboard charts retrieved successfully",
            data:chartsData
        });
    }
    catch(error){
        res.status(error.statusCode || 500).json({success:false,message:error.message || "Server error"});
    }
}

module.exports = {getDashboardStats, getDashboardCharts};