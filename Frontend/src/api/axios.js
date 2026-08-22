import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000/api" });

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            if (window.location.pathname !== "/login") window.location.assign("/login");
        }
        return Promise.reject(error);
    },
);

export default api;








// const jwt = require('jsonwebtoken');

// exports.protect = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer')) {
//         return res.status(401).json({
//             success: false,
//             message: 'Not authorized, no valid token provided.'
//         });
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = {
//             id: decoded.id,
//             role: decoded.role || 'EMPLOYEE'
//         };

//         next();
//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: 'Not authorized, token invalid or expired.'
//         });
//     }
// };

// exports.login = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;

//         if(!email || !password) {
//             res.status(400)
//             throw new Error("Required all data")
//         };

//         const user = await employee.findEmployeeByEmail(email);
//         if(!user) {
//             res.status(401);
//             throw new Error("Invalid email or password");
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch) {
//             res.status(401);
//             throw new Error("Invalid email or password");
//         }

//         const token = generateToken(user.id, user.role);

//         res.status(200).json({
//             success: true,
//             message: "Login successful",
//             token,
//             user: {
//                 id: user.id,
//                 full_name: user.full_name,
//                 email: user.email,
//                 role: user.role
//             }
//         })
//     } catch (error) {
//         next(error)
//     }
// }

// import axios from "axios";

// const api = axios.create({ baseURL: "http://localhost:8000/api" });

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if(token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
// });

// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//             if (window.location.pathname !== "/login") window.location.assign("/login");
//         }
//         return Promise.reject(error);
//     },
// );

// export default api;

