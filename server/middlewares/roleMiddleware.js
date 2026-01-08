export const roleMiddleware = {
    studentsOnly: (req, res, next) => {
        try {
            if (req.user && req.user.role === "student") {
                return next();
            };

            return res.status(403).json({
                message: "Access denied. Student access only.",
                success: false
            });
        }
        catch (error) {
            console.error('Student middleware error:', error);
            return res.status(500).json({
                success: false,
                message: "Internal server error in authorization."
            });
        };
    },

    teachersOnly: (req, res, next) => {
        try {
            if (req.user && req.user.role === "teacher") {
                return next();
            };

            return res.status(403).json({
                message: "Access denied. Teacher access only.",
                success: false
            });
        } catch (error) {
            console.error('Teacher middleware error:', error);
            return res.status(500).json({
                success: false,
                message: "Internal server error in authorization."
            });
        };
    },

    staffOnly: (req, res, next) => {
        try {
            const staffRoles = ['registrar', 'admission'];
            if (req.user && staffRoles.includes(req.user.role)) {
                return next();
            };

            return res.status(403).json({
                message: "Access denied. Staff access only.",
                success: false
            });
        } catch (error) {
            console.error('Staff middleware error:', error);
            return res.status(500).json({
                success: false,
                message: "Internal server error in authorization."
            });
        };
    },

    adminsOnly: (req, res, next) => {
        try {
            if (req.user && req.user.role === "admin") {
                return next();
            };

            return res.status(403).json({
                message: "Access denied. Admin access only.",
                success: false
            });
        } catch (error) {
            console.error('Student middleware error:', error);
            return res.status(500).json({
                success: false,
                message: "Internal server error in authorization."
            });
        };
    },
};